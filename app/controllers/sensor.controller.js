const Sensor = require("../models/sensor.model");
const Base = require("./base.controller");
const AppError = require("../utils/appError");

module.exports = {
    updateSensor: Base.updateOne(Sensor),
    getSensorByID: Base.getOne(Sensor)
}