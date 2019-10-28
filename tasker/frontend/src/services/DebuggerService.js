import axios from 'axios';

const url = 'http://minikube.info/api/debugger/';

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