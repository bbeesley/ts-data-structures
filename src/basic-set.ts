export class BasicSet<T> {
  public content: T[];

  constructor(initialState: Iterable<T> = []) {
    this.content = [];
    for (const element of initialState) {
      if (!this.content.includes(element)) {
        this.content.push(element);
      }
    }
  }

  public add(element: T): boolean {
    if (!this.has(element)) {
      this.content.push(element);
      return true;
    }
    return false;
  }

  public remove(element: T): boolean {
    if (this.has(element)) {
      this.content.splice(this.content.indexOf(element), 1);
      return true;
    }
    return false;
  }

  public size(): number {
    return this.content.length;
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }

  public has(element: T): boolean {
    return this.content.includes(element);
  }

  public union(iter: Iterable<T>): BasicSet<T> {
    const s = new BasicSet(this.content);
    for (const element of iter) {
      s.add(element);
    }
    return s;
  }

  public intersection(iter: Iterable<T>): BasicSet<T> {
    const s = new BasicSet<T>();

    for (const element of iter) {
      if (this.has(element)) {
        s.add(element);
      }
    }
    return s;
  }

  public difference(iter: Iterable<T>): BasicSet<T> {
    const s = new BasicSet<T>();
    const iterSet = new BasicSet<T>(iter);

    for (const element of iterSet) {
      if (!this.has(element)) {
        s.add(element);
      }
    }
    for (const element of this) {
      if (!iterSet.has(element)) {
        s.add(element);
      }
    }
    return s;
  }

  public subset(iter: Iterable<T>): boolean {
    const iterableArray = [...iter];
    return iterableArray.every((element) => this.has(element));
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.content[Symbol.iterator]();
  }
}
