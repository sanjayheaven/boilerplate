const mongoose = require("mongoose")
require("mongoose-long")(mongoose)
const {
  Types: { Long },
} = mongoose

const schema = {
  merchantId: {
    type: mongoose.SchemaTypes.ObjectId, //商户
    ref: "Merchant",
  },
  canteenName_ch: { type: String },
  canteenName_en: { type: String },
  introduce_ch: { type: String },
  introduce_en: { type: String },
  contact: { type: String },
  phone: { type: String },
  canteenID: { type: String },
  postcode: { type: String },
  address: { type: String },
  unit: { type: String },
  logo: { type: String },
  type_ch: { type: String },
  type_en: { type: String },
  cates_ch: { type: String },
  cates_en: { type: String },
  ifActive: { type: Boolean },
  ifGst: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  deviceList: [String],
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
