import { HEIGHT, WIDTH } from "../../constants/global"

const BFS = (refArray, hashMap, prevMap, start, target) => {
  let queue = [start]
  let count = 0
  hashMap[`${start.x}-${start.y}`] = true
  while (queue.length > 0) {
    count += 1
    let currentCoordinate = queue.pop()
    let xCoordinate = currentCoordinate.x;
    let yCoordinate = currentCoordinate.y;
    refArray[yCoordinate + (xCoordinate * WIDTH)].current = true

    if (xCoordinate == target.x && yCoordinate == target.y) {
      console.log('FOUNDED')
      return [currentCoordinate, count]
    }

    if (xCoordinate + 1 < HEIGHT && !hashMap[`${xCoordinate + 1}-${yCoordinate}`]) {
      queue.unshift({ x: xCoordinate + 1, y: yCoordinate })
      prevMap[`${xCoordinate + 1}-${yCoordinate}`] = currentCoordinate;
      hashMap[`${xCoordinate + 1}-${yCoordinate}`] = true
    }

    if (xCoordinate - 1 >= 0 && !hashMap[`${xCoordinate - 1}-${yCoordinate}`]) {
      queue.unshift({ x: xCoordinate - 1, y: yCoordinate })
      prevMap[`${xCoordinate - 1}-${yCoordinate}`] = currentCoordinate;
      hashMap[`${xCoordinate - 1}-${yCoordinate}`] = true
    }

    if (yCoordinate + 1 < WIDTH && !hashMap[`${xCoordinate}-${yCoordinate + 1}`]) {
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
