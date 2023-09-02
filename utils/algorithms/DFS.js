const iterateRecursively = (graph, x, y, hashMap, prevMap) => {
  iterateRecursively(graph, x + 1, y, hashMap, prevMap);
  iterateRecursively(graph, x - 1, y, hashMap, prevMap);
  iterateRecursively(graph, x, y + 1, hashMap, prevMap);
  iterateRecursively(graph, x, y - 1, hashMap, prevMap);
}

const DFS = (refArray, graph, hashMap, prevMap, start, target) => {

  DFS(refArray, graph, hashMap, prevMap, start, target);
}

export {
  DFS
}
