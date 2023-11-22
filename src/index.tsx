import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createRoot } from "react-dom/client";

const domNode = document.getElementById('root');
if (domNode) {
    const root = createRoot(domNode);
    root.render(<App/>);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
