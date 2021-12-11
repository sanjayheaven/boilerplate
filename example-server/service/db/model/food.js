const mongoose = require("mongoose")
require("mongoose-long")(mongoose)
const {
  Types: { Long },
} = mongoose

const schema = {
  sequence: Number,
  categoryId: {
    type: mongoose.SchemaTypes.ObjectId, //角色
    ref: "Category",
  },
  canteenId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Canteen",
  },
  ifTime: Boolean,
  timeList: [
    {
      timeStart: String,
      timeEnd: String,
    },
  ],
  foodName_ch: {
    type: String,
    set(str) {
      return str.normalize("NFKC")
    },
  },
  foodName_en: {
    type: String,
    set(str) {
      return str.normalize("NFKC")
    },
  },
  buffetId: [String],
  ifBuffet: Boolean,
  desc_ch: { type: String },
  desc_en: { type: String },
  ifRecommend: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  customize: [
    {
      title_ch: String,
      title_en: String,
      ifMultiple: Boolean, //flavors中的值是否可多选
      flavors: [
        {
          text_ch: String,
          text_en: String,
          addPrice: { type: Number, default: 0 },
        },
      ],
    },
  ],
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
