import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'http://localhost:3004/api/v1/';
//const API_URL = import.meta.env.VITE_API_BASEPATH_USER; // "http://localhost:3000/api/v1/";
const API_URL = "http://localhost:3000/api/v1/"

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getOwnerBoard() {
    return axios.get(API_URL + 'owner', { headers: authHeader() });
  }

  getAgentBoard() {
    return axios.get(API_URL + 'agent', { headers: authHeader() });
  }

  getMonitorBoard() {
    return axios.get(API_URL + 'monitor', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();