# vue-administration-system

> 基于vue2 element-ui的后台管理系统

总所周知，mockjs模拟假数据会拦截请求并模拟返回，这样一来就无法模拟真实请求过程

基于这个问题，本项目中mockjs直接集成在webpack的本地服务器中，实现最接近真实环境的mock

mock服务器基于express，详见build/dev-server.js


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```
