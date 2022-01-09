import mongoose, { Schema } from "mongoose"
const ObjectId = Schema.Types.ObjectId

const foodSchema = new Schema({
  name: String,
})

export const model = mongoose.model("cate", foodSchema)
