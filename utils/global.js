const generateGrid = (width, height) => {
  let grid = []
  for (let i = 0; i < height; i++) {
    let local = []
    for (let j = 0; j < width; j++) {
      local.push({
        x: i,
        y: j,
        isStart: false,
        isTarget: false,
        neighbours: [],
        distanceToEntrance: Infinity,
        weight: 1,
        parent: null,
        isWall: false
      })
    }
    grid.push(local)
  }
  grid[Math.floor(height / 2)][Math.floor(width / 2)].isStart = true
  grid[height - 1][width - 1].isTarget = true
  return grid;
}

const swapItemsInArray = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

const generatePath = (refArray, currentCoordinate, prevMap, transitionTime, width) => {
  let newCoordinate = currentCoordinate;
  const path = [];
  if (newCoordinate) {
    while (prevMap[`${newCoordinate.x}-${newCoordinate.y}`]) {
      path.push(newCoordinate)
      newCoordinate = prevMap[`${newCoordinate.x}-${newCoordinate.y}`]
    }
  }
  path.reverse().forEach((elem) => {
    refArray.current[elem.y + (elem.x * width)].path = true;
    refArray.current[elem.y + (elem.x * width)].transition = transitionTime;
  })
}


export {
  generateGrid,
  swapItemsInArray,
  generatePath
}
