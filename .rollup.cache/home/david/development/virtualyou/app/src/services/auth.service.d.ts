/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
declare class AuthService {
    /**
     * This is a method to login a system user
     *
     * @param username - String username
     * @param password - String password
     * @remarks
     * using Axios calling userauth API
     * @returns Promise.
     */
    login(username: string, password: string): Promise<any>;
    /**
     * This is a method to logout a system user
     *
     * @remarks
     * TODO: remove cookie with actual signout call?
     * @returns Promise.
     */
    logout(): void;
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
    register(username: string, email: string, password: string): Promise<import("axios").AxiosResponse<any, any>>;
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
    registerHelper(username: string, email: string, password: string, ownerId: number, role: string): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a simple method to return the current username.
     * @remarks
     * using localStorage to obtain
     * @returns string.
     */
    getCurrentUser(): any;
}
declare const _default: AuthService;
export default _default;
