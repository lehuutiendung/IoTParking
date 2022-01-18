// Test publish local
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');
client.on('connect', function(){
    let data = {
        id: '61bc5396382ae4c023abe352',
        state: 0
    }
    client.publish('esp32', JSON.stringify(data));
    client.end();
})