import axios from 'axios';

const url = 'http://localhost:5000/api/debugger/';

class DebuggerService {
    static async sendMessage(message) {
        await axios.post(url + 'log', {
            message
        });
    }

    // static async serveNumber() {
    //     return await axios.get(url + 'number');
    // }
}

export default DebuggerService; 