/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import axios from "axios";

//const APP_BASEPATH = import.meta.env.VITE_FINANCIAL_BASEPATH; // http://localhost:3000
const FIN_URL = "http://localhost:3000/financial/v1/owner/";
class FinancialService {
    getAssets() {
        return axios.get(FIN_URL + 'assets');
    }
    getAsset(id: number) {
        return axios.get(FIN_URL + 'assets/' + id);
    }
    deleteAsset(id: number) {
        return axios.delete(FIN_URL + 'assets/' + id);
    }

    getDebts() {
        return axios.get(FIN_URL + 'debts');
    }
    getDebt(id: number) {
        return axios.get(FIN_URL + 'debts/' + id);
    }

}

export default new FinancialService();