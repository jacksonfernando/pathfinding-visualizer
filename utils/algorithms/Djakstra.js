const { DEFAULT_WIDTH, DEFAULT_HEIGHT } = require("../../constants/global");

// explanation in: https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/
const findMinDistance = (dist, sptSet) => {
  let min = Number.MAX_VALUE;
  let minIdx = -1;
  let verticesCount = DEFAULT_WIDTH * DEFAULT_HEIGHT;

  for (let v = 0; v < verticesCount; v++) {
    if (sptSet[v] == false && dist[v] <= min) {
      min = dist[v]
      minIdx = v;
    }
  }
  return minIdx
}

