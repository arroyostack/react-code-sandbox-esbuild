import CodeMirror from '@uiw/react-codemirror';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';

import { javascript } from '@codemirror/lang-javascript';

interface Props {
    input: string;
    setInput: ( value: React.SetStateAction<string> ) => void;

}

export const CodeEditor = ( { input, setInput }: Props ) => {
    return (
        <CodeMirror
            theme={ tokyoNight }
            value={ input }
            height="80vh"
            extensions={ [javascript( { jsx: true } )] }
            onChange={ ( event: string ) => setInput( event ) } />
    );
};
