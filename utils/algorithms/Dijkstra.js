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

const dijkstra = (refArray, graph, hashMap, prevMap, start, target) => {
  const { x, y } = start;
  const MAX_HEIGHT = graph.length;
  const MAX_WIDTH = graph[0].length;
  const pq = new PriorityQueue((cellA, cellB) => cellA.distanceToEntrance < cellB.distanceToEntrance)
  pq.insert(graph[x][y]);
  graph[x][y].distanceToEntrance = 0;
  let count = 0;

  const visitedCells = new Set();
  while (pq.size() > 0) {
    const cell = pq.pull();
    if (cell.x == target.x && cell.y == target.y) {
      return { currentCoordinate: { x: cell.x, y: cell.y }, transitionTime: count * 0.001 };
    }
    visitedCells.add(cell)
    refArray[cell.y + (cell.x * MAX_WIDTH)].current = true;
    refArray[cell.y + (cell.x * MAX_WIDTH)].transition = count * 0.001;
    hashMap[`${cell.x}-${cell.y}`] = true;


    getConnectedNeighbours(graph, cell, hashMap, MAX_WIDTH, MAX_HEIGHT);
    for (const neighbor of cell.neighbours) {
      prevMap[`${neighbor.x}-${neighbor.y}`] = { x: cell.x, y: cell.y };
      if (neighbor.x == target.x && neighbor.y == target.y) {
        refArray[neighbor.y + (neighbor.x * MAX_WIDTH)].current = true;
        return { currentCoordinate: { x: neighbor.x, y: neighbor.y }, transitionTime: count * 0.001 };
      }
      if (visitedCells.has(neighbor)) continue;
      const newDistanceToEntrance = cell.distanceToEntrance + neighbor.weight;
      if (newDistanceToEntrance < neighbor.distanceToEntrance) {
        neighbor.parent = cell;
        neighbor.distanceToEntrance = newDistanceToEntrance;
        if (!hashMap[`${neighbor.x}-${neighbor.y}`]) {
          pq.insert(graph[neighbor.x][neighbor.y])
        }
      }
    }
    count++;
  }
  return null;
}

export {
  dijkstra
}
