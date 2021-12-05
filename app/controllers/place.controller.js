const Place = require("../models/place.model");
const Base = require("./base.controller");

module.exports = {
    getPlaceAll: Base.getAll(Place),
    getPlaceByID: Base.getOne(Place),
}