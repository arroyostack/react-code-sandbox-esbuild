import { useEffect, useRef, useState } from "react";
import { fetchPlugin } from '../plugins/fetch-plugin';
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import { htmlTemplate } from '../html-boilerplate/react-template';
import { CodeEditor } from '../components/CodeEditor';
import { startService } from "../esbuiild/startService";
import { Button } from "./widgets/Button";
import { Navbar } from "./widgets/Navbar";


export const CodeBoard = () => {
    const ref = useRef<any>();
    const iframe = useRef<any>();
    const [input, setInput] = useState( '' );

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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={ handleClick }>
                    Run Code!
                </Button>
            </Navbar>


            <div className="container">
                <div className="screen">
                    <CodeEditor
                        input={ input }
                        setInput={ setInput }
                    />

                </div>
                <div className="screen">
                    <iframe
                        title="CodePreview"
                        sandbox="allow-scripts"
                        srcDoc={ htmlTemplate }
                        ref={ iframe }
                        height="100%"
                    ></iframe>
                </div>

            </div>

        </>
    );
};
