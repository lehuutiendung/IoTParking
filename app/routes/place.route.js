const express = require('express');
const router = express.Router();
const AppError = require("../utils/appError")
const placeController = require("../controllers/place.controller");
const Place = require("../models/place.model");
const fs = require("fs");
module.exports = router;

/** 
 * @swagger 
 * /api/places/{:id}:
 *   get: 
 *      tags: [Place] 
 *      summary: 
 *      description: 
 *      responses:  
 *       201: 
 *         description: Success  
 */
router.get("/:id", placeController.getPlaceByID);

/** 
 * @swagger 
 * /api/places/all:
 *   post:
 *      tags: [Place] 
 *      summary:  
 *      description: 
 *      responses:  
 *       201: 
 *         description: Success  
 */
router.post("/all", placeController.getPlaceAll);

