/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
declare class UserService {
    getPublicContent(): Promise<import("axios").AxiosResponse<any, any>>;
    getOwnerBoard(): Promise<import("axios").AxiosResponse<any, any>>;
    getAgentBoard(): Promise<import("axios").AxiosResponse<any, any>>;
    getMonitorBoard(): Promise<import("axios").AxiosResponse<any, any>>;
    getAdminBoard(): Promise<import("axios").AxiosResponse<any, any>>;
    getOwner(ownerId: number): Promise<import("axios").AxiosResponse<any, any>>;
}
declare const _default: UserService;
export default _default;
