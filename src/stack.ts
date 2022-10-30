export class Stack<T> {
  private content: T[];

  public constructor(initialState: Iterable<T> = []) {
    this.content = [...initialState];
  }

  public push(element: T): void {
    this.content.push(element);
  }

  public pop(): T | undefined {
    return this.content.pop();
  }

  public peek(): T | undefined {
    return this.content[this.content.length - 1];
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.content[Symbol.iterator]();
  }
}
