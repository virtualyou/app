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

medical.service.ts - Medical service utilizing API
@author David L Whitehurst

*/

import axios from "axios";
import Prescription from "../types/prescription.type.ts";
import CreatePrescription from "../types/createprescription.type.ts";

const MED_URL = import.meta.env.VITE_APP_BASEPATH + "/medical/v1/owner/";

/**
 * Class: MedicalService
 *
 * @remarks
 * This is a medical service class that communicates with the medical API for its
 * operations using Axios.
 *
 * @example
 * ```
 * const medService = new MedicalService();
 * const myPromise = medService.getPrescriptions();
 * ```
 */
class MedicalService {

    /**
     * This is a method to get all prescriptions (for a configured owner)
     *
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getPrescriptions() {
        return axios.get(MED_URL + 'prescriptions');
    }

    /**
     * This is a method to get a prescription by id (for a configured owner)
     *
     * @param id - the primary key for prescription needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getPrescription(id: number) {
        return axios.get(MED_URL + 'prescriptions/' + id);
    }

    /**
     * This is a method to delete a prescription by id (for a configured owner)
     *
     * @param id - the primary key for prescription needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    deletePrescription(id: number) {
        return axios.delete(MED_URL + 'prescriptions/' + id);
    }

    /**
     * This is a method to update a prescription by id (for a configured owner)
     *
     * @param id - the primary key for prescription needed.
     * @param obj - Prescription type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    updatePrescription(id: number, obj: Prescription) {
        return axios.put(MED_URL + 'prescriptions/' + id, obj);
    }

    /**
     * This is a method to create a new prescription (for a configured owner)
     *
     * @param obj - Prescription type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    createPrescription(obj: CreatePrescription) {
        return axios.post(MED_URL + 'prescriptions', obj);
    }

}

export default new MedicalService();