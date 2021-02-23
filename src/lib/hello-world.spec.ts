import test from 'ava';

import helloWorld from './hello-world';

test('Hello World', (t) => {
  const desc = helloWorld();
  t.is(desc, 'Hello World');
});
