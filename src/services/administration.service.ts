/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import axios from "axios";

const APP_BASEPATH = import.meta.env.VITE_APP_BASEPATH; // http://localhost:3000
const API_URL = APP_BASEPATH + "/administration/v1/owner/";
class AdministrationService {
    getTasks() {
        return axios.get(API_URL + 'tasks');
    }
}

export default new AdministrationService();