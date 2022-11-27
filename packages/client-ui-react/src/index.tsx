import React from "react";
import ReactDOM from 'react-dom/client';

// fixme 临时增加的测试代码
import {App} from '@zen-im/client-core';

(window as any).ZenImApp = new App('http://localhost:9090');

const Hello = () => (<h1>Hello</h1>)

ReactDOM
    .createRoot(document.querySelector('#app'))
    .render(<Hello/>)
