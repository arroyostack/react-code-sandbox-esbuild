export const reactCodeTemplate = `
    // Import any npm library here.
    import React, { useEffect, useState } from 'react';
    import ReactDOM from 'react-dom';

    export const App = () => {
        
        return (
          <div>
            <h2>Hi Mars!</h2>
          </div>
        );
    };

    ReactDOM.render(
        <App />,
        document.querySelector('#root')
    );
`;
