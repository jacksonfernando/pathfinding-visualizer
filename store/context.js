'use client';

import {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef
} from "react";

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
        x: i,
        y: j,
        isStart: false,
        isTarget: false,
        weight: 1,
        isWall: false
      })
    }
    grid.push(local)
  }
  grid[Math.floor(height / 2)][Math.floor(width / 2)].isStart = true
  grid[height - 2][width - 2].isTarget = true
  return grid;
}

export const ParamsProvider = ({ children }) => {
  const [mode, setMode] = useState(null)
  const [algo, setAlgo] = useState('')
  const [run, setRun] = useState(false)
  const [grid, setGrid] = useState(getGrid(20, 20))
  const [editing, setEditFlag] = useState(false)
  const [res, setRes] = useState(false)
  const start = useRef({ x: 12, y: 25 })
  const end = useRef({ x: 23, y: 48 })

  useEffect(() => {
    restart()
  }, [res]);

  function restart() {
    setGrid(getGrid(20, 20));
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