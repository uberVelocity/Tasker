import axios from 'axios';
import DebuggerService from '../services/DebuggerService';

const url = 'api/user/';

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
        await DebuggerService.sendMessage(response);
        return response;
    }
}

export default AuthenticationService;