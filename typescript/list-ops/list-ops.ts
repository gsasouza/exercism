class List<T> {
  values: Array<T>;
  private count: number;

  constructor(list: Array<T> = []) {
    this.values = list;
    this.count = this.countData();
  }

  length() {
    return this.count;
  }

  append(list: List<T>) {
    const newList = [];
    for (let i = 0; i < this.count; i++) newList.push(this.values[i]);
    for (let i = 0; i < list.length(); i++) newList.push(list.values[i])
    this.values = newList;
    this.count = this.count + list.count;
    return this;
  }

  concat(list: List<T | List<T>>) {
    const newList: Array<T> = [];
    let count = 0;
    for (let i = 0; i < this.count; i++) newList.push(this.values[i]);
    for (let i = 0; i < list.length(); i++) {
      const value = list.values[i];
      if (value instanceof List) {
        for (let j = 0; j < value.length(); j++) {
          newList.push(value.values[j]);
          count += value.length();
        }
      } else {
        count++;
        newList.push(value);
      }

    }
    this.values = newList;
    this.count = this.count + count;
    return this;
  }

  map(predicate: (elem: T) => T) {
    const newList = [];
    for (let i = 0; i < this.count; i++) newList.push(predicate(this.values[i]));
    return new List(newList);
  }

  foldl(predicate: (acc: T, elem: T) => T, initialValue: T) {
    let acc = initialValue;
    for (let i = 0; i < this.count; i++) acc = predicate(acc, this.values[i]);
    return acc;
  }

  foldr(predicate: (acc: T, elem: T) => T, initialValue: T) {
    return this.reverse().foldl(predicate, initialValue);
  }

  filter(predicate: (elem: T) => boolean) {
    const newList = [];
    for (let i = 0; i < this.count; i++) {
      if (predicate(this.values[i])) newList.push(this.values[i]);
    }
    this.values = newList;
    return this;
  }

  reverse() {
    const newList = [];
    for (let i = this.count - 1; i >= 0; i--) newList.push(this.values[i]);
    this.values = newList;
    return this;
  }

  private countData() {
    let count = 0
    while (this.values[count]) count++;
    return count;
  }
}

export default List