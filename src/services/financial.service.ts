/*
Copyright 2023 VirtualYou

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

financial.service.ts - Financial service utilizing API
@author David L Whitehurst

*/

import axios from "axios";
import Asset from "../types/asset.type.ts";
import Debt from "../types/debt.type.ts";
import CreateAsset from "../types/createasset.type.ts";
import CreateDebt from "../types/createdebt.type.ts";

const FIN_URL = import.meta.env.VITE_APP_BASEPATH + "/financial/v1/owner/";

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
    getAsset(id: number) {
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
    deleteAsset(id: number) {
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
    updateAsset(id: number, obj: Asset) {
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
    createAsset(obj: CreateAsset) {
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
    getDebt(id: number) {
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
    deleteDebt(id: number) {
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
    updateDebt(id: number, obj: Debt) {
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
    createDebt(obj: CreateDebt) {
        return axios.post(FIN_URL + 'debts', obj);
    }

}

export default new FinancialService();