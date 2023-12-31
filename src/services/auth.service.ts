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

auth.service.ts - Userauth service utilizing API
@author David L Whitehurst

*/

import axios from "axios";
import authHeader from './auth-header';

const AUTH_URL = import.meta.env.VITE_APP_BASEPATH + "/userauth/v1/auth/";
class AuthService {

    /**
     * This is a method to login a system user
     *
     * @param username - String username
     * @param password - String password
     * @remarks
     * using Axios calling userauth API
     * @returns Promise.
     */
    login(username: string, password: string) {
        return axios
            .post(AUTH_URL + "signin", {
                username,
                password
            }, { headers: authHeader() })
            .then(response => {
                if (response.data) {
                    if (response.data.ownerId === 0) {
                        localStorage.setItem("ownerid", response.data.id);
                    } else {
                        localStorage.setItem("ownerid", response.data.ownerId);
                    }
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    /**
     * This is a method to logout a system user
     *
     * @remarks
     * TODO: remove cookie with actual signout call?
     * @returns Promise.
     */
    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("ownerid");
    }

    /**
     * This is a method to register a system user, and
     * specifically a ROLE_OWNER
     *
     * @param username - String username
     * @param email - String email
     * @param fullname - String fullname
     * @param password - String password
     * @remarks
     * using Axios calling userauth API
     * @returns Promise.
     */
    register(username: string, email: string, fullname: string, password: string) {
        const ownerId = 0;
        return axios.post(AUTH_URL + "signup", {
            username,
            email,
            password,
            fullname,
            ownerId
        }, { headers: authHeader() });
    }

    /**
     * This is a method to register a system user, and
     * specifically a ROLE_AGENT or ROLE_MONITOR, note
     * the role required
     *
     * @param username - String username
     * @param email - String email
     * @param fullname - String fullname
     * @param password - String password
     * @param ownerId - Number id for owner unique key
     * @param agentOwnerId - Number id for owner id designating agent
     * @param monitorOwnerId - Number id for owner id designating monitor
     * @param role - String role (strict set of names e.g. owner, agent, monitor, admin)
     * @remarks
     * using Axios calling userauth API
     * @returns Promise.
     */
    registerHelper(username: string, email: string, fullname: string, password: string, ownerId: number,
                   agentOwnerId: number, monitorOwnerId: number, role: string) {
        // must generate deterministic key from owner mnemonic and verify against the registrant's query parameter dkey
            const roles: string[] = [role];
            return axios.post(AUTH_URL + "signup", {
                username,
                email,
                fullname,
                password,
                ownerId,
                agentOwnerId,
                monitorOwnerId,
                roles
            }, { headers: authHeader() });
    }

    /**
     * This is a simple method to return the current username.
     * @remarks
     * using localStorage to obtain
     * @returns string.
     */
    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);
        return null;
    }
}

export default new AuthService();