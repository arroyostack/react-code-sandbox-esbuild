import React, { useEffect } from 'react';

interface Props {
    iframe: React.MutableRefObject<any>,
    htmlTemplate: string;
}

export const CodeResultScreen = ( { iframe, htmlTemplate, }: Props ) => {

    useEffect( () => {
        iframe.current.srcdoc = htmlTemplate;
    }, [iframe, htmlTemplate] );

    return (
        <iframe
            title="CodePreview"
            sandbox="allow-scripts"
            srcDoc={ htmlTemplate }
            ref={ iframe }
        ></iframe>
    );
};
