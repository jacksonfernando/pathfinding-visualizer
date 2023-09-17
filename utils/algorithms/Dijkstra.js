const checkNeighboursAndPushToQueue = (queue, graph, currentCell, hashMap, width, height) => {
  const { x, y } = currentCell;
  if (x + 1 < height && !hashMap[`${x + 1}-${y}`]) {
    currentCell.neighbours.push(graph[x + 1][y])
    hashMap[`${x + 1}-${y}`] = true
  }
  if (x - 1 >= 0 && !hashMap[`${x - 1}-${y}`]) {
    currentCell.neighbours.push(graph[x - 1][y])
    hashMap[`${x - 1}-${y}`] = true
  }
  if (y + 1 < width && !hashMap[`${x}-${y + 1}`]) {
    currentCell.neighbours.push(graph[x][y + 1])
    hashMap[`${x}-${y + 1}`] = true
  }
  if (y - 1 >= 0 && !hashMap[`${x}-${y - 1}`]) {
    currentCell.neighbours.push(graph[x][y - 1])
    hashMap[`${x}-${y - 1}`] = true
  }
  for (let cell of currentCell.neighbours) {
    queue.push(cell)
  }
}

const dijkstra = (refArray, graph, hashMap, start, target) => {
  let queue = [graph[start.x][start.y]];
  const MAX_HEIGHT = graph.length;
  const MAX_WIDTH = graph[0].length;
  while (queue.length > 0) {
    const currentCell = queue.pop();
    refArray[currentCell.y + (currentCell.x * MAX_WIDTH)].current = true;
    if (currentCell.x == target.x && currentCell.y == target.y) {
      return [currentCell]
    }
    if (hashMap[`${currentCell.x}-${currentCell.y}`]) {
      queue.pop();
    }
    checkNeighboursAndPushToQueue(queue, graph, currentCell, hashMap, MAX_WIDTH, MAX_HEIGHT)
    hashMap[`${currentCell.x}-${currentCell.y}`] = true;
  }
  return null
}

export {
  dijkstra
}
