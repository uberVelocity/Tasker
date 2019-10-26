const rabbit = require("amqplib/callback_api");

module.exports = class PackageService {
  static getDataGw() {
    console.log('inspecting data received from queue');
    rabbit.connect("amqp://rabbit", function(error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }
        const queue = 'gw';

        channel.assertQueue(queue, {
          durable: false
        });

        console.log(" [*] Waiting for messages in %s.", queue);

        channel.consume(queue, function(msg) {
          const data = msg.content;
          console.log(`GW received: ${data}`);        
        }, {
            noAck: true
        });

      });
    });
  }

  static getDataCo2() {
    console.log('inspecting data received from queue');
    rabbit.connect("amqp://rabbit", function(error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }
        const queue = 'co2';

        channel.assertQueue(queue, {
          durable: false
        });

        console.log(" [*] Waiting for messages in %s.", queue);

        channel.consume(queue, function(msg) {
            console.log(`co2: ${msg.content}`);
        }, {
            noAck: true
        });

      });
    });
  }
};
