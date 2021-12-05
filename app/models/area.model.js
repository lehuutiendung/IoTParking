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
        positionNumber:{
          type: Number,
          default: null
        },
        state:{
          type: Number,     //0: Ô trống, 1: Ô đã bị chiếm chỗ
          default: 0
        },
    }],
  }, {
    timestamps: true,
  })
);

module.exports = Area;