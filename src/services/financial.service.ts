/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import axios from "axios";

const APP_BASEPATH = import.meta.env.VITE_APP_BASEPATH; // http://localhost:3000
const API_URL = APP_BASEPATH + "/financial/v1/owner/";
class FinancialService {
    getAssets() {
        return axios.get(API_URL + 'assets');
    }
    getDebts() {
        return axios.get(API_URL + 'debts');
    }

}

export default new FinancialService();