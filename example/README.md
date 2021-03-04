# WxApp Router 实例小程序

## Setup

### Step1：安装依赖

```shell
npm i
```

### Step2: 运行「微信小程序开发者工具」，导入项目

### Step3: 构建 npm 包

微信小程序开发者工具 → 工具 → 构建 npm

### Step4：DONE

## 目录说明

```shell
.
├── README.md
├── miniprogram
│   ├── app.js
│   ├── app.json
│   ├── app.ts
│   ├── app.wxss
│   ├── components
│   │   └── router  // 自定组件 <Router />
│   ├── pages   // 测试页面
│   │   ├── home
│   │   ├── pageA
│   │   ├── pageB
│   │   └── pageC
│   ├── routes  // 路由配置文件
│   │   └── index.ts
│   └── sitemap.json
├── package.json
├── project.config.json
├── tsconfig.json
└── yarn.lock
```

## Feature

本实例，提供一套使用 `wxapp-router` 的项目架构范式，包含：

- 提供自定义组件 <Router />
- 路由配置文件示例

即将支持的特性：

- [ ] routes 支持 TS 层次联想，例如：routes.pages.a.go();
- [ ] 页面入参的 TS 类型支持，例如：routes.pages.a.go(query: QueryType);
- [ ] 根据 `app.json` 自动生成路由配置
