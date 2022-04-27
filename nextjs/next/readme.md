预渲染：

- 静态生成
- 服务端渲染

Pre-rending

- Static Generation
- SSR

**getStaticProps**?
在构建页面前获取数据
问题：如何保证根据参数获取数据。比如 query，pagination

**getStaticPaths？**
构建动态路由页面前获取数据

**getServerSideProps**
获取 SSR 数据

SSR
服务端渲染，直接在服务端实时同构渲染当前用户访问的页面
CSR
客户端渲染，就是常见的 SPA 应用
SSG
Static Site Generation
静态站点生成，应用编译构建时，预渲染页面

ISR

## 动态路由怎么预渲染？

怎么找到动态路由的params参数