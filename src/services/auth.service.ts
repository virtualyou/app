/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import axios from "axios";
import authHeader from './auth-header';

const AUTH_URL = "https://userauth.virtualyou.info/userauth/v1/auth/";
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
     * @param password - String password
     * @remarks
     * using Axios calling userauth API
     * @returns Promise.
     */
    register(username: string, email: string, password: string) {
        const ownerId = 0;
        return axios.post(AUTH_URL + "signup", {
            username,
            email,
            password,
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
     * @param password - String password
     * @param role - String role (strict set of names e.g. owner, agent, monitor, admin)
     * @remarks
     * using Axios calling userauth API
     * @returns Promise.
     */
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