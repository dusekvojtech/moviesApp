// __tests__/Interval-test.jsx

import {getInterval} from '../src/components/Carousel/Carousel';

test('Interval test', () => {
  expect(getInterval(500, 20, 8280)).toBe(2);
});
