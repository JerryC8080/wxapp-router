import test from 'ava';

import { Route } from '../lib/route';

test.skip('QueryType', () => {
  type QueryType = {
    name: string;
  };

  const route = new Route<QueryType>({ routeUrl: '/pages/home/index' });

  route.go({ name: 'david' });
});
