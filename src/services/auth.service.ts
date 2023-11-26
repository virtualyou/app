/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import axios from "axios";
import authHeader from './auth-header';

//const APP_BASEPATH = process.env.VITE_USERAUTH_BASEPATH; // http://localhost:3000
const AUTH_URL = "https://app.virtualyou.info/userauth/v1/auth/" // process.env.VITE_USERAUTH_BASEPATH + "/userauth/v1/auth/";
class AuthService {
    login(username: string, password: string) {
        return axios
            .post(AUTH_URL + "signin", {
                username,
                password
            }, { headers: authHeader() })
            .then(response => {
                if (response.data.username) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username: string, email: string, password: string) {
        const ownerId = 0;
        return axios.post(AUTH_URL + "signup", {
            username,
            email,
            password,
            ownerId
        }, { headers: authHeader() });
    }

    registerHelper(username: string, email: string, password: string, ownerId: number, role: string) {
        // must generate deterministic key from owner mnemonic and verify against the registrant's query parameter dkey
            const roles: string[] = [role];
            return axios.post(AUTH_URL + "signup", {
                username,
                email,
                password,
                ownerId,
                roles
            }, { headers: authHeader() });
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);
        return null;
    }
}

export default new AuthService();