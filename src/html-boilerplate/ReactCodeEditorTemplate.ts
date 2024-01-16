export const reactCodeTemplate = `
    // Import any npm library here.
    import React, { useEffect, useState } from 'react';
    import ReactDOM from 'react-dom';

    const URL = 'https://jsonplaceholder.typicode.com/todos/1';

    export const App = () => {

        const [count, setCount] = useState(0);

        useEffect( () => {
            console.log("Hello World!.")
        }, [] );
        
        return (
          <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
              Click me
            </button>
          </div>
        );
    };

    ReactDOM.render(
        <App />,
        document.querySelector('#root')
    );
`;
