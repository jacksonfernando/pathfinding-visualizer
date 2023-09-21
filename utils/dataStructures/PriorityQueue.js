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

  pull() {

  }
}
