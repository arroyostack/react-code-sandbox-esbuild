import React from 'react';
import ReactDOM from 'react-dom';

export const TrialComponent = () => <div>Trial component</div>;

ReactDOM.render(
    <TrialComponent />,
    document.querySelector('#root')
);
