import axios from 'axios';

const url = 'api/servers/';

class ServerService {
    // Get Servers
    static getServers() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(server => ({
                        ...server,
                        createdAt: new Date(server.createdAt)
                    }))
                );
            } catch(err) {
                reject(err);
            }
        });
    }

    static getAbout() {
        return axios.post('api/servers/pizza');
    }

    // Create Posts
    static insertServer(text) {
        return axios.post(url, {
            text
        });
    }

    // Delete Posts
    static deleteServer(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default ServerService;