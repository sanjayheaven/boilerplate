import mongoose, {
  Schema,
  SchemaDefinition,
  SchemaDefinitionProperty,
} from "mongoose"
import path from "path"

export const createSchema = (obj: SchemaDefinitionProperty) => {
  return new Schema(obj)
}

export const createModel = (schema: Schema) => {
  return () => {
    let fileName = path.parse(__filename).name
    console.log(__filename, fileName)
    return mongoose.model(fileName, schema)
  }
}
