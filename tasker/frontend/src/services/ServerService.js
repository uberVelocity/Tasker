import axios from 'axios';

const url = 'http://localhost:5000/api/servers/';

class ServerService {
    // Get Servers
    static getServers(token) {
        return new Promise(async (resolve, reject) => {
            try {
                const config = {
                    headers: {
                        authorization: token
                    }
                }
                const res = await axios.get(url, config);
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

    // Create Posts
    static insertServer(serverData, token) {
        const config = {
            headers: {
                authorization: token
            }
        }
        return axios.post(url, {
            serverData
        }, config);
    }

    // Delete Posts
    static deleteServer(id, token) {
        const config = {
            headers: {
                authorization: token
            }
        }
        return axios.delete(`${url}${id}`, config);
    }
}

export default ServerService;