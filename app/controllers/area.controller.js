const Area = require("../models/area.model");
const Base = require("./base.controller");
const AppError = require("../utils/appError");

module.exports = {
    getAreaByID: Base.getOne(Area), 
}