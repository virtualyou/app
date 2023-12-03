/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// HashRouter ?
// BrowserRouter ?

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
