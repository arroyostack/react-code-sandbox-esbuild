import * as esbuild from 'esbuild-wasm';

export const startService = async <T extends React.MutableRefObject<any>>( ref: T ) => {
    ref.current = await esbuild.startService( {
        worker: true,
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    } );
};