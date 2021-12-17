const mongoose = require("mongoose");
const schema = mongoose.Schema;
/**
 * Các khu vực trong một bãi đỗ xe
 */
const Area = mongoose.model(
  "Area",
  new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    data:[{
        type: schema.Types.ObjectId,
        ref: 'Sensor',
        required: true,
        trim: true,
    }],
  }, {
    timestamps: true,
  })
);

module.exports = Area;