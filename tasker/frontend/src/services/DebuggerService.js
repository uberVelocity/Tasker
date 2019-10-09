import axios from 'axios';

const url = 'api/debugger/';

class DebuggerService {
    static async sendMessage(message) {
        await axios.post(url + 'log', {
            message
        });
    }
}

export default DebuggerService; 