import { expect } from '../lib/expect';
const log = (...args) => console.log.apply(console, args);

/**
 * Example about reducer, get initial state and return new state
 */
export const counter = (state = 0, action) => {
  const { type } = action;

  if ('INCREMENT' === type) {
    return state + 1;
  }

  if ('DECREMENT' === type) {
    return state - 1;
  }

  return state;
};

expect(
  counter(0, { type: 'INCREMENT' })
).toEqual(1);

expect(
  counter(1, { type: 'INCREMENT' })
).toEqual(2);

expect(
  counter(2, { type: 'DECREMENT' })
).toEqual(1);

expect(
  counter(undefined, { type: 'DECREMENT' })
).toEqual(-1);

expect(
  counter(2, { type: 'UNKNOWN' })
).toEqual(2);

log('Done!!!');
