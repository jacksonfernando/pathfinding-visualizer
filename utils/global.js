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
        parent: null
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

export {
  generateGrid,
  swapItemsInArray
}
