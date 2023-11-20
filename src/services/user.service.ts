/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import axios from 'axios';
import authHeader from './auth-header';

const APP_BASEPATH = import.meta.env.VITE_APP_BASEPATH; // http://localhost:3000
const USER_URL = APP_BASEPATH + "/userauth/v1/"

class UserService {
  getPublicContent() {
    return axios.get(USER_URL + 'all');
  }

  getOwnerBoard() {
    //alert(API_URL + 'owner');
    return axios.get(USER_URL + 'owner');
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

  getOwner(ownerId: number) {
    return axios.get(USER_URL + 'users/' + ownerId, { headers: authHeader() });
  }
}

export default new UserService();