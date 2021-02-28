// index.ts
import { routesConfig } from '../../routes/index';

// 获取应用实例
const app = getApp()

Page({
  data: {
    routesConfig,
    pageAQuery: { name: 'jc' },
    pageBQuery: { name: 'david' }
  },
  goPageA() {
    app.routes.pages.pageA.go({name:"jc"});
  },
  goPageB() {
    app.routes.pages.pageB.go({name:"david"});
  },
  goPageC() {
    getApp().router.gotoPage('/pageC/katy', {age: 18});
  }
})
