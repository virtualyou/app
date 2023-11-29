/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import axios from "axios";
import Prescription from "../types/prescription.type.ts";
import CreatePrescription from "../types/createprescription.type.ts";

const MED_URL = "https://app.virtualyou.info/medical/v1/owner/";

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