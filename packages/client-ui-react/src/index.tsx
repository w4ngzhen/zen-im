import React from "react";
import ReactDOM from 'react-dom/client';

const Hello = () => (<h1>Hello</h1>)

ReactDOM
    .createRoot(document.querySelector('#app'))
    .render(<Hello/>)
