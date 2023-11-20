/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import axios from "axios";

const APP_BASEPATH = import.meta.env.VITE_APP_BASEPATH; // http://localhost:3000
const API_URL = APP_BASEPATH + "/personal/v1/owner/";
class PersonalService {
    getPeeps() {
        return axios.get(API_URL + 'peeps');
    }
}

export default new PersonalService();