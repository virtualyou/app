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

user.service.ts - Userauth service utilizing API
@author David L Whitehurst

*/

import axios from 'axios';
import clientHeader from "./client-header";
import authHeader from "./auth-header";

const USER_URL = import.meta.env.VITE_APP_BASEPATH + "/userauth/v1/"

// app calling userauth and not as user/role
class UserService {
  getAgentBoard() {
    return axios.get(USER_URL + 'agent', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(USER_URL + 'admin', { headers: authHeader() });
  }

  getOwner(ownerId: number) {
    // send with client_id and client_secret
    return axios.get(USER_URL + 'users/' + ownerId, { headers: clientHeader() });
  }
}

export default new UserService();