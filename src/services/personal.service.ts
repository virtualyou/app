/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import axios from "axios";

//const APP_BASEPATH = import.meta.env.VITE_PERSONAL_BASEPATH; // http://localhost:3000
const PERSONAL_URL = "http://localhost:3000/personal/v1/owner/";
class PersonalService {
    getPeeps() {
        return axios.get(PERSONAL_URL + 'peeps');
    }
    getPeep(id: number) {
        return axios.get(PERSONAL_URL + 'peeps/' + id);
    }

}

export default new PersonalService();