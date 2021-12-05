const mongoose = require("mongoose");
const schema = mongoose.Schema;
/**
 * Địa điểm đỗ xe
 */
const Place = mongoose.model(
  "Place",
  new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    listArea:[{
        type: schema.Types.ObjectId,
        ref: 'Area',
        required: true,
        trim: true,
    }],
  }, {
    timestamps: true,
  })
);

module.exports = Place;