export type QueueElement<T> = {
  data: T;
  priority: number;
};

export class PriorityQueue<T> {
  public content: QueueElement<T>[];

  constructor(initialState: Iterable<T> = []) {
    this.content = [...initialState].map((e) => ({ data: e, priority: 1 }));
  }

  public enqueue(data: T, priority = 1): void {
    const ix = this.content.findIndex((e) => e.priority < priority);
    if (this.content.length && ix > -1) {
      this.content.splice(ix, 0, { data, priority });
    } else {
      this.content.push({ data, priority });
    }
  }

  public dequeue(): T | undefined {
    return this.content.shift()?.data;
  }

  public front(): T | undefined {
    return this.content[0]?.data;
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.content.map((e) => e.data)[Symbol.iterator]();
  }
}
