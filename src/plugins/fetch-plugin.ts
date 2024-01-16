import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance( {
    name: 'filecache'
} );

export const fetchPlugin = ( inputCode: string ) => {
    return {
        name: 'fetch-plugin',
        setup( build: esbuild.PluginBuild ) {
            build.onLoad( { filter: /(^index\.js$)/ }, () => {
                return {
                    loader: 'jsx',
                    contents: inputCode
                };
            } );

            build.onLoad( { filter: /.*/ }, async ( args: any ) => {
                console.log( 'onLoad', args );

                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>( args.path );
                if ( cachedResult ) {
                    // If it is return it inmediately.
                    return cachedResult;
                }
            } );

            build.onLoad( { filter: /.css$/ }, async ( args: any ) => {
                console.log( 'onLoad', args );

                const { data, request } = await axios.get( args.path );

                const scapedCssFile = data.replace( /\n/g, '' ).replace( /"/g, '\\"' ).replace( /'/g, "\\'" );

                const contents = `
                    const style = document.createElement('style');
                    style.innerText = '${scapedCssFile}'
                    document.head.appendChild(style);`;

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL( './', request.responseURL ).pathname
                };
                // Store response on chache.
                await fileCache.setItem( args.path, result );

                return result;
            } );

            build.onLoad( { filter: /.*/ }, async ( args: any ) => {
                console.log( 'onLoad', args );
                // Otherwise let request to happen
                const { data, request } = await axios.get( args.path );

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL( './', request.responseURL ).pathname
                };
                // Store response on chache.
                await fileCache.setItem( args.path, result );

                return result;
            } );
        }
    };
};