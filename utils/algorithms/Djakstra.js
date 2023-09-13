const { DEFAULT_WIDTH, DEFAULT_HEIGHT } = require("../../constants/global");

const Djakstra = (refArray, graph, start, target, hashMap) => {
  let queue = [start];
  hashMap[`${start.x}-${start.y}`] = true;

  while (queue.length > 0) {
    let currentCoordinate = queue.pop();
    let xCoordinate = currentCoordinate.x;
    let yCoordinate = currentCoordinate.y;
    let lowestWeightCoordinate = 0;

    if (xCoordinate == target.x && yCoordinate == target.y) {
      return [currentCoordinate]
    }

    if (xCoordinate + 1 < DEFAULT_HEIGHT && !hashMap[`${xCoordinate}-${yCoordinate}`]) {
      lowestWeightCoordinate
    }

  }
  return null;
}

