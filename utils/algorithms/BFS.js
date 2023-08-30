const BFS = (refArray, graph, hashmap, prevmap, start, target) => {
  let queue = [start]
  let count = 0
  hashmap[`${start.x}-${start.y}`] = true
  while (queue.length > 0) {
    count += 1
    let currentCoordinate = queue.pop()
    let xCoordinate = currentCoordinate.x;
    let yCoordinate = currentCoordinate.y;
    refArray[xCoordinate + yCoordinate * 5].current = true
    if (xCoordinate == target.x && yCoordinate == target.y) return [currentCoordinate, count]

    if (xCoordinate + 1 < 5 && !hashmap[`${xCoordinate + 1}-${yCoordinate}`] && !graph[yCoordinate][xCoordinate + 1].isWall) {
      queue.unshift({ x: xCoordinate + 1, y: yCoordinate })
      prevmap[`${xCoordinate + 1}-${yCoordinate}`] = { ...currentCoordinate }
      hashmap[`${xCoordinate + 1}-${yCoordinate}`] = true
    }

    if (xCoordinate - 1 >= 0 && !hashmap[`${xCoordinate - 1}-${yCoordinate}`] && !graph[yCoordinate][xCoordinate - 1].isWall) {
      queue.unshift({ x: xCoordinate - 1, y: yCoordinate })
      prevmap[`${xCoordinate - 1}-${yCoordinate}`] = { ...currentCoordinate }
      hashmap[`${xCoordinate - 1}-${yCoordinate}`] = true
    }

    if (yCoordinate + 1 < 5 && !hashmap[`${xCoordinate}-${yCoordinate + 1}`] && !graph[yCoordinate + 1][xCoordinate].isWall) {
      queue.unshift({ x: xCoordinate, y: yCoordinate + 1 })
      prevmap[`${xCoordinate}-${yCoordinate + 1}`] = { ...currentCoordinate }
      hashmap[`${xCoordinate}-${yCoordinate + 1}`] = true
    }

    if (yCoordinate - 1 >= 0 && !hashmap[`${xCoordinate}-${yCoordinate - 1}`] && !graph[yCoordinate - 1][xCoordinate].isWall) {
      queue.unshift({ x: xCoordinate, y: yCoordinate - 1 })
      prevmap[`${xCoordinate}-${yCoordinate - 1}`] = { ...currentCoordinate }
      hashmap[`${xCoordinate}-${yCoordinate - 1}`] = true
    }
  }
  return null
}

export {
  BFS
}
