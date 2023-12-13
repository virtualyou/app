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

legal.service.ts - Legal service utilizing API
@author David L Whitehurst

*/

import axios from "axios";
import Doc from "../types/doc.type.ts";
import CreateDoc from "../types/createdoc.type.ts";
const LEGAL_URL = import.meta.env.VITE_APP_BASEPATH + "/legal/v1/owner/";

/**
 * Class: LegalService
 *
 * @remarks
 * This is a legal service class that communicates with the legal API for its
 * operations using Axios.
 *
 * @example
 * ```
 * const legalService = new LegalService();
 * const myPromise = legalService.getDocs();
 * ```
 */
class LegalService {

    /**
     * This is a method to get all peeps (key contacts) (for a configured owner)
     *
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getDocs() {
        return axios.get(LEGAL_URL + 'docs');
    }

    /**
     * This is a method to get a peep by id (for a configured owner)
     *
     * @param id - the primary key for peep needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getDoc(id: number) {
        return axios.get(LEGAL_URL + 'docs/' + id);
    }

    /**
     * This is a method to delete a peep by id (for a configured owner)
     *
     * @param id - the primary key for peep needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    deleteDoc(id: number) {
        return axios.delete(LEGAL_URL + 'docs/' + id);
    }

    /**
     * This is a method to update a peep by id (for a configured owner)
     *
     * @param id - the primary key for peep needed.
     * @param obj - Peep type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    updateDoc(id: number, obj: Doc) {
        return axios.put(LEGAL_URL + 'docs/' + id, obj);
    }

    /**
     * This is a method to create a new peep (for a configured owner)
     *
     * @param obj - Peep type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    createDoc(obj: CreateDoc) {
        return axios.post(LEGAL_URL + 'docs', obj);
    }

}

export default new LegalService();