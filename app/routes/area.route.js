const express = require('express');
const router = express.Router();
const AppError = require("../utils/appError")
const areaController = require("../controllers/area.controller");
const Area = require("../models/area.model");
const fs = require("fs");
module.exports = router;

/** 
 * @swagger 
 * /api/areas/{:id}:
 *   get: 
 *      tags: [Area] 
 *      summary: 
 *      description: 
 *      responses:  
 *       201: 
 *         description: Success  
 */
router.get("/:id", areaController.getAreaByID);

