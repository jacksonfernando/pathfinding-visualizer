const iterateRecursively = (refArray, graph, x, y, hashMap, prevMap, target) => {
  if (graph[y][x].x == target.x && graph[y][x].y == target.y) {
    return [{ x: x, y: y }]
  }
  if (x < 0 || x >= 5 || y < 0 || y >= 5) {
    return null;
  }
  refArray[x + y * 5].current = true;
  return iterateRecursively(graph, x + 1, y, hashMap, prevMap, target) ||
    iterateRecursively(graph, x - 1, y, hashMap, prevMap, target) ||
    iterateRecursively(graph, x, y + 1, hashMap, prevMap, target) ||
    iterateRecursively(graph, x, y - 1, hashMap, prevMap, target);
}

const DFS = (refArray, graph, hashMap, prevMap, start, target) => {
  return iterateRecursively(refArray, graph, start.x, start.y, hashMap, prevMap, target);
}

export {
  DFS
}
