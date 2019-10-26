const axios = require('axios');

const url = 'http://ingest:4003/api/ingest/co2';

module.exports = class StreamService {

    static async streamData(data) {
        console.log('streamed data to ingest');
        return await axios.post(url, {
            data
        });

    }

}