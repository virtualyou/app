/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import axios from 'axios';
import authHeader from './auth-header';
const USER_URL = "http://localhost:3000/userauth/v1/";
class UserService {
    getPublicContent() {
        return axios.get(USER_URL + 'all', { headers: authHeader() });
    }
    getOwnerBoard() {
        return axios.get(USER_URL + 'owner', { headers: authHeader() });
    }
    getAgentBoard() {
        return axios.get(USER_URL + 'agent', { headers: authHeader() });
    }
    getMonitorBoard() {
        return axios.get(USER_URL + 'monitor', { headers: authHeader() });
    }
    getAdminBoard() {
        return axios.get(USER_URL + 'admin', { headers: authHeader() });
    }
    getOwner(ownerId) {
        return axios.get(USER_URL + 'users/' + ownerId, { headers: authHeader() });
    }
}
export default new UserService();
//# sourceMappingURL=user.service.js.map