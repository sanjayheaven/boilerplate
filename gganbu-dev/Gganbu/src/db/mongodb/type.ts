/**
 * db config
 */
export interface DBConfig {
  address?: string
  options?: object
}

export { Schema, SchemaDefinitionProperty } from "mongoose"

export interface DBBasicAction {
  create: Promise<any>
  getOne: Promise<any>
  updateOne: Promise<any>
  getMany: Promise<any>
  deleteOne: Promise<any>
}
