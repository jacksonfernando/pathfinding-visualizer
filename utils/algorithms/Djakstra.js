const checkNeighboursAndPushToQueue = (graph, currentCell, hashMap) => {
  const { x, y } = currentCell;
  if (graph[x + 1][y].x < MAX_WIDTH && !hashMap[x + 1][y]) {
    currentCell.neighbours.push(graph[x + 1][y])
  }
  if (graph[x - 1][y].x >= 0 && !hashMap[x + 1][y]) {
    currentCell.neighbours.push(graph[x - 1][y])
  }
  if (graph[x][y + 1].y < MAX_HEIGHT && !hashMap[x + 1][y]) {
    currentCell.neighbours.push(graph[x][y + 1])
  }
  if (graph[x][y - 1].y >= 0 && !hashMap[x + 1][y]) {
    currentCell.neighbours.push(graph[x][y - 1])
  }
  for (let cell of currentCell) {
    queue.push({ x: cell.x, y: cell.y })
  }
}

const Djakstra = (refArray, graph, hashMap, start, target,) => {
  let queue = [start];
  const MAX_WIDTH = graph.length;
  const MAX_HEIGHT = graph[0].length;
  while (queue.length > 0) {
    const currentCell = queue.pop();
    refArray[currentCell.y + (currentCell.x * MAX_WIDTH)].current = true;
    hashMap[`${currentCell.x}-${currentCell.y}`] = true;
    if (graph[currentCell.x][currentCell.y] == target.x
      && graph[currentCell.x][currentCell.y] == target.y) {
      return [currentCell]
    }
    checkNeighboursAndPushToQueue(queue, graph, currentCell, MAX_WIDTH, MAX_HEIGHT)
  }
}

export {
  Djakstra
}
