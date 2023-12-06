/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import axios from "axios";
const PERSONAL_URL = "http://localhost:3000/personal/v1/owner/";
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
class PersonalService {
    /**
     * This is a method to get all peeps (key contacts) (for a configured owner)
     *
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getPeeps() {
        return axios.get(PERSONAL_URL + 'peeps');
    }
    /**
     * This is a method to get a peep by id (for a configured owner)
     *
     * @param id - the primary key for peep needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    getPeep(id) {
        return axios.get(PERSONAL_URL + 'peeps/' + id);
    }
    /**
     * This is a method to delete a peep by id (for a configured owner)
     *
     * @param id - the primary key for peep needed.
     * @remarks
     * using Axios
     * @returns Promise.
     */
    deletePeep(id) {
        return axios.delete(PERSONAL_URL + 'peeps/' + id);
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
    updatePeep(id, obj) {
        return axios.put(PERSONAL_URL + 'peeps/' + id, obj);
    }
    /**
     * This is a method to create a new peep (for a configured owner)
     *
     * @param obj - Peep type
     * @remarks
     * using Axios
     * @returns Promise.
     */
    createPeep(obj) {
        return axios.post(PERSONAL_URL + 'peeps', obj);
    }
}
export default new PersonalService();
//# sourceMappingURL=personal.service.js.map