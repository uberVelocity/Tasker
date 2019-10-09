import axios from 'axios';
import DebuggerService from '../services/DebuggerService';

const url = 'api/user/';

class AuthenticationService {
    static async register(credentials) {
        return await axios.post(url + 'register', {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password
        });
    }

    static async login(credentials) {
        return await axios.post('api/user/login', {
            email: credentials.email,
            password: credentials.password
        });
    }
}

export default AuthenticationService;