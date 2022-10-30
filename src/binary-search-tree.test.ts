import test from 'ava';

import { BinarySearchTree } from './binary-search-tree.js';

const state = [9, 4, 17, 3, 6, 22, 5, 7, 20];

function createInitialState(values: number[] = state) {
  const bst = new BinarySearchTree();
  for (const n of values) {
    bst.add(n);
  }
  return bst;
}

test('find returns an element if present', (t) => {
  const bst = createInitialState();
  for (const el of state) {
    t.is(bst.find(el), el);
  }
});

test('find returns null if an element is not present', (t) => {
  const bst = createInitialState();
  t.is(bst.find(42), null);
});

test('remove removes an element from the tree', (t) => {
  const bst = createInitialState();
  t.is(bst.find(17), 17);
  bst.remove(17);
  t.is(bst.find(17), null);
});

test('findMinHeight should return the minimum tree height', (t) => {
  const bst = createInitialState();
  t.is(bst.findMinHeight(), 1);
  bst.add(16);
  t.is(bst.findMinHeight(), 2);
});

test('findMaxHeight should return the maximum tree height', (t) => {
  const bst = createInitialState();
  t.is(bst.findMaxHeight(), 3);
  bst.add(21);
  t.is(bst.findMaxHeight(), 4);
});

test('balanced should return true when the tree is balanced', (t) => {
  const bst = createInitialState();
  bst.add(16);
  t.true(bst.balanced());
});

test('balanced should return false when the tree is unbalanced', (t) => {
  const bst = createInitialState();
  t.false(bst.balanced());
});

test('inOrder should traverse the tree in order', (t) => {
  const bst = createInitialState();
  t.deepEqual(bst.inOrder(), [3, 4, 5, 6, 7, 9, 17, 20, 22]);
});

test('preOrder should perform a pre order traversal of the tree', (t) => {
  const bst = createInitialState();
  t.deepEqual(bst.preOrder(), [9, 4, 3, 6, 5, 7, 17, 22, 20]);
});

test('postOrder should perform a post order traversal of the tree', (t) => {
  const bst = createInitialState();
  t.deepEqual(bst.postOrder(), [3, 5, 7, 6, 4, 20, 22, 17, 9]);
});

test('levelOrder should perform a level order traversal of the tree', (t) => {
  const bst = createInitialState();
  t.deepEqual(bst.levelOrder(), [9, 4, 17, 3, 6, 22, 5, 7, 20]);
});
