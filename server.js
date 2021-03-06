const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const mqtt = require('mqtt');

const app = express();
require('dotenv').config();

// cross domain
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

/***************************************************************************
 * Routes
 */
app.use('/api/places', require('./app/routes/place.route'));
app.use('/api/areas', require('./app/routes/area.route'));
app.use('/api/sensors', require('./app/routes/sensor.route'));

/***************************************************************************/

const db = require('./app/models/common.model');
/****************************************************************************
 * Connect DB
 */
db.mongoose
  .connect(`mongodb+srv://admin:admin@cluster0.l5tmy.mongodb.net/iot-parking`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
/***************************************************************************/

/****************************************************************************
 * Tạo Schema Role, React
 */
const Place = require('./app/models/place.model');
const Area = require('./app/models/area.model');
const Sensor = require('./app/models/sensor.model');
const sensorController = require('./app/controllers/sensor.controller');
function initial() {
    // // Add area and sensor
    // for(let i = 0; i < 48; i++){
    //     new Sensor({
    //       positionNumber: 1,
    //       state: 0
    //     }).save(err => {
    //       if (err) {
    //         console.log("error", err);
    //       }
    //       console.log("added successfully sensor");
    //     });
    //   }
    // for(let i = 0; i < 8; i++){
    //     Sensor.find({}).limit(6).skip(i*6).exec(function(err, result) {
    //     let objSensor = [];
    //     if (err) throw err;
    //     result.forEach(element => {
    //       objSensor.push(element._id);
    //     });
    //     new Area({
    //       name: "Khu A",
    //       data: objSensor
    //     }).save(err => {
    //       if (err) {
    //         console.log("error", err);
    //       }
    //       console.log("added successfully area");
    //     });
    //   });
    // }

    //Add place
    // for(let j = 0; j < 2; j++){
    //     Area.find({}).limit(4).skip(j*4).exec(function(err, result) {
    //       let objArea = [];
    //       if (err) throw err;
    //       result.forEach(element => {
    //         objArea.push(element._id);
    //       });
    //       new Place({
    //         name: "21 Thái Thịnh",
    //         listArea: objArea
    //       }).save(err => {
    //         if (err) {
    //           console.log("error", err);
    //         }
    //         console.log("added successfully Place");
    //       });
    //     }); 
    // }
}
/***************************************************************************/

/***************************************************************************
 * Start: Swagger Configuration 
 */
const swaggerOptions = {  
  swaggerDefinition: {  
      info: {  
          title:'IoT-Parking API',  
          description: 'IoT-Parking API Information',
          version:'1.0.0',  
      },
      servers:[
        {
          url: 'http://localhost:3000'
        }
      ]  
  },  
  apis: ['./app/routes/*.js'],
}  

const swaggerDocs = swaggerJSDoc(swaggerOptions);  
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
/***************************************************************************/ 

/***************************************************************************
 * Set port, listen for requests
 */
 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
   console.log(`API Document: http://localhost:${PORT}/api-docs/`);
 });
 /***************************************************************************/

/***************************************************************************
* Connect mqtt
*/
const client = mqtt.connect('mqtt://broker.hivemq.com');
client.on('connect', function(){
  client.subscribe('esp32');
  console.log('Client has subcribed successfully');
})

client.on('message', function(topic, message){
  try{
    // PlaceID: 61bc5753b7eb3a77154a27f5 : 21 Thái Thịnh
    // AreaID: 61bc5598c4e8caf3a8d74efb : Khu A
    let listBoxID = [
      '61bc5396382ae4c023abe378',       //Vị trí ô: 1
      '61bc5396382ae4c023abe377',       //2
      '61bc5396382ae4c023abe373',       //3
      '61bc5396382ae4c023abe374',       //4
      '61bc5396382ae4c023abe375',       //5
      '61bc5396382ae4c023abe372'        //6
    ]
    let markBox = 0;              
    let dataMessage = JSON.parse(message);
    Object.keys(dataMessage).forEach(key => {
        try {
            let data = {
              id: listBoxID[markBox],
              state: dataMessage[key]
            }
            sensorController.updateMQTT(data);
            console.log('Update successfully ' + listBoxID[markBox] + ' with value ' + dataMessage[key]);
        } catch (error) {
            throw error;
        }
        markBox++;
    })
  }catch(e){
    throw e
  }
})
/***************************************************************************/

