/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
export default interface User {
    id: number;
    username: string | null;
    email: string;
    password: string;
    roles: Array<string>;
    ownerId: number;
    agentMnemonic: string;
    monitorMnemonic: string;
}
