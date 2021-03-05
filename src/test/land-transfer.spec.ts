import test, { after, before } from 'ava';

import { LandTransfer } from '../lib/land-transfer';
import { Router } from '../lib/router';

import { Page } from './wx-page-mock';
import { callAsSuccess } from './wx-route-mock';

const pages = [new Page('/pages/home/index'), new Page()];

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

test.skip('LandTransfer on short params mode', (t) => {
  t.is(true, true);
});
