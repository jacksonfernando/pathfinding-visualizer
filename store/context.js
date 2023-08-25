import { useContext, createContext, useState } from "react";

const context = createContext();

export const useParams = () => {
  return useContext(context)
};

const getGrid = (width, height) => {
  let grid = []
  for (let i = 0; i < height; i++) {
    let local = []
    for (let j = 0; j < width; j++) {
      local.push({
        x: j,
        y: i,
        isStart: false,
        isTarget: false,
        weight: 1,
        isWall: false
      })
    }
    grid.push(local)
  }
  grid[Math.floor(height / 2)][Math.floor(width / 2)].isStart = true
  gird[height - 2][width - 2].isTarget = true
  return grid;
}

export const ParamsProvider = ({ children }) => {
  const [mode, setMode] = useState(null)
  const [algo, setAlgo] = useState('')
  const [run, setRun] = usetState(false)
  const [grid, setGrid] = usetState(getGrid(50, 25))
  return (
    <div>

    </div>
  )
}
