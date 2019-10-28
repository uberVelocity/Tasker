import axios from 'axios';
import DebuggerService from '../services/DebuggerService';

const url = 'http://localhost:5000/api/user/';

class AuthenticationService {
    static async register(credentials) {

        const response = await axios.post(url + 'register', {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password
        });

        return response;
    }

    static async login(credentials) {
        const response = await axios.post(url + 'login', {
            email: credentials.email,
            password: credentials.password
        });
        return response;
    }
}

export default AuthenticationService;