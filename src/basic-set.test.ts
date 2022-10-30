import test from 'ava';
import { BasicSet } from './basic-set.js';

const state = [1, 2, 3, 7, 5, 4];

test('add should add an element to the set if it is not present', (t) => {
  const s = new BasicSet<number>();
  t.deepEqual(s.content, []);
  s.add(52);
  t.deepEqual(s.content, [52]);
});
test('add do nothing with an element if it is present in the set', (t) => {
  const s = new BasicSet<number>([52]);
  t.deepEqual(s.content, [52]);
  s.add(52);
  t.deepEqual(s.content, [52]);
});
test('remove should remove an element from the set if it is present', (t) => {
  const s = new BasicSet<number>(state);
  t.deepEqual(s.content, state);
  s.remove(2);
  t.deepEqual(
    s.content,
    state.filter((e) => e !== 2),
  );
});
test('remove should do nothing with an element if it is not present in the set', (t) => {
  const s = new BasicSet<number>(state);
  t.deepEqual(s.content, state);
  s.remove(52);
  t.deepEqual(s.content, state);
});
test('size should return the number of elements in the set', (t) => {
  const s = new BasicSet<number>(state);
  t.is(s.size(), state.length);
});
test('isEmpty should return true if the set is empty', (t) => {
  const s = new BasicSet<number>();
  t.true(s.isEmpty());
});
test('isEmpty should return false if the set has content', (t) => {
  const s = new BasicSet<number>(state);
  t.false(s.isEmpty());
});
test('has should return true if the set contains that element', (t) => {
  const s = new BasicSet<number>(state);
  t.true(s.has(2));
});
test('has should return false if the set does not contain that element', (t) => {
  const s = new BasicSet<number>();
  t.false(s.has(42));
});
test('union should return the union of that set and another iterable', (t) => {
  const s = new BasicSet<number>(state);
  t.deepEqual(s.union([42, 52]), new BasicSet([...state, 42, 52]));
});
test('intersection should return the intersection of that set and another iterable', (t) => {
  const s = new BasicSet<number>(state);
  t.deepEqual(s.intersection([2, 7]), new BasicSet([2, 7]));
});
test('difference should return the elements from that set and another iterable which do not overlap', (t) => {
  const s = new BasicSet<number>(state);
  t.deepEqual([...s.difference([2, 7, 42])].sort(), [1, 3, 5, 4, 42].sort());
});
test('subset should return true if an iterable is a subset of that set', (t) => {
  const s = new BasicSet<number>(state);
  t.true(s.subset([2, 7]));
});
test('it should be iterable', (t) => {
  let iteration = 0;
  const s = new BasicSet<number>(state);
  for (const i of s) {
    t.is(i, state[iteration]);
    iteration += 1;
  }
  t.is(iteration, state.length);
});
