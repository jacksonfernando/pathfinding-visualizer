const iterateRecursively = (refArray, graph, x, y, hashMap, prevMap, target) => {
  if (x < 0 || x >= 5 || y < 0 || y >= 5 || hashMap[`${x}-${y}`]) {
    return null;
  }
  if (graph[y][x].x == target.x && graph[y][x].y == target.y) {
    refArray[x + y * 5].current = true;
    return [{ x, y }]
  }
  refArray[x + y * 5].current = true;
  hashMap[`${x}-${y}`] = true
  prevMap[`${x}-${y}`] = { x, y }
  return iterateRecursively(refArray, graph, x + 1, y, hashMap, prevMap, target) ||
    iterateRecursively(refArray, graph, x - 1, y, hashMap, prevMap, target) ||
    iterateRecursively(refArray, graph, x, y + 1, hashMap, prevMap, target) ||
    iterateRecursively(refArray, graph, x, y - 1, hashMap, prevMap, target);
}

const DFS = (refArray, graph, hashMap, prevMap, start, target) => {
  return iterateRecursively(refArray, graph, start.x, start.y, hashMap, prevMap, target);
}

export {
  DFS
}
