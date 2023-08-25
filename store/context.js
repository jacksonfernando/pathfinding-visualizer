import { useContext, createContext, useState, useEffect } from "react";

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
  const [run, setRun] = useState(false)
  const [grid, setGrid] = useState(getGrid(50, 25))
  const [editing, setEditFlag] = useState(false)
  const [res, setRes] = useState(false)
  const start = useRef({ x: 25, y: 12 })
  const end = useRef({ x: 48, y: 23 })

  useEffect(() => {
    restart()
  }, [res]);

  function restart() {
    setGrid(getGrid(50, 25));
  }

  return (
    <div>
      <context.Provider value={{
        mode,
        setMode,
        algo,
        setAlgo,
        run,
        setRun,
        grid,
        setGrid,
        editing,
        setEditFlag,
        res,
        setRes,
        start,
        end,
      }}>
        {children}
      </context.Provider>
    </div>
  )
}
