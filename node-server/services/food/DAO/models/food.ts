import mongoose, { Schema } from "mongoose"
import { createModel, createSchema } from "../../../../src/plugins/ns-mongodb"
const ObjectId = Schema.Types.ObjectId

const foodSchema = new Schema({
  name: String,
  categoryId: ObjectId,
  image: String,
})

let createModelByObj = createSchema({
  name: String,
  categoryId: ObjectId,
  image: String,
})
let modelCreate = createModel(foodSchema)
export const model = mongoose.model("food", foodSchema)
