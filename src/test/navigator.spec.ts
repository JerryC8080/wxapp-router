import test from 'ava';

import navigator, { PathType } from '../lib/navigator';

import { Page } from './wx-page-mock';
import { callAsFail, callAsSuccess } from './wx-route-mock';

test.serial('gotoPage', async (t) => {
  global.wx = callAsSuccess;

  const pages = [new Page(), new Page()];
  global.getCurrentPages = () => pages;

  const url = '/pages/user/index';
  const query = { name: 'jc' };
  const expectUrl = `${url}?name=${query.name}`;

  {
    const result: any = await navigator.gotoPage(
      { path: url, type: PathType.TAB },
      query
    );
    t.is(result?.url, expectUrl);
    t.is(result?.whoami, 'switchTab');
  }

  {
    const result: any = await navigator.gotoPage(url, query);
    t.is(result?.url, expectUrl);
    t.is(result?.whoami, 'navigateTo');
  }

  {
    pages.push(new Page({ route: url }));
    Array(7)
      .fill('')
      .forEach(() => pages.push(new Page()));
    const result: any = await navigator.gotoPage(url, query);
    t.is(result?.delta, 7);
    t.is(result?.whoami, 'navigateBack');
  }

  {
    const myUrl = '/pages/goods/index';
    const myExpectUrl = `${myUrl}?name=${query.name}`;

    const result: any = await navigator.gotoPage(myUrl, query);
    t.is(result?.url, myExpectUrl);
    t.is(result?.whoami, 'redirectTo');
  }

  global.wx = undefined;
  global.getCurrentPages = undefined;
});

test.serial('wx api as success', async (t) => {
  global.wx = callAsSuccess;

  const url = '/pages/user/index';
  const query = { name: 'jc' };
  const expectUrl = `${url}?name=${query.name}`;

  {
    const result: any = await navigator.navigateTo(url, query);
    t.is(result?.url, expectUrl);
  }

  {
    const result: any = await navigator.redirectTo(url, query);
    t.is(result?.url, expectUrl);
  }

  {
    const result: any = await navigator.switchTab(url, query);
    t.is(result?.url, expectUrl);
  }

  {
    const pages = [new Page(), new Page()];
    global.getCurrentPages = () => pages;

    const delta = 1;
    const setData = { name: 'jc' };
    const result: any = await navigator.navigateBack({ delta }, { setData });

    t.is(result?.delta, delta);
    t.is(pages[0].data, setData);

    global.getCurrentPages = undefined;
  }

  global.wx = undefined;
});

test.serial('wx api as fail', async (t) => {
  global.wx = callAsFail;

  const url = '/pages/user/index';
  const query = { name: 'jc' };
  const expectUrl = `${url}?name=${query.name}`;

  {
    await navigator
      .navigateTo(url, query)
      .catch((error) => t.is(error?.url, expectUrl));
  }

  {
    await navigator
      .redirectTo(url, query)
      .catch((error) => t.is(error?.url, expectUrl));
  }

  {
    await navigator
      .switchTab(url, query)
      .catch((error) => t.is(error?.url, expectUrl));
  }

  {
    const pages = [new Page(), new Page()];
    global.getCurrentPages = () => pages;

    const delta = 1;
    const setData = { name: 'jc' };
    await navigator.navigateBack({ delta }, { setData }).catch((error) => {
      t.is(error?.delta, delta);
      t.is(pages[0].data, setData);
    });

    global.getCurrentPages = undefined;
  }

  global.wx = undefined;
});

test('locked while concurrent', async (t) => {
  global.wx = callAsSuccess;
  const url = '/pages/user/index';

  {
    navigator.navigateTo(url);
    const error = await t.throwsAsync(navigator.navigateTo(url));
    t.is(error.message, 'req locked');
  }

  global.wx = undefined;
});
