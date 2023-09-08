import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../../constants/global";

const iterateRecursively = (refArray, graph, x, y, hashMap, target) => {
  if (x < 0 || x >= DEFAULT_WIDTH || y < 0 || y >= DEFAULT_HEIGHT || hashMap[`${x}-${y}`]) {
    return null;
  }
  if (graph[y][x].x == target.x && graph[y][x].y == target.y) {
    refArray[y + (x * DEFAULT_WIDTH)].current = true;
    return [{ x, y }]
  }
  refArray[y + x * DEFAULT_WIDTH].current = true;
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
