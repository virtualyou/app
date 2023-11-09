import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASEPATH_USER; // "http://localhost:3000/api/v1/";

class UserService {
  getPublicContent = () => {
    return axios.get(API_URL + "all");
  }

  getOwnerBoard = () => {
    return axios.get(API_URL + "owner");
  }

  getModeratorBoard = () => {
    return axios.get(API_URL + "mod");
  }

  getAgentBoard = () => {
    return axios.get(API_URL + "agent");
  }
  getMonitorBoard = () => {
    return axios.get(API_URL + "monitor");
  }

  getAdminBoard = () => {
    return axios.get(API_URL + "admin");
  }
}

export default new UserService();
