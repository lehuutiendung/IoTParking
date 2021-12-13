const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

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

function initial() {
    // // Add area and sensor
    // for(let i = 0; i < 24; i++){
    //   new Sensor({
    //     state: 0
    //   }).save(err => {
    //     if (err) {
    //       console.log("error", err);
    //     }
    //     console.log("added successfully sensor");
    //   });
    // }

    // Sensor.find({}).limit(6).skip(42).exec(function(err, result) {
    //   let objData = [];
    //   if (err) throw err;
    //   console.log(result, result.length);
    //   result.forEach(element => {
    //     let data = {
    //       positionNumber: 1,
    //       state: element._id
    //     }
    //     objData.push(data);
    //   });
      
    //   new Area({
    //     name: "Khu D",
    //     data: objData
    //   }).save(err => {
    //     if (err) {
    //       console.log("error", err);
    //     }
    //     console.log("added successfully area");
    //   });
    // });
    
    // // Add place
    // Area.find({}).limit(4).skip(4).exec(function(err, result) {
    //   let objData = [];
    //   if (err) throw err;
    //   console.log(result);
    //   result.forEach(element => {
    //    objData.push(element._id);
    //   });
    //   console.log(objData);
    //   new Place({
    //     name: "21 Thái Thịnh",
    //     listArea: objData
    //   }).save(err => {
    //     if (err) {
    //       console.log("error", err);
    //     }
    //     console.log("added successfully Place");
    //   });
    // }); 
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