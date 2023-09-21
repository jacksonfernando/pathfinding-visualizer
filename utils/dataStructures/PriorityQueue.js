const { swapItemsInArray } = require("../global");

class PriorityQueue {
  #elements;
  #compare;

  constructor(compare) {
    this.#elements = []
    this.#compare = compare
  }

  insert(element) {
    this.#elements.push(element)
    this.#siftUp(this.elements.length - 1)
  }

  peek() {
    return this.#elements[0];
  }

  size() {
    return this.#elements.length;
  }

  static parent(index) {
    return Math.floor((index - 1) / 2);
  }

  static left(index) {
    return index * 2 + 1;
  }

  static right(index) {
    return index * 2 + 2;
  }

  #siftUp(index) {
    let parentIndex = PriorityQueue.parent(index);

    while (
      parentIndex >= 0 &&
      this.#compare(this.#elements[index], this.#elements[parentIndex])) {
      swapItemsInArray(this.#elements, parentIndex, index);
      index = parentIndex
      parentIndex = PriorityQueue.parent(index)
    }
  }
}

export default PriorityQueue
