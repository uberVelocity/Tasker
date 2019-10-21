const axios = require('axios');

const url = 'http://localhost:4003/api/ingest';

module.exports = class StreamService {

    static async streamData() {
        return await axios.get(url);
    }

}