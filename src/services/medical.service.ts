/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import axios from "axios";

//const APP_BASEPATH = import.meta.env.VITE_MEDICAL_BASEPATH; // http://localhost:3000
const MED_URL = "https://app.virtualyou.info/medical/v1/owner/";
class MedicalService {
    getPrescriptions() {
        return axios.get(MED_URL + 'prescriptions');
    }
}

export default new MedicalService();