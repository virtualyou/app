import { jsx as _jsx } from "react/jsx-runtime";
/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
// HashRouter ?
// BrowserRouter ?
const root = document.getElementById('root');
if (root) {
    ReactDOM.createRoot(root).render(_jsx(BrowserRouter, { children: _jsx(App, {}) }));
}
//# sourceMappingURL=main.js.map