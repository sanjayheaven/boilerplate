const fs = require("fs")
const { resolve, extname } = require("path")
const AllowExtNames = [".js", ".ts"]

const BasicActions = fs
  .readdirSync(resolve(__dirname, "./basic"))
  .reduce((acc, file) => {
    if (!AllowExtNames.includes(extname(file))) return acc
    let actions = require(resolve(__dirname, "./basic", file))
    acc = { ...acc, ...actions }
    return acc
  }, {})

const UtilActions = fs
  .readdirSync(resolve(__dirname, "./util"))
  .reduce((acc, file) => {
    if (!AllowExtNames.includes(extname(file))) return acc
    let actions = require(resolve(__dirname, "./util", file))
    acc = { ...acc, ...actions }
    return acc
  }, {})

console.log("数据库提供的服务", {
  ...BasicActions,
  ...UtilActions,
})
module.exports = {
  ...BasicActions,
  ...UtilActions,
}
