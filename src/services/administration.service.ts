/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import axios from "axios";

//const APP_BASEPATH = import.meta.env.VITE_ADMINISTRATION_BASEPATH; // http://localhost:3000
const ADMIN_URL = "http://localhost:3000/administration/v1/owner/";
class AdministrationService {
    getTasks() {
        return axios.get(ADMIN_URL + 'tasks');
    }

    getTask(id: number) {
        return axios.get(ADMIN_URL + 'tasks/' + id);
    }
}

export default new AdministrationService();