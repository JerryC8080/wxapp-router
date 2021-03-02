# WxApp Router

[![CircleCI](https://img.shields.io/circleci/build/github/JerryC8080/wxapp-router/master?style=for-the-badge)](https://circleci.com/gh/JerryC8080/wxapp-router/tree/master)
[![Coveralls github branch](https://img.shields.io/coveralls/github/JerryC8080/wxapp-router/master?style=for-the-badge)](https://coveralls.io/github/JerryC8080/wxapp-router?branch=master)
[![NPM Version](https://img.shields.io/npm/v/@jerryc/wxapp-router.svg?style=for-the-badge)](https://www.npmjs.com/package/@jerryc/wxapp-router)
[![NPM Downloads](https://img.shields.io/npm/dm/@jerryc/wxapp-router.svg?style=for-the-badge)](https://www.npmjs.com/package/@jerryc/wxapp-router)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@jerryc/mini-logger.svg?style=for-the-badge)

## Motivation

对于微信小程序原生路由：

1. 写代码，要显式判断情况，然后使用不同的 wx.xxx
2. 暴露真实路由，通过小程序二维码等方式暴露出去的路径，不利于修改项目结构。
3. 微信路由十层级路由问题、页面死循环问题。
4. 小程序无限二维码解决方案。（短链参数解析）

## Feature

1. 虚拟路由，解决小程序对外暴露真实路径的问题。
1. 动态路由参数。
1. 智能跳转，解决小程序页面栈十层限制问题，与解决小程序页面死循环问题

## Download

```shell
npm install @jerryc/wxapp-router
```

## Quick Usage

```typescript
import { Router } from '@jerryc/wxapp-router';

// 创建路由实例
const router = new Router();

// 注册路由
router.register({
  route: '/pages/user/index', // 真实路由
  path: '/user/:id', // 虚拟路由
});

const query = { name: 'jc', age: 18 };

// 智能跳转
router.gotoPage('/user/123', query);
// 跳转到 /pages/user/index
// onLoad(options) 中 options = {name: 'jc', age: 18, id: '123'};

// 显式跳转
router.redirectTo('/user/:123', query);
router.navigateTo('/user/:123', query);
router.navigateBack('/user/:123', query);
router.switchTab('/user/:123', query);
```

## 智能跳转策略

## 动态路由参数

## 虚拟路由 & 落地中转策略

## 导航器 Navigator

## 使用自定义组件跳转

## 内部路由策略

## TypeScript

## 如何组织项目

## 通过替换跳转引擎，以支持 TaroJS

## API

## License

This project is licensed under the [MIT license](LICENSE).  
Copyright (c) JerryC Huang (huangjerryc@gmail.com)

## TODO

- [ ] routes 支持 TS 层次联想，例如：routes.pages.a.go();
- [ ] 页面入参的 TS 类型支持，例如：routes.pages.a.go(query: QueryType);
- [ ] 支持底层替换跳转引擎，以支持小程序框架的路由跳转替换，或者其他跨端需求；
- [ ] 自动化启动
- [ ] 文档重构
