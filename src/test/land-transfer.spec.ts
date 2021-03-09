import test, { after, before } from 'ava';

import { LandTransfer, landTransferDecorator } from '../lib/land-transfer';
import { Router } from '../lib/router';

import { Page } from './wx-page-mock';
import { callAsFail, callAsSuccess } from './wx-route-mock';

const pages = [new Page({ route: '/pages/home/index' }), new Page()];

before(() => {
  global.wx = callAsSuccess;
  global.getCurrentPages = () => pages;
});

after(() => {
  global.getCurrentPages = undefined;
  global.wx = undefined;
});

test.serial('LandTransfer quick usage', async (t) => {
  const landTransfer = new LandTransfer();
  const options = { path: pages[0].route, name: 'jc' };
  const result: any = await landTransfer.run(options);

  t.is(result?.url, `${options.path}?name=${options.name}`);
});

test.serial('LandTransfer set Router instance', async (t) => {
  const router = new Router();
  const landTransfer = new LandTransfer({ router });
  const routeStr = pages[0].route;

  router.register({
    route: routeStr,
    path: '/home',
  });

  const options = { path: '/home', name: 'jc' };

  const result: any = await landTransfer.run(options);

  t.is(result?.url, `${routeStr}?name=${options.name}`);
});

test.serial('LandTransfer set gotoPage', async (t) => {
  const options = { path: '/home', name: 'jc' };

  const landTransfer = new LandTransfer({
    gotoPage: (path, query) => {
      t.is(path, options.path);
      t.deepEqual(query, { name: options.name });
      return Promise.resolve();
    },
  });

  await landTransfer.run(options);
});

test.serial('LandTransfer on short params mode as fail', async (t) => {
  // 模拟扫码入参；
  const scene = 'ABCDEFG';
  const contentObj = { name: 'jc', age: 18 };

  // 定义路由
  const routeUrl = '/pages/home/index';
  const landTransfer = new LandTransfer({
    convertSceneParams: async (sceneSp) => {
      t.is(sceneSp, scene);
      return contentObj;
    },
  });

  const page = new Page({
    route: routeUrl,
    onLoad: (options) => {
      return landTransfer.run(options).then((data) => {
        t.deepEqual(data, contentObj);
      });
    },
  });

  const error = await t.throwsAsync(page.onLoad({ scene }));
  t.is(error.message, 'path invalid');
});

test.serial('LandTransfer on short params mode as warn', async (t) => {
  // 定义路由
  const routeUrl = '/pages/home/index';

  // 模拟扫码入参；
  const scene = 'ABCDEFG';

  const landTransfer = new LandTransfer();

  const page = new Page({
    route: routeUrl,
    onLoad: (options) => landTransfer.run(options),
  });

  const data = await page.onLoad({ scene, path: routeUrl });

  t.deepEqual(data, {
    url: routeUrl,
    whoami: 'navigateTo',
  });
});

test.serial('LandTransfer on short params mode as success', async (t) => {
  // 定义路由
  const routeUrl = '/pages/home/index';

  // 模拟扫码入参；
  const scene = 'ABCDEFG';
  const contentObj = { name: 'jc', age: 18, path: routeUrl };

  const landTransfer = new LandTransfer({
    convertSceneParams: async (sceneSp) => {
      t.is(sceneSp, scene);
      return contentObj;
    },
  });

  const page = new Page({
    route: routeUrl,
    onLoad: (options) => landTransfer.run(options),
  });

  const data = await page.onLoad({ scene });

  t.deepEqual(data, {
    url: `${routeUrl}?name=${contentObj.name}&age=${contentObj.age}`,
    whoami: 'navigateTo',
  });
});

test.serial('LandTransfer on short params mode with decorator', async (t) => {
  // 定义路由
  const routeUrl = '/pages/home/index';

  // 模拟扫码入参；
  const scene = 'ABCDEFG';
  const contentObj = { name: 'jc', age: 18, path: routeUrl };

  class MyPage {
    @landTransferDecorator({
      convertSceneParams: async (sceneSp) => {
        t.is(sceneSp, scene);
        return contentObj;
      },
    })
    onLoad(options) {
      return Promise.resolve(options);
    }
  }

  const myPage = new MyPage();

  const page = new Page({
    route: routeUrl,
    onLoad: (options) => myPage.onLoad(options),
  });

  const data = await page.onLoad({ scene });

  t.deepEqual(data, { scene });
});

test.serial(
  'LandTransfer on short params mode with decorator on fail with not onLoad',
  async (t) => {
    // 定义路由
    const routeUrl = '/pages/home/index';

    // 模拟扫码入参；
    const scene = 'ABCDEFG';
    const contentObj = { name: 'jc', age: 18, path: routeUrl };

    try {
      class MyPage {
        @landTransferDecorator({
          convertSceneParams: async (sceneSp) => {
            t.is(sceneSp, scene);
            return contentObj;
          },
        })
        onShow(options) {
          return Promise.resolve(options);
        }
      }

      new MyPage();
    } catch (error) {
      t.is(error.message, 'landTransferDecorator only work on "onLoad"');
    }
  }
);

test.serial(
  'LandTransfer on short params mode with decorator, go ahead while navigator error',
  async (t) => {
    const originWx = global.wx;
    global.wx = callAsFail;

    // 定义路由
    const routeUrl = '/pages/home/index';

    // 模拟扫码入参；
    const scene = 'ABCDEFG';
    const contentObj = { name: 'jc', age: 18, path: routeUrl };

    class MyPage {
      @landTransferDecorator({
        convertSceneParams: async (sceneSp) => {
          t.is(sceneSp, scene);
          return contentObj;
        },
      })
      onLoad(options) {
        return Promise.resolve(options);
      }
    }

    const myPage = new MyPage();

    const page = new Page({
      route: routeUrl,
      onLoad: (options) => myPage.onLoad(options),
    });

    const data = await page.onLoad({ scene });

    t.deepEqual(data, { scene });

    global.wx = originWx;
  }
);
