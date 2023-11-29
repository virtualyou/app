/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
export default interface CreateTask {
    name: string,
    type: string,
    priority: string,
    due: string,
    completed: string,
    trigger: string,
    note: string,
    userKey: number
}