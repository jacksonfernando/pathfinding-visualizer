const iterateRecursively = (refArray, graph, x, y, hashMap, target) => {
  const HEIGHT = graph.length;
  const WIDTH = graph[0].length;
  if (x < 0 || x >= HEIGHT || y < 0 || y >= WIDTH || hashMap[`${x}-${y}`]) {
    return null;
  }
  if (graph[x][y].x == target.x && graph[x][y].y == target.y) {
    refArray[y + (x * WIDTH)].path = true;
    return [{ x, y }]
  }
  refArray[y + (x * WIDTH)].path = true;
  hashMap[`${x}-${y}`] = true;
  return iterateRecursively(refArray, graph, x + 1, y, hashMap, target) ||
    iterateRecursively(refArray, graph, x - 1, y, hashMap, target) ||
    iterateRecursively(refArray, graph, x, y + 1, hashMap, target) ||
    iterateRecursively(refArray, graph, x, y - 1, hashMap, target);
}

const dfs = (refArray, graph, hashMap, start, target) => {
  const result = iterateRecursively(refArray, graph, start.x, start.y, hashMap, target);
  return result;
}

export {
  dfs
}
