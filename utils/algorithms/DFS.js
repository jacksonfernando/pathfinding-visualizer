const iterateRecursively = (refArray, graph, x, y, hashMap, target) => {
  if (x < 0 || x >= 5 || y < 0 || y >= 5 || hashMap[`${x}-${y}`]) {
    return null;
  }
  if (graph[y][x].x == target.x && graph[y][x].y == target.y) {
    refArray[x + y * 5].current = true;
    return [{ x, y }]
  }
  refArray[x + y * 5].current = true;
  hashMap[`${x}-${y}`] = true;
  return iterateRecursively(refArray, graph, x + 1, y, hashMap, target) ||
    iterateRecursively(refArray, graph, x - 1, y, hashMap, target) ||
    iterateRecursively(refArray, graph, x, y + 1, hashMap, target) ||
    iterateRecursively(refArray, graph, x, y - 1, hashMap, target);
}

const DFS = (refArray, graph, hashMap, start, target) => {
  return iterateRecursively(refArray, graph, start.x, start.y, hashMap, target);
}

export {
  DFS
}
