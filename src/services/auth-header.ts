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

auth-header.ts - Auth HTTP Header to propagate x-access-token
@author David L Whitehurst

*/

export default function authHeader() {
    const userStr = localStorage.getItem("user");
    let user = null;

    if (userStr) {
        user = JSON.parse(userStr);
    }

    if (user && user.token) {
        //return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
        return {
            'x-access-token': user.token
        };       // for Node.js Express back-end
    } else {
        //return { Authorization: '' }; // for Spring Boot back-end
        return { 'x-access-token': null }; // for Node Express back-end
    }
}