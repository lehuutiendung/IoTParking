const express = require('express');
const router = express.Router();
const AppError = require("../utils/appError")
const sensorController = require("../controllers/sensor.controller");
const Sensor = require("../models/sensor.model");
const fs = require("fs");
module.exports = router;

/** 
 * @swagger 
 * /api/sensors/{:id}:
 *   get: 
 *      tags: [Sensor] 
 *      summary: 
 *      description: 
 *      responses:  
 *       201: 
 *         description: Success  
 */
 router.get("/:id", sensorController.getSensorByID);

/** 
 * @swagger 
 * /api/sensors/{:id}:
 *   put: 
 *      tags: [Sensor] 
 *      summary: 
 *      description: 
 *      responses:  
 *       201: 
 *         description: Success  
 */
router.put("/:id", sensorController.updateSensor);

