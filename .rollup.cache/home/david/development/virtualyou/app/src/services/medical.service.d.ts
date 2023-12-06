/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import Prescription from "../types/prescription.type.ts";
import CreatePrescription from "../types/createprescription.type.ts";
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
declare class MedicalService {
    /**
     * This is a method to get all prescriptions (for a configured owner)
     *
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getPrescriptions(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to get a prescription by id (for a configured owner)
     *
     * @param id - the primary key for prescription needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getPrescription(id: number): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to delete a prescription by id (for a configured owner)
     *
     * @param id - the primary key for prescription needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    deletePrescription(id: number): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to update a prescription by id (for a configured owner)
     *
     * @param id - the primary key for prescription needed.
     * @param obj - Prescription type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    updatePrescription(id: number, obj: Prescription): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to create a new prescription (for a configured owner)
     *
     * @param obj - Prescription type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    createPrescription(obj: CreatePrescription): Promise<import("axios").AxiosResponse<any, any>>;
}
declare const _default: MedicalService;
export default _default;
