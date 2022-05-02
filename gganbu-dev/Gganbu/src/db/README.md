# Mongodb

提供两种方式

- 普通，作为插件，提供扩展接口即可
- 遵循面向服务规则，需要隔离数据库操作与业务逻辑。

  - 区别在于后者 需要抽象 db 的 acitons

- 普通，
  提供 createSchema createModel 即可。
- 面向服务
  - 抽象数据库，所有的操作以 DB 为主
    - DB.getOrders() DB.getUsers()
  - 提供基础 actions （自动提供）
    - 例如 DB.getUser() DB.getUsers() DB.deleteUser() DB.createUser() DB.updateUser()
  - 提供 可以自定义、扩展 action 的地方
    - 例如 DB.getUsersForStatistics()
- 为什么是钩子？为什么是 useHook，是为了解决依赖的问题吗？那我能不能 useModel()? useDB??
