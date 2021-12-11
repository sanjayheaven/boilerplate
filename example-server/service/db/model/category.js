const mongoose = require("mongoose")
require("mongoose-long")(mongoose)
const {
  Types: { Long },
} = mongoose
const schema = {
  canteenId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Canteen",
  },
  categoryName_ch: { type: String },
  categoryName_en: { type: String },
  seq: { type: Number, index: true },
  type: { type: String },
  buffetsList: [String],
  ifShow: { type: Boolean },
  ifMust: { type: Boolean, default: false },
  ifDiscount: [String],
}

// Food 也可以自动生成。
const path = require("path")
const firstAlphaToUpperCase = (string) => {
  let [first, ...rest] = string
  return first.toUpperCase() + rest.join("")
}
let FileName = firstAlphaToUpperCase(path.parse(__filename).name)
//
module.exports = {
  schema: mongoose.Schema(schema),
  model: mongoose.model(FileName, mongoose.Schema(schema)),
}
