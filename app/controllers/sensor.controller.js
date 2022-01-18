const Sensor = require("../models/sensor.model");
const Base = require("./base.controller");
const AppError = require("../utils/appError");

module.exports = {
    updateSensor: Base.updateOne(Sensor),
    getSensorByID: Base.getOne(Sensor),
    updateMQTT: async(data) => {
        try {
            const doc = await Sensor.findByIdAndUpdate(data.id, {
                $set:{
                    state: data.state
                }
            }, {
                new: true,                              //return updated doc
                runValidators: true                     //validate before update
            })
            
        } catch (error) {
            throw error;
        }
    }
}