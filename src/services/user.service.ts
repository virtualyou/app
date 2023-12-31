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
import User from "../types/user.type.ts";

const USER_URL = import.meta.env.VITE_APP_BASEPATH + "/userauth/v1/"

// app calling userauth and not as user/role
class UserService {
  getAgentBoard() {
    return axios.get(USER_URL + 'agent', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(USER_URL + 'admin', { headers: authHeader() });
  }

  getUser(ownerId: number) {
    // send with client_id and client_secret
    return axios.get(USER_URL + 'users/' + ownerId, { headers: clientHeader() });
  }

  getAgentWhereOwnerId(ownerId: number) {
      return axios.get(USER_URL + 'users/agents/' + ownerId, {headers: clientHeader()});
  }

  getMonitorWhereOwnerId(ownerId: number) {
    return axios.get(USER_URL + 'users/monitors/' + ownerId, {headers: clientHeader()});
  }

  async setAgentIdForOwner(agentId: number, ownerId: number) {
    // get owner, update agentId
    try {
      const owner = await this.getUser(ownerId) as unknown as User;
      if (owner) {
        const obj = {
          username: owner.username,
          fullname: owner.fullname,
          email: owner.email,
          password: owner.password,
          ownerId: owner.ownerId,
          agentOwnerId: owner.agentOwnerId,
          monitorOwnerId: owner.monitorOwnerId,
          agentActive: owner.agentActive,
          monitorActive: owner.monitorActive,
          agentMnemonic: owner.agentMnemonic,
          monitorMnemonic: owner.monitorMnemonic,
          agentId: agentId,
          monitorId: owner.monitorId
        }
        console.log('ownerId=' + ownerId);
        console.log('obj=' + obj);
        await axios.put(USER_URL + 'users/' + ownerId, obj, {headers: clientHeader()});
      } else {
        console.error('Owner does not exist!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async setMonitorIdForOwner(monitorId: number, ownerId: number) {
    // get owner, update monitorId
    try {
      const owner = await this.getUser(ownerId) as unknown as User;
      if (owner) {
        const obj = {
          username: owner.username,
          fullname: owner.fullname,
          email: owner.email,
          password: owner.password,
          ownerId: owner.ownerId,
          agentOwnerId: owner.agentOwnerId,
          monitorOwnerId: owner.monitorOwnerId,
          agentActive: owner.agentActive,
          monitorActive: owner.monitorActive,
          agentMnemonic: owner.agentMnemonic,
          monitorMnemonic: owner.monitorMnemonic,
          agentId: owner.agentId,
          monitorId: monitorId
        }
        await axios.put(USER_URL + 'users/' + ownerId, obj, {headers: clientHeader()});
      } else {
        console.error('Owner does not exist!');
      }
    } catch (error) {
      console.error(error);
    }
  }


}


export default new UserService();