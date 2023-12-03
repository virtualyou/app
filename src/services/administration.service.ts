/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import axios from "axios";
import Task from "../types/task.type.ts";
import CreateTask from "../types/createtask.type.ts";

const ADMIN_URL = "https://app.virtualyou.info/administration/v1/owner/";

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
class AdministrationService {

    /**
     * This is a method to get all tasks (for a configured owner)
     *
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getTasks() {
        return axios.get(ADMIN_URL + 'tasks');
    }

    /**
     * This is a method to get a task by id (for a configured owner)
     *
     * @param id - the primary key for task needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getTask(id: number) {
        return axios.get(ADMIN_URL + 'tasks/' + id);
    }

    /**
     * This is a method to delete a task by id (for a configured owner)
     *
     * @param id - the primary key for task needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    deleteTask(id: number) {
        return axios.delete(ADMIN_URL + 'tasks/' + id);
    }

    /**
     * This is a method to update a task by id (for a configured owner)
     *
     * @param id - the primary key for task needed.
     * @param obj - Debt type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    updateTask(id: number, obj: Task) {
        return axios.put(ADMIN_URL + 'tasks/' + id, obj);
    }

    /**
     * This is a method to create a new task (for a configured owner)
     *
     * @param obj - Task type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    createTask(obj: CreateTask) {
        return axios.post(ADMIN_URL + 'tasks', obj);
    }

}

export default new AdministrationService();
