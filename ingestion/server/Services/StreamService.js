
const url = 'rabbit';

module.exports = class StreamService {
    static async streamGw(data) {
        console.log(`gw data: ${data}`);
        // Send the data to rabbitMQ
    }

    static async streamCo2(data) {
        console.log(`co2 data: ${data}`);
        // Send the data to rabbitMQ
    }
}