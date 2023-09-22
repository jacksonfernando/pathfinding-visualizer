const { swapItemsInArray } = require("../global");

class PriorityQueue {
  _elements;
  _compare;

  constructor(compare) {
    this._elements = []
    this._compare = compare
  }

  insert(element) {
    this._elements.push(element)
    this._siftUp(this.elements.length - 1)
  }

  peek() {
    return this._elements[0];
  }

  size() {
    return this._elements.length;
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

  _siftUp(index) {
    let parentIndex = PriorityQueue.parent(index);

    while (
      parentIndex >= 0 &&
      this._compare(this._elements[index], this._elements[parentIndex])) {
      swapItemsInArray(this._elements, parentIndex, index);
      index = parentIndex
      parentIndex = PriorityQueue.parent(index)
    }
  }

  _siftDown(index) {
    const leftChildIndex = PriorityQueue.left(index);
    const rightChildIndex = PriorityQueue.right(index);
    let hightestPriorityElementIdx = index;

    if (leftChildIndex < this._elements.length
      && this._compare(this._elements[leftChildIndex], this._elements[hightestPriorityElementIdx])) {
      hightestPriorityElementIdx = leftChildIndex
    }

    if (rightChildIndex < this._elements.length
      && this._compare(this._elements[rightChildIndex], this._elements[hightestPriorityElementIdx])) {
      hightestPriorityElementIdx = rightChildIndex
    }

    if (hightestPriorityElementIdx !== index) {
      swapItemsInArray(this._elements, hightestPriorityElementIdx, index)
      this._siftDown(hightestPriorityElementIdx)
    }
  }
}

export default PriorityQueue
