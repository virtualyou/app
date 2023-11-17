/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import axios from "axios";

const API_URL = "http://localhost:3000/test/v1/";
class NameService {
    getNames() {
        return axios.get(API_URL + 'names');
    }
}

export default new NameService();