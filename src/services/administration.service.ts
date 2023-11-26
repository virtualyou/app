/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import axios from "axios";

//const APP_BASEPATH = import.meta.env.VITE_ADMINISTRATION_BASEPATH; // http://localhost:3000
const ADMIN_URL = "https://app.virtualyou.info/administration/v1/owner/";
class AdministrationService {
    getTasks() {
        return axios.get(ADMIN_URL + 'tasks');
    }
}

export default new AdministrationService();