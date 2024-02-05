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

const USER_URL = import.meta.env.VITE_APP_BASEPATH + "/userauth/v1/"

// TODO - these services need to be further secured with OAuth2
class UserService {
  getUser(ownerId: number) {
    return axios.get(USER_URL + 'users/' + ownerId);
  }

  getAllUsers() {
    return axios.get(USER_URL + 'users');
  }

  getUserByEmail(email: string) {
    return axios.get(USER_URL + 'email?avogadro=6021023&email=' + email);
  }

  updatePassword(id: number, password: string) {
    const obj = {
      password: password
    }
    return axios.patch(USER_URL + 'users/' + id + '?avogadro=6021023', obj);
  }
}

export default new UserService();