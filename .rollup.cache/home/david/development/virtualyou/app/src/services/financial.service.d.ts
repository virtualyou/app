/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import Asset from "../types/asset.type.ts";
import Debt from "../types/debt.type.ts";
import CreateAsset from "../types/createasset.type.ts";
import CreateDebt from "../types/createdebt.type.ts";
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
declare class FinancialService {
    /**
     * This is a method to get all assets (for a configured owner)
     *
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getAssets(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to get an asset by id (for a configured owner)
     *
     * @param id - the primary key for asset needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getAsset(id: number): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to delete an asset by id (for a configured owner)
     *
     * @param id - the primary key for asset needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    deleteAsset(id: number): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to update an asset by id (for a configured owner)
     *
     * @param id - the primary key for asset needed.
     * @param obj - Asset type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    updateAsset(id: number, obj: Asset): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to create a new asset (for a configured owner)
     *
     * @param obj - Asset type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    createAsset(obj: CreateAsset): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to get all debts (for a configured owner)
     *
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getDebts(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to get a debt by id (for a configured owner)
     *
     * @param id - the primary key for debt needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getDebt(id: number): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to delete a debt by id (for a configured owner)
     *
     * @param id - the primary key for debt needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    deleteDebt(id: number): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to update a debt by id (for a configured owner)
     *
     * @param id - the primary key for debt needed.
     * @param obj - Debt type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    updateDebt(id: number, obj: Debt): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to create a new debt (for a configured owner)
     *
     * @param obj - Debt type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    createDebt(obj: CreateDebt): Promise<import("axios").AxiosResponse<any, any>>;
}
declare const _default: FinancialService;
export default _default;
