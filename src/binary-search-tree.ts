import { Queue } from './queue.js';

export class BSTNode<T> {
  public data: T;

  public left: BSTNode<T> | null;

  public right: BSTNode<T> | null;

  public constructor(data: T) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree<T> {
  private root: BSTNode<T> | null;

  public constructor() {
    this.root = null;
  }

  private getNextNode(node: BSTNode<T> | null, element: T): BSTNode<T> | null {
    if (!node) return null;
    return element > node.data ? node.right : node.left;
  }

  public add(element: T): void {
    if (this.root === null) {
      this.root = new BSTNode(element);
    } else {
      let currentNode: BSTNode<T> | null = this.root;
      let nextNode = this.getNextNode(currentNode, element);
      while (
        currentNode !== null &&
        currentNode.data !== element &&
        nextNode !== null
      ) {
        currentNode = this.getNextNode(currentNode, element);
        nextNode = this.getNextNode(currentNode, element);
      }
      if (currentNode && currentNode.data > element) {
        currentNode.left = new BSTNode(element);
      }
      if (currentNode && currentNode.data < element) {
        currentNode.right = new BSTNode(element);
      }
    }
  }

  public remove(valueToRemove: T): void {
    const removeNode = (
      node: BSTNode<T> | null,
      value: T,
    ): BSTNode<T> | null => {
      if (node) {
        /* eslint-disable no-param-reassign */
        if (value < node.data) {
          node.left = removeNode(node.left, value);
          return node;
        }
        if (value > node.data) {
          node.right = removeNode(node.right, value);
          return node;
        }
        if (node.left === null && node.right === null) return null;
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
        let replacement = node.right;
        while (replacement.left !== null) {
          replacement = replacement.left;
        }
        node.data = replacement.data;
        node.right = removeNode(node.right, replacement.data);
        /* eslint-enable no-param-reassign */
        return node;
      }
      return null;
    };
    this.root = removeNode(this.root, valueToRemove);
  }

  public findMinHeight(
    node: BSTNode<T> | null = this.root,
    height = -1,
  ): number {
    if (!node) return height;
    const leftHeight = this.findMinHeight(node.left, height + 1);
    const rightHeight = this.findMinHeight(node.right, height + 1);
    return rightHeight < leftHeight ? rightHeight : leftHeight;
  }

  public findMaxHeight(
    node: BSTNode<T> | null = this.root,
    height = -1,
  ): number {
    if (!node) return height;
    const leftHeight = this.findMaxHeight(node.left, height + 1);
    const rightHeight = this.findMaxHeight(node.right, height + 1);
    return rightHeight < leftHeight ? leftHeight : rightHeight;
  }

  public balanced(): boolean {
    const maxHeight = this.findMaxHeight();
    const minHeight = this.findMinHeight();
    const delta = maxHeight - minHeight;
    return delta === 1;
  }

  public inOrder(): T[] {
    if (this.root === null) return [];
    const results: T[] = [];
    const inOrderTraverse = (node: BSTNode<T>): void => {
      if (node.left) inOrderTraverse(node.left);
      results.push(node.data);
      if (node.right) inOrderTraverse(node.right);
    };
    inOrderTraverse(this.root);
    return results;
  }

  public find(value: T, node: BSTNode<T> | null = this.root): T | null {
    if (node === null) return null;
    if (node.data === value) return node.data;
    return this.find(value, node.data > value ? node.left : node.right);
  }

  public preOrder(): T[] {
    if (this.root === null) return [];
    const results: T[] = [];
    const preOrderTraverse = (node: BSTNode<T>): void => {
      results.push(node.data);
      if (node.left) preOrderTraverse(node.left);
      if (node.right) preOrderTraverse(node.right);
    };
    preOrderTraverse(this.root);
    return results;
  }

  public postOrder(): T[] {
    if (this.root === null) return [];
    const results: T[] = [];
    const postOrderTraverse = (node: BSTNode<T>): void => {
      if (node.left) postOrderTraverse(node.left);
      if (node.right) postOrderTraverse(node.right);
      results.push(node.data);
    };
    postOrderTraverse(this.root);
    return results;
  }

  public levelOrder(): T[] {
    const results: T[] = [];
    if (this.root === null) return results;
    const q = new Queue<BSTNode<T>>();
    q.enqueue(this.root);
    while (!q.isEmpty()) {
      const node = q.dequeue();
      results.push(node?.data as T);
      if (node?.left) q.enqueue(node.left);
      if (node?.right) q.enqueue(node.right);
    }
    return results;
  }
}
