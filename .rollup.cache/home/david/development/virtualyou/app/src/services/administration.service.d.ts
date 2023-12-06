/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import Task from "../types/task.type.ts";
import CreateTask from "../types/createtask.type.ts";
/**
 * Class: AdministrationService
 *
 * @remarks
 * This is an admin service class that communicates with the administration API for its
 * operations using Axios.
 *
 * @example
 * ```
 * const adminService = new AdministrationService();
 * const myPromise = adminService.getTasks();
 * ```
 */
declare class AdministrationService {
    /**
     * This is a method to get all tasks (for a configured owner)
     *
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getTasks(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to get a task by id (for a configured owner)
     *
     * @param id - the primary key for task needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getTask(id: number): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to delete a task by id (for a configured owner)
     *
     * @param id - the primary key for task needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    deleteTask(id: number): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to update a task by id (for a configured owner)
     *
     * @param id - the primary key for task needed.
     * @param obj - Debt type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    updateTask(id: number, obj: Task): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to create a new task (for a configured owner)
     *
     * @param obj - Task type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    createTask(obj: CreateTask): Promise<import("axios").AxiosResponse<any, any>>;
}
declare const _default: AdministrationService;
export default _default;
