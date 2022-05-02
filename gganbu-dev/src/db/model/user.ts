import { createModel, createSchema } from "../../../Gganbu/src/db/mongodb"
export const UserSchema = createSchema({
  username: String,
  password: String,
  name: String,
})

export const UserModel = createModel(module, UserSchema)

