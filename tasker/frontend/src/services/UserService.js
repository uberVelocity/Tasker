import axios from 'axios';

const url = 'http://localhost:5000/api/info/';

class UserService {
    
    // Returns all user info
    static async getInfo() {
        const response = await axios.post(url + 'user', {
            token: localStorage.getItem('authorization')
        });
        return response;
    }
}

export default UserService;