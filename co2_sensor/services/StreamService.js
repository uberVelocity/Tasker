const axios = require('axios');

const url = 'http://ingestion:4003/api/ingest/co2';

module.exports = class StreamService {

    // Streams data to ingestion service from CO2 sensor
    static async streamData(data) {
        return await axios.post(url, {
            data
        });

    }

}