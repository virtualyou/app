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
                if (response.data) { // was .data
                    if (response.data.mfa != "0") { // owner
                        if (response.data.ownerId == "-1") {
                            localStorage.setItem("ownerid", response.data.id);
                        }
                        if (response.data.ownerId == "0") {
                            localStorage.setItem("ownerid", response.data.id);
                        }
                    } else { // agent or monitor ( or admin )
                        if (response.data.agentOwnerId != "0") { // agent
                            localStorage.setItem("ownerid", response.data.agentOwnerId);
                        }
                        if (response.data.monitorOwnerId != "0") { // monitor
                            localStorage.setItem("ownerid", response.data.monitorOwnerId);
                        }
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

    // admin registration must be done by hand. ownerId = -1
    register(username: string, email: string, fullname: string, password: string) {
        const ownerId: number = 0;
        const agentOwnerId: number = 0;
        const monitorOwnerId: number = 0;
        const roles: string[] = ["owner"];
        return axios.post(AUTH_URL + "signup", {
            "username": username,
            "fullname": fullname,
            "email": email,
            "password": password,
            "ownerId": ownerId,
            "agentOwnerId": agentOwnerId,
            "monitorOwnerId": monitorOwnerId,
            "agentActive": false,
            "monitorActive": false,
            "roles": roles,
        }, { headers: authHeader() });
   }

    registerAgent(username: string, email: string, fullname: string, password: string, ownerId: number,
                   agentOwnerId: number, monitorOwnerId: number, role: string, rsvp: number) {
        // must generate deterministic key from owner mnemonic and verify against the registrant's query parameter dkey
            const roles: string[] = [role];
            return axios.post(AUTH_URL + "agent/signup", {
                username,
                email,
                fullname,
                password,
                ownerId,
                agentOwnerId,
                monitorOwnerId,
                roles,
                rsvp
            }, { headers: authHeader() });
    }

    registerMonitor(username: string, email: string, fullname: string, password: string, ownerId: number,
                  agentOwnerId: number, monitorOwnerId: number, role: string, rsvp: number) {
        // must generate deterministic key from owner mnemonic and verify against the registrant's query parameter dkey
        const roles: string[] = [role];
        return axios.post(AUTH_URL + "monitor/signup", {
            username,
            email,
            fullname,
            password,
            ownerId,
            agentOwnerId,
            monitorOwnerId,
            roles,
            rsvp
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