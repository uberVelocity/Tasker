import axios from 'axios';

const url = "http://localhost:4002/api/history/";

class HistoryService {

    static async getCo2(serverId) {
        return await axios.post(`${url}co2`, {
            serverId: serverId
        });
    }

    static async getGw(serverId) {
        return await axios.post(`${url}gw`, {
            serverId: serverId
        });
    }

}

export default HistoryService;