const rabbit = require("amqplib/callback_api");

const localDatacenter = 'datacenter1';
const cassandra = require('cassandra-driver');
const contactPoints = ['cassandra-cluster', 'cassandra-cluster', 'cassandra-cluster'];
const loadBalancingPolicy = new cassandra.policies.loadBalancing.DCAwareRoundRobinPolicy(localDatacenter); 
const clientOptions = {
   policies : {
      loadBalancing : loadBalancingPolicy
   },
   contactPoints: contactPoints,
   authProvider: new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra'),
   keyspace:'tasker'
};
const cassandraClient = new cassandra.Client(clientOptions);

const insertCo2Consumption = 'INSERT INTO co2consumptioncompaction(server, ts, value) VALUES(?, ?, ?)';
const insertGwConsumption = 'INSERT INTO gwconsumptioncompaction(server, ts, value) VALUES(?, ?, ?)';

module.exports = class PackageService {
  static consumeAndInsertGw() {
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
          const data = JSON.parse(msg.content);
          const serverId = data[0].toString();
          
          // console.log(`data: ${data}`);
          // console.log(`$data[0]: ${data[0]}`);
          const params = [serverId, data[1], data[2]];
          PackageService.insertData(insertGwConsumption, params);        
        }, {
            noAck: true
        });

      });
    });
  }

  static consumeAndInsertCo2() {
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
          const data = JSON.parse(msg.content);
          const serverId = data[0].toString();
          
          // console.log(`data: ${data}`);
          // console.log(`$data[0]: ${data[0]}`);
          const params = [serverId, data[1], data[2]];
          PackageService.insertData(insertCo2Consumption, params);
        }, {
            noAck: true
        });

      });
    });

  }

  // Commit sensory data to Cassandra Cluster
  static async insertData(query, data) {
    // Commit data to Cassandra DB

    console.log(`attempting to insert ${data} using ${query}`);
    cassandraClient.execute(query, data, {prepare: true}, (err) => {
        if(err) {
            console.log(err);
        }
    });
  }


};
