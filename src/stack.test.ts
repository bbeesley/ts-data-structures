import test from 'ava';
import { Stack } from './stack.js';

const state = [1, 2, 3, 7, 5, 4];

test('pop should remove and return the last element when the stack has content', (t) => {
  const s = new Stack(state);
  t.is(s.pop(), state[state.length - 1]);
});

test('pop should return undefined when the stack has no content', (t) => {
  const s = new Stack<number>();
  t.is(s.pop(), undefined);
});

test('push should set the last element to the pushed value', (t) => {
  const s = new Stack<string>();
  t.is(s.pop(), undefined);
  s.push('sausage');
  t.is(s.pop(), 'sausage');
});

test('peek should should return the last element when the stack has content but not remove it', (t) => {
  const s = new Stack<number>(state);
  t.is(s.peek(), state[state.length - 1]);
  t.is(s.pop(), state[state.length - 1]);
  t.not(s.pop(), state[state.length - 1]);
});

test('it should be iterable', (t) => {
  let iteration = 0;
  const s = new Stack<number>(state);
  for (const i of s) {
    t.is(i, state[iteration]);
    iteration += 1;
  }
  t.is(iteration, state.length);
});
