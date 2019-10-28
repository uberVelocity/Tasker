const axios = require('axios');

const url = 'http://ingest:4003/api/ingest/gw';

module.exports = class StreamService {

    static async streamData(data) {
        return await axios.post(url, {
            data
        });
    }

}