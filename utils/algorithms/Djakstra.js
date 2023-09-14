import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../../constants/global"

const Djakstra = (refArray, hashMap, prevMap, start, target) => {
  let queue = [start]
  hashMap[`${start.x}-${start.y}`] = true
  while (queue.length > 0) {
    let currentCoordinate = queue.pop()
    let xCoordinate = currentCoordinate.x;
    let yCoordinate = currentCoordinate.y;
    refArray[yCoordinate + (xCoordinate * DEFAULT_WIDTH)].current = true

    if (xCoordinate == target.x && yCoordinate == target.y) {
      return [currentCoordinate]
    }

    if (xCoordinate + 1 < DEFAULT_HEIGHT && !hashMap[`${xCoordinate + 1}-${yCoordinate}`]) {
      queue.unshift({ x: xCoordinate + 1, y: yCoordinate })
      prevMap[`${xCoordinate + 1}-${yCoordinate}`] = currentCoordinate;
      hashMap[`${xCoordinate + 1}-${yCoordinate}`] = true
    }

    if (xCoordinate - 1 >= 0 && !hashMap[`${xCoordinate - 1}-${yCoordinate}`]) {
      queue.unshift({ x: xCoordinate - 1, y: yCoordinate })
      prevMap[`${xCoordinate - 1}-${yCoordinate}`] = currentCoordinate;
      hashMap[`${xCoordinate - 1}-${yCoordinate}`] = true
    }

    if (yCoordinate + 1 < DEFAULT_WIDTH && !hashMap[`${xCoordinate}-${yCoordinate + 1}`]) {
      queue.unshift({ x: xCoordinate, y: yCoordinate + 1 })
      prevMap[`${xCoordinate}-${yCoordinate + 1}`] = currentCoordinate;
      hashMap[`${xCoordinate}-${yCoordinate + 1}`] = true
    }

    if (yCoordinate - 1 >= 0 && !hashMap[`${xCoordinate}-${yCoordinate - 1}`]) {
      queue.unshift({ x: xCoordinate, y: yCoordinate - 1 })
      prevMap[`${xCoordinate}-${yCoordinate - 1}`] = currentCoordinate
      hashMap[`${xCoordinate}-${yCoordinate - 1}`] = true
    }
  }
  return null
}

export {
  BFS
}