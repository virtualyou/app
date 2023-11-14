import axios from "axios";
import authHeader from './auth-header';

//const API_URL = import.meta.env.VITE_API_BASEPATH_AUTH; // "http://localhost:3000/api/v1/auth/";
//const API_URL = "http://localhost:3000/api/v1/auth/"
const API_URL = "http://localhost:3000/api/v1/auth/";
class AuthService {
    login(username: string, password: string) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            }, { headers: authHeader() })
            .then(response => {
                if (response.data.username) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username: string, email: string, password: string) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        }, { headers: authHeader() });
    }

    registerAgent(username: string, email: string, password: string, dkey: string, ownerid: number) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password,
            dkey,
            ownerid
        }, { headers: authHeader() });
    }

    registerMonitor(username: string, email: string, password: string, dkey: string, ownerId: number) {

    }
    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);

        return null;
    }
}

export default new AuthService();