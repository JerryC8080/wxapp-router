# Module Seed

[![CircleCI](https://img.shields.io/circleci/build/github/JerryC8080/wxapp-router/master?style=for-the-badge)](https://circleci.com/gh/JerryC8080/wxapp-router/tree/master)
[![Coveralls github branch](https://img.shields.io/coveralls/github/JerryC8080/wxapp-router/master?style=for-the-badge)](https://coveralls.io/github/JerryC8080/wxapp-router?branch=master)
[![NPM Version](https://img.shields.io/npm/v/@jerryc/wxapp-router.svg?style=for-the-badge)](https://www.npmjs.com/package/@jerryc/wxapp-router)
[![NPM Downloads](https://img.shields.io/npm/dm/@jerryc/wxapp-router.svg?style=for-the-badge)](https://www.npmjs.com/package/@jerryc/wxapp-router)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@jerryc/mini-logger.svg?style=for-the-badge)

## Motivation

对于微信小程序原生路由：

1. 写代码，要显式判断情况，然后使用不同的 wx.xxx
2. 真实路由，通过小程序二维码等方式暴露出去之后，要修改项目结构处理历史问题。
3. 十层级路由问题、页面死循环问题。
4. 小程序无限二维码解决方案。（短链参数解析）

## Feature

1. ...
2. ...

## Download

```shell
npm install @jerryc/wxapp-router
```

## Usage

```typescript
import { Router } from '@jerryc/wxapp-router';

// 页面参数
const query = { name: 'jc', age: 18 };

// 创建路由实例
const router = new Router();

// 注册路由
router.register<Query>({
  route: '/pages/user/index', // 真实路径
  path: '/user/:id', // 虚拟路由
});

// 智能跳转: redirectTo/navigateTo/navigateBack/switchTab
router.routes.pages.user.go(query);

// 显式跳转
router.routes.pages.user.redirectTo(query);
router.routes.pages.user.navigateTo(query);
router.routes.pages.user.navigateBack(query);
router.routes.pages.user.switchTab(query);

// 获取 routes，以方便挂载到 app 实例中，使路由跳转更加优雅。
const routes = router.getRoutes();
routes.pages.user.go(query);

// 智能路由跳转，优先级：虚拟路由 > 真实路由
router.gotoPage('/user/123', query);
router.gotoPage('/pages/user/index', query);

// 显式真实路由跳转
router.gotoRealPage('/pages/user/index', query);
```

**使用自定义组件跳转**

```html
<GotoPage path="/user/123" />
<GotoPage route="/pages/user/index" />
<GotoPage path="/user/123" type="navigateTo" />
<GotoPage path="/user/123" type="redirectTo" />
<GotoPage path="/user/123" type="navigateBack" />
<GotoPage path="/user/123" type="switchTab" />
```

**批量注册**

```typescript
import { Router } from '@jerryc/wxapp-router';

// 创建路由实例
const router = new Router();

const routes = [
  {
    route: '/pages/user/index',
    path: '/user/:id',
  },
  {
    route: '/pages/home/index',
    path: '/home',
  },
];

const querys: [UserQuery, HomeQuery];
type Query = typeof querys;

// 注册路由
router.batchRegister < Querys > routes;
```

## License

This project is licensed under the [MIT license](LICENSE).  
Copyright (c) JerryC Huang (huangjerryc@gmail.com)
