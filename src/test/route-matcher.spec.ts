import test from 'ava';

import RouteMatcher from '../lib/route-matcher';

test('RouteMatcher', (t) => {
  const testCases = [
    {
      path: '/user/:id',
      route: '/pages/user/index',
      url: '/user/123',
      exceptQuery: { id: '123' },
    },
    {
      path: '/user/:name/:age',
      route: '/pages/user/index',
      url: '/user/jerryc/18',
      exceptQuery: { name: 'jerryc', age: '18' },
    },
  ];

  testCases.forEach((testCase) => {
    const matcher = new RouteMatcher(testCase.path, testCase.route);
    const result = matcher.match(testCase.url);
    t.is(result.route, testCase.route);
    t.deepEqual(result.params, testCase.exceptQuery);
  });
});
