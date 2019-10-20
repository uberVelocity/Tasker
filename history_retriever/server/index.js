const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const history = require('./routes/api/history');

app.use('/api/history', history);

const port = process.env.PORT || 4002;


const ping = require('ping');
 
// ping all services to see if they are visible from within the network (they are if you leave out the port)
var hosts = ['co2-sensor', 'gw-sensor', 'cassandra-cluster', 'tasker', 'localhost', 'chat', 'front-end'];
function pingHosts() {
    hosts.forEach(function(host){
        ping.sys.probe(host, function(isAlive){
            var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
            console.log(msg);
        });
    });    
}

setInterval(pingHosts, 60000);

app.listen(port, () => console.log(`History retriever operational on port ${port}`));


