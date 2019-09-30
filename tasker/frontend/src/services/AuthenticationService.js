
import axios from 'axios';

const url = 'api/user/';

class AuthenticationService {
    static register(credentials) {
        return axios.post(`${url}register`, credentials);
    }
}

export default AuthenticationService;