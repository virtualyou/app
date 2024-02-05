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

temp.service.ts - temp Service
@author David L Whitehurst

*/

import axios from 'axios';

const USER_URL = import.meta.env.VITE_APP_BASEPATH + "/userauth/v1/"

export class TempService {
    getUserByEmail(email: string) {
        console.log(USER_URL + 'email?avogadro=6021023&email=' + email);
        return axios.get(USER_URL + 'email?avogadro=6021023&email=' + email);
    }
}

//export default TempService;