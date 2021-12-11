const mongoose = require("mongoose")
require("mongoose-long")(mongoose)
const {
  Types: { Long },
} = mongoose

const schema = {
  foodId: {
    type: mongoose.SchemaTypes.ObjectId, //角色
    ref: "Food",
  },
  ifSale: { type: Boolean },
  sold: { type: Number, default: 0 },
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
