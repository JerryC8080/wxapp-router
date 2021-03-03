# WxApp Router

<p align="center">
  <img src="https://bluesun-1252625244.cos.ap-guangzhou.myqcloud.com/img/20210302174607.svg" width=350 />
</p>

[![CircleCI](https://img.shields.io/circleci/build/github/JerryC8080/wxapp-router/master?style=for-the-badge)](https://circleci.com/gh/JerryC8080/wxapp-router/tree/master)
[![Coveralls github branch](https://img.shields.io/coveralls/github/JerryC8080/wxapp-router/master?style=for-the-badge)](https://coveralls.io/github/JerryC8080/wxapp-router?branch=master)
[![NPM Version](https://img.shields.io/npm/v/@jerryc/wxapp-router.svg?style=for-the-badge)](https://www.npmjs.com/package/@jerryc/wxapp-router)
[![NPM Downloads](https://img.shields.io/npm/dm/@jerryc/wxapp-router.svg?style=for-the-badge)](https://www.npmjs.com/package/@jerryc/wxapp-router)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@jerryc/mini-logger.svg?style=for-the-badge)

## 动机

对于微信小程序原生路由：

1. 原生的 `wx.navigateTo/redirectTo/switchTab/navigateBack` 较底层，使用体验较原始。
2. 暴露真实路由，通过小程序二维码等方式暴露出去的路径，不利于修改项目结构。
3. 微信路由十层级路由问题、页面死循环问题。
4. 小程序无限二维码解决方案。（短链参数解析）

## 介绍

1. 虚拟路由，解决小程序对外暴露真实路径的问题。
1. 动态路由参数。
1. 智能跳转，解决小程序页面栈十层限制问题，与解决小程序页面死循环问题

## 下载

```shell
npm install wxapp-router
```

## 使用说明

### 快速使用

```typescript
import { Router } from 'wxapp-router';

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

### 智能跳转策略

当我们使用 `router.gotoPage()` 的时候，`wxapp-router` 会根据一套计算逻辑来确定使用微信小程序路由 API 中的哪一个来实现路由跳转。

具体逻辑如下：

1. 当跳转的路由为小程序 tab 页面时，则使用 `wx.switchTab`。
2. 当页面栈达到 10 层之后，如果要跳转的页面在页面栈中，使用 `wx.navigateBack({ delta: X })` 出栈到目标页面。
3. 当页面栈达到 10 层之后，目标页面不存在页面栈中，使用 `wx.redirectTo` 替换栈顶页面。
4. 其他情况使用 `wx.navigateTo`

详细代码参考：[navigator.ts/gotoPage](https://github.com/JerryC8080/wxapp-router/blob/ff8db80cbf6ea939509504e3fe6ecec5cecc0790/src/lib/navigator.ts#L39)

### 动态路由匹配

我们经常需要把某种模式匹配到的所有路由，全都映射到同个页面中去。

例如，我们有一个 Goods 页面，对于所有 ID 各不相同的商品，都要使用这个页面来承载。

那么，我们可以在 `wxapp-router` 的路由路径中使用 「动态路径参数」(dynamic segment) 来达到这个效果：

```javascript
import { Router } from 'wxapp-router';

// 创建路由实例
const router = new Router();

// 注册路由
router.register({
  route: '/pages/goods/index', // 真实路由
  path: '/goods/:id', // 虚拟路由
});

// 跳转到 /pages/goods/index，参数: onLoad(options) 的 options = { id: '123' }
router.gotoPage('/goods/123');

// 跳转到 /pages/goods/index，参数: onLoad(options) 的 options = { id: '456' }
router.gotoPage('/goods/456');
```

`wxapp-router` 使用 [path-to-regexp](https://github.com/pillarjs/path-to-regexp) 作为路径匹配引擎，以支持更多高级的匹配模式。

如要学习更高级的路径匹配，参考 `path-to-regexp` 的 [文档 - Parameters 章节](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0#parameters)

### 外部路由策略：虚拟路由 & 落地中转策略

### 内部路由策略：体验更加的调用方式

### 使用自定义组件跳转

### TypeScript 支持

### 如何组织项目

### 根据 `app.json` 自动生成路由配置

### 导航器 Navigator

### 通过替换跳转引擎，以支持 TaroJS

## 架构设计

## API

详见官网：[wxapp-router](https://jerryc8080.github.io/wxapp-router/)

## License

This project is licensed under the [MIT license](LICENSE).  
Copyright (c) JerryC Huang (huangjerryc@gmail.com)
