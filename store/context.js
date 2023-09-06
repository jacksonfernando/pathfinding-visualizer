'use client';

import {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef
} from "react";
import { HEIGHT, WIDTH } from "../constants/global";

const context = createContext();

export const useParams = () => {
  return useContext(context)
};

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
        weight: 1
      })
    }
    grid.push(local)
  }
  grid[1][0].isStart = true
  grid[height - 1][width - 1].isTarget = true
  return grid;
}

export const ParamsProvider = ({ children }) => {
  const [mode, setMode] = useState(null)
  const [algo, setAlgo] = useState('')
  const [run, setRun] = useState(false)
  const [grid, setGrid] = useState(generateGrid(WIDTH, HEIGHT))
  const [editing, setEditFlag] = useState(false)
  const [restart, setRestart] = useState(false)
  const start = useRef({ x: 1, y: 0 })
  const end = useRef({ x: WIDTH - 1, y: HEIGHT - 1 })

  useEffect(() => {
    setGrid(generateGrid(WIDTH, HEIGHT));
  }, [restart]);

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
        restart,
        setRestart,
        start,
        end,
      }}>
        {children}
      </context.Provider>
    </div>
  )
}
