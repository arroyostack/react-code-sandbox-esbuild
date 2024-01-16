import { useEffect, useRef, useState } from "react";
import { fetchPlugin } from '../plugins/fetch-plugin';
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import { htmlTemplate } from '../html-boilerplate/react-template';
import { CodeEditor } from '../components/CodeEditor';
import { startService } from "../esbuiild/startService";
import { Button } from "./widgets/Button";
import { Navbar } from "./widgets/Navbar";
import { reactCodeTemplate } from '../html-boilerplate/ReactCodeEditorTemplate';

export const CodeBoard = () => {
    const ref = useRef<any>();
    const iframe = useRef<any>();
    const [input, setInput] = useState( reactCodeTemplate );

    useEffect( () => {
        startService( ref );
    }, [] );

    const handleClick = async () => {
        if ( !ref.current ) return;

        iframe.current.srcdoc = htmlTemplate;

        const result = await ref.current.build( {
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [
                unpkgPathPlugin(),
                fetchPlugin( input )
            ],
            // Define eliminates warnings
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window'
            }
        } );

        // Send message
        iframe.current.contentWindow.postMessage( result.outputFiles[0].text, '*' );
    };

    return (
        <>
            <Navbar>
                <Button
                    className="animate-pulse bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={ handleClick }>
                    Run Code!
                </Button>
            </Navbar>


            <div
                style={ { minWidth: "100%", minHeight: "100vh" } }
                className="bg-gray-900 flex p-6">
                <div className="flex-1 p-4">
                    <CodeEditor
                        input={ input }
                        setInput={ setInput }
                    />

                </div>
                <div style={ { height: "80vh" } } className="flex-1 p-4 bg-white">
                    <iframe
                        title="CodePreview"
                        sandbox="allow-scripts"
                        srcDoc={ htmlTemplate }
                        ref={ iframe }
                    ></iframe>
                </div>

            </div>

        </>
    );
};
