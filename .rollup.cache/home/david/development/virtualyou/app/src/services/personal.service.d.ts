/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import Peep from "../types/peep.type.ts";
import CreatePeep from "../types/createpeep.type.ts";
/**
 * Class: PersonalService
 *
 * @remarks
 * This is a personal service class that communicates with the personal API for its
 * operations using Axios.
 *
 * @example
 * ```
 * const perService = new PersonalService();
 * const myPromise = perService.getPeeps();
 * ```
 */
declare class PersonalService {
    /**
     * This is a method to get all peeps (key contacts) (for a configured owner)
     *
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getPeeps(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to get a peep by id (for a configured owner)
     *
     * @param id - the primary key for peep needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getPeep(id: number): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to delete a peep by id (for a configured owner)
     *
     * @param id - the primary key for peep needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    deletePeep(id: number): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to update a peep by id (for a configured owner)
     *
     * @param id - the primary key for peep needed.
     * @param obj - Peep type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    updatePeep(id: number, obj: Peep): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * This is a method to create a new peep (for a configured owner)
     *
     * @param obj - Peep type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    createPeep(obj: CreatePeep): Promise<import("axios").AxiosResponse<any, any>>;
}
declare const _default: PersonalService;
export default _default;
