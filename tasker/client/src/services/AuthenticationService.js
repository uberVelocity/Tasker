import axios from 'axios';

const url = 'api/auth/';

class AuthenticationService {
    static register(credentials) {
        return axios.post(`${url}register`, credentials);
    }
}

export default AuthenticationService;