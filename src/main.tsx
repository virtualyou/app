/*
Copyright 2023 VirtualYou

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

main.tsx - application entry
@author David L Whitehurst

*/

import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// HashRouter ?
// BrowserRouter ?
const root = document.getElementById('root');
if (root) {
    ReactDOM.createRoot(root).render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
    );
}
