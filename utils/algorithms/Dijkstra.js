import PriorityQueue from "../dataStructures/PriorityQueue";

const getConnectedNeighbours = (graph, currentCell, hashMap, width, height) => {
  const { x, y } = currentCell;
  if (x + 1 < height && !hashMap[`${x + 1}-${y}`]) {
    currentCell.neighbours.push(graph[x + 1][y])
  }
  if (x - 1 >= 0 && !hashMap[`${x - 1}-${y}`]) {
    currentCell.neighbours.push(graph[x - 1][y])
  }
  if (y + 1 < width && !hashMap[`${x}-${y + 1}`]) {
    currentCell.neighbours.push(graph[x][y + 1])
  }
  if (y - 1 >= 0 && !hashMap[`${x}-${y - 1}`]) {
    currentCell.neighbours.push(graph[x][y - 1])
  }
  return currentCell.neighbours
}

const dijkstra = (refArray, graph, hashMap, start, target) => {
  const { x, y } = start;
  const MAX_HEIGHT = graph.length;
  const MAX_WIDTH = graph[0].length;
  const pq = new PriorityQueue((cellA, cellB) => cellA.distanceToEntrance < cellB.distanceToEntrance)
  pq.insert(graph[x][y]);
  start.distanceToEntrance = 0;

  const visitedCells = new Set();
  while (pq.size() > 0) {
    const cell = pq.pull();
    visitedCells.add(cell)

    getConnectedNeighbours(graph, cell, hashMap, MAX_WIDTH, MAX_HEIGHT)
    for (const neighbor of cell.neighbours) {
      if (visitedCells.has(neighbor)) continue;

      const newDistanceToEntrance = cell.distanceToEntrance + neighbor.weight;
      if (newDistanceToEntrance < neighbor.distanceToEntrance) {
        neighbor.parent = cell;
        neighbor.distanceToEntrance = newDistanceToEntrance;
        if (hashMap(`${neighbor.x}-${neighbor.y}`)) {
          pq.insert(graph[neighbor.x][neighbor.y])
        }
      }
    }
  }
  return null;
}

export {
  dijkstra
}
