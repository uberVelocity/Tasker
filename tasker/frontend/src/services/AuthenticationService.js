import axios from 'axios';

const url = 'api/user/';

class AuthenticationService {
    static async register(credentials) {
        const resResult = await axios.post('api/user/register', {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password
        });
    }

    static async login(credentials) {
        const resResult = await axios.post('api/user/login', {
            email: credentials.email,
            password: credentials.password
        });
    }
}

export default AuthenticationService;