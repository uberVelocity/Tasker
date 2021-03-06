const url = 'http://packager:4004/api/consumer';
const rabbit = require('amqplib/callback_api');

module.exports = class StreamService {

    static async streamGw(data) {        
        // Send the data to rabbitMQ
        rabbit.connect('amqp://rabbit', function(error0, connection) {
             if (error0) {
                 throw error0;
             }

            // Create the channel between ingestion and RabbitMQ
             connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                const queue = 'gw';
                const msg = JSON.stringify(data);

                // Create queue if it does not exist yet
                channel.assertQueue(queue, {
                    durable: false
                });

                // Send data gw data to queue
                channel.sendToQueue(queue, Buffer.from(msg));
                console.log(`Data sent to RabbitMQ gw: ${msg}`);
             });
        });

    }

    static async streamCo2(data) {
        
        // Send the data to rabbitMQ
        rabbit.connect('amqp://rabbit', function(error0, connection) {
             if (error0) {
                 throw error0;
             }

            // Create the channel between ingestion and RabbitMQ
             connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                const queue = 'co2';
                const msg = JSON.stringify(data);
                                
                // Create queue if it does not exist yet
                channel.assertQueue(queue, {
                    durable: false
                });

                // Send data co2 data to queue
                channel.sendToQueue(queue, Buffer.from(msg));
                console.log(`Data sent to RabbitMQ co2: ${msg}`);
             });
        });
    }
}