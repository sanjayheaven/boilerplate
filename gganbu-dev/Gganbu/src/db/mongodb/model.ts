import mongoose, { Schema, SchemaDefinitionProperty } from "mongoose"
import path from "path"

export const createSchema = (obj: SchemaDefinitionProperty) => {
  return new Schema(obj)
}

export const createModel = (module: NodeModule, schema: Schema) => {
  let name = path.parse(module.filename).name
  return mongoose.model(name, schema)
}

export const ObjectId = Schema.Types.ObjectId

export { SchemaDefinitionProperty } from "mongoose"
