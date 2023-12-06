/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import axios from "axios";
const FIN_URL = "http://localhost:3000/financial/v1/owner/";
/**
 * Class: FinancialService
 *
 * @remarks
 * This is a financial service class that communicates with the financial API for its
 * operations using Axios.
 *
 * @example
 * ```
 * const finService = new FinancialService();
 * const myPromise = finService.getAssets();
 * ```
 */
class FinancialService {
    /**
     * This is a method to get all assets (for a configured owner)
     *
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getAssets() {
        return axios.get(FIN_URL + 'assets');
    }
    /**
     * This is a method to get an asset by id (for a configured owner)
     *
     * @param id - the primary key for asset needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getAsset(id) {
        return axios.get(FIN_URL + 'assets/' + id);
    }
    /**
     * This is a method to delete an asset by id (for a configured owner)
     *
     * @param id - the primary key for asset needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    deleteAsset(id) {
        return axios.delete(FIN_URL + 'assets/' + id);
    }
    /**
     * This is a method to update an asset by id (for a configured owner)
     *
     * @param id - the primary key for asset needed.
     * @param obj - Asset type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    updateAsset(id, obj) {
        return axios.put(FIN_URL + 'assets/' + id, obj);
    }
    /**
     * This is a method to create a new asset (for a configured owner)
     *
     * @param obj - Asset type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    createAsset(obj) {
        return axios.post(FIN_URL + 'assets', obj);
    }
    /**
     * This is a method to get all debts (for a configured owner)
     *
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getDebts() {
        return axios.get(FIN_URL + 'debts');
    }
    /**
     * This is a method to get a debt by id (for a configured owner)
     *
     * @param id - the primary key for debt needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getDebt(id) {
        return axios.get(FIN_URL + 'debts/' + id);
    }
    /**
     * This is a method to delete a debt by id (for a configured owner)
     *
     * @param id - the primary key for debt needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    deleteDebt(id) {
        return axios.delete(FIN_URL + 'debts/' + id);
    }
    /**
     * This is a method to update a debt by id (for a configured owner)
     *
     * @param id - the primary key for debt needed.
     * @param obj - Debt type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    updateDebt(id, obj) {
        return axios.put(FIN_URL + 'debts/' + id, obj);
    }
    /**
     * This is a method to create a new debt (for a configured owner)
     *
     * @param obj - Debt type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    createDebt(obj) {
        return axios.post(FIN_URL + 'debts', obj);
    }
}
export default new FinancialService();
//# sourceMappingURL=financial.service.js.map