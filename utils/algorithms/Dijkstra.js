const checkNeighboursAndPushToQueue = (queue, graph, currentCell, hashMap, width, height) => {
  const { x, y } = currentCell;
  if (graph[x + 1][y]?.x < height && !hashMap[`${x + 1}-${y}`]) {
    currentCell.neighbours.push(graph[x + 1][y])
    hashMap[`${x + 1}-${y}`] = true
  }
  if (graph[x - 1][y]?.x >= 0 && !hashMap[`${x - 1}-${y}`]) {
    currentCell.neighbours.push(graph[x - 1][y])
    hashMap[`${x + 1}-${y}`] = true
  }
  if (graph[x][y + 1]?.y < width && !hashMap[`${x}-${y + 1}`]) {
    currentCell.neighbours.push(graph[x][y + 1])
    hashMap[`${x + 1}-${y}`] = true
  }
  if (graph[x][y - 1]?.y >= 0 && !hashMap[`${x}-${y - 1}`]) {
    currentCell.neighbours.push(graph[x][y - 1])
    hashMap[`${x + 1}-${y}`] = true
  }
  for (let cell of currentCell.neighbours) {
    queue.push(cell)
  }
}

const dijkstra = (refArray, graph, hashMap, start, target,) => {
  let queue = [graph[start.x][start.y]];
  const MAX_HEIGHT = graph.length;
  const MAX_WIDTH = graph[0].length;
  while (queue.length > 0) {
    console.log('QUEUE', queue)
    const currentCell = queue.pop();
    refArray[currentCell.y + (currentCell.x * MAX_WIDTH)].current = true;
    hashMap[`${currentCell.x}-${currentCell.y}`] = true;
    if (graph[currentCell.x][currentCell.y].x == target.x
      && graph[currentCell.x][currentCell.y].y == target.y) {
      return [currentCell]
    }
    console.log(hashMap);
    console.log('CURRENT', currentCell);
    checkNeighboursAndPushToQueue(queue, graph, currentCell, MAX_WIDTH, MAX_HEIGHT)
  }
  return null
}

export {
  dijkstra
}
