export class Queue<T> {
  public content: T[];

  public constructor(initialState: Iterable<T> = []) {
    this.content = [...initialState];
  }

  public enqueue(element: T): void {
    this.content.push(element);
  }

  public dequeue(): T | undefined {
    return this.content.shift();
  }

  public front(): T | undefined {
    return this.content[0];
  }

  public isEmpty(): boolean {
    return this.content.length === 0;
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.content[Symbol.iterator]();
  }
}
