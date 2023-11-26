/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import axios from "axios";

//const APP_BASEPATH = import.meta.env.VITE_FINANCIAL_BASEPATH; // http://localhost:3000
const FIN_URL = "https://app.virtualyou.info/financial/v1/owner/";
class FinancialService {
    getAssets() {
        return axios.get(FIN_URL + 'assets');
    }
    getDebts() {
        return axios.get(FIN_URL + 'debts');
    }

}

export default new FinancialService();