# vue-administration-system

> 基于vue2 element-ui的后台管理系统

总所周知，mockjs模拟假数据会拦截请求并模拟返回，这样一来就无法模拟真实请求过程

基于这个问题，本项目中mockjs直接集成在webpack的本地服务器中，实现最接近真实环境的mock

mock服务器基于express，详见build/dev-server.js

这样一来mock与本地项目共用同一服务器 同一端口号，完美绕过跨域问题

ps： 登录页面的验证码随便填写即可

## 更换配色
目前支持4种配色：
- 默认白
- 原谅绿
- 基佬紫
- 土豪金

在main.js中注释掉不要的配色即可调整配色方案，默认基佬紫

## 目标功能
- [x] mock嵌入 -- 完成
- [x] 登录功能 -- 完成
- [x] 基础列表 -- 完成
- [x] 基础增删改查 -- 完成
- [x] 基础路由 -- 完成
- [x] 更多主题配色 
- [ ] 图片裁剪上传
- [ ] markdown编辑器
- [ ] 富文本编辑器
- [ ] 数据可视化
- [ ] 持续部署，持续集成
- [ ] 可视化工单

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
