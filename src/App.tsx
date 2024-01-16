
import { useEffect, useRef, useState } from "react";
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import { htmlTemplate } from './html-boilerplate/react-template';
import { CodeEditor } from './components/CodeEditor';
import { startService } from "./esbuiild/startService";




function App() {
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
          ></iframe>
        </div>

      </div>
      <div>
        <button
          onClick={ handleClick }
        >Submit</button>
      </div>

    </>
  );
}


export default App;
