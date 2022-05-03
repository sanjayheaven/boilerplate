import { createModel, createSchema } from "../../../Gganbu/src/db/mongodb"
import { createBasicAction } from "../../../Gganbu/src/db/mongodb/action"
export const UserSchema = createSchema({
  username: String,
  password: String,
  name: String,
})

export const UserModel = createModel(module, UserSchema)

export const UserBasicAction = createBasicAction(module, UserModel)
