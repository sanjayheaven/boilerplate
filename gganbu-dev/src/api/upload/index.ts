import { ServiceAction } from "Gganbu/src/types/service"
import UploadMiddleware from "../../../Gganbu/src/upload"

export const uploadApi: ServiceAction = async (post) => {
  console.log(post)
  return post
}
uploadApi.config = { middlewares: [UploadMiddleware()] }
