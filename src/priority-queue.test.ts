import test from 'ava';
import { PriorityQueue } from './priority-queue.js';

const state = [1, 2, 3, 7, 5, 4];

test('dequeue should remove and return the first element when the queue has content', (t) => {
  const s = new PriorityQueue(state);
  t.is(s.dequeue(), state[0]);
});

test('dequeue should return undefined when the queue has no content', (t) => {
  const s = new PriorityQueue<number>();
  t.is(s.dequeue(), undefined);
});

test('enqueue should set the last element to the enqueued value', (t) => {
  const s = new PriorityQueue<number>(state);
  t.is(s.content[s.content.length - 1].data, state[state.length - 1]);
  s.enqueue(52);
  t.is(s.content[s.content.length - 1].data, 52);
});

test("enqueue should position the enqueued value based on it's priority", (t) => {
  const s = new PriorityQueue<number>(state);
  t.is(s.content[s.content.length - 1].data, state[state.length - 1]);
  s.enqueue(52, 2);
  t.is(s.front(), 52);
  s.enqueue(42, 3);
  t.is(s.front(), 42);
  s.enqueue(32, 4);
  t.is(s.front(), 32);
  s.enqueue(22, 3);
  t.is(s.content[2]?.data, 22);
});

test('front should should return the first element when the queue has content but not remove it', (t) => {
  const s = new PriorityQueue<number>(state);
  t.is(s.front(), state[0]);
  t.is(s.dequeue(), state[0]);
  t.not(s.front(), state[0]);
});

test('isEmpty returns true when the queue has no content', (t) => {
  const s = new PriorityQueue<number>();
  t.true(s.isEmpty());
  s.enqueue(1);
  s.dequeue();
  t.true(s.isEmpty());
});

test('isEmpty returns false when the queue no content', (t) => {
  const s = new PriorityQueue<number>();
  s.enqueue(1);
  t.false(s.isEmpty());
});

test('it should be iterable', (t) => {
  let iteration = 0;
  const s = new PriorityQueue(state);
  for (const i of s) {
    t.is(i, state[iteration]);
    iteration += 1;
  }
  t.is(iteration, state.length);
});
