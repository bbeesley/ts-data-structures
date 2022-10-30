import test from 'ava';
import { Queue } from './queue.js';

const state = [1, 2, 3, 7, 5, 4];

test('dequeue should remove and return the first element when the queue has content', (t) => {
  const s = new Queue(state);
  t.is(s.dequeue(), state[0]);
});

test('dequeue should return undefined when the queue has no content', (t) => {
  const s = new Queue<number>();
  t.is(s.dequeue(), undefined);
});

test('enqueue should set the last element to the enqueued value', (t) => {
  const s = new Queue<number>(state);
  t.is(s.content[s.content.length - 1], state[state.length - 1]);
  s.enqueue(52);
  t.is(s.content[s.content.length - 1], 52);
});

test('front should should return the first element when the queue has content but not remove it', (t) => {
  const s = new Queue<number>(state);
  t.is(s.front(), state[0]);
  t.is(s.dequeue(), state[0]);
  t.not(s.front(), state[0]);
});

test('it should be iterable', (t) => {
  let iteration = 0;
  const s = new Queue(state);
  for (const i of s) {
    t.is(i, state[iteration]);
    iteration += 1;
  }
  t.is(iteration, state.length);
});
