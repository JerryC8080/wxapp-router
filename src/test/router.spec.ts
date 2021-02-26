import test from 'ava';
import rewiremock from 'rewiremock';

const { Router } = rewiremock.proxy('../lib/router', {
  navigator: {
    gotoPage: (pathOrRoute, query) => ({ pathOrRoute, query }),
  },
});

test.before(async () => {
  global.getCurrentPages = () => [];
  rewiremock.enable();
});

test.only('Router', (t) => {
  const router = new Router();

  const routesOption = [
    { path: '/home', route: '/pages/home/index' },
    { path: '/user/:id', route: '/pages/user/index' },
    { path: '/:type/:id', route: '/pages/common/index' },
  ];

  router.batchRegister(routesOption);

  const result1 = router.gotoPage('/home', { name: 'jc' });
  t.is(result1.pathOrRoute, routesOption[0].route);
  t.deepEqual(result1.query, { name: 'jc' });

  const result2 = router.gotoPage('/user/123', { name: 'jc' });
  t.is(result2.pathOrRoute, routesOption[1].route);
  t.deepEqual(result2.query, { name: 'jc', id: '123' });

  const result3 = router.gotoPage('/goods/123', { name: 'jc' });
  t.is(result3.pathOrRoute, routesOption[2].route);
  t.deepEqual(result3.query, { name: 'jc', id: '123', type: 'goods' });

  const routes = router.getRoutes();

  t.truthy(routes.pages.home);

  const result4 = routes.pages.home.go({ name: 'jc' });

  t.is(result4.pathOrRoute, routesOption[0].route);
  t.deepEqual(result4.query, { name: 'jc' });
});

test.after(() => {
  rewiremock.disable();
});
