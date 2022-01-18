const mongoose = require("mongoose");
const schema = mongoose.Schema;
/**
 * Sensor
 */
const Sensor = mongoose.model(
    "Sensor",
    new mongoose.Schema({
        positionNumber:{
            type: Number,
            default: null
        },
        state:{
            type: Number,     //0: Ô trống, 1: Ô đã bị chiếm chỗ, 2: Sensor trong ô khả năng bị hỏng
            default: 0
        },
    }, {
        timestamps: true,
    })
);

module.exports = Sensor;