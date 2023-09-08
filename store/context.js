'use client';

import {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef
} from "react";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../constants/global";

const context = createContext();

export const useParams = () => {
  return useContext(context)
};

const generateGrid = (DEFAULT_WIDTH, DEFAULT_HEIGHT) => {
  let grid = []
  for (let i = 0; i < DEFAULT_HEIGHT; i++) {
    let local = []
    for (let j = 0; j < DEFAULT_WIDTH; j++) {
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
  grid[Math.floor(DEFAULT_HEIGHT / 2)][Math.floor(DEFAULT_WIDTH / 2)].isStart = true
  grid[DEFAULT_HEIGHT - 1][DEFAULT_WIDTH - 1].isTarget = true
  return grid;
}

export const ParamsProvider = ({ children }) => {
  const [mode, setMode] = useState(null)
  const [algo, setAlgo] = useState('')
  const [run, setRun] = useState(false)
  const [grid, setGrid] = useState(generateGrid(DEFAULT_WIDTH, DEFAULT_HEIGHT))
  const [editing, setEditFlag] = useState(false)
  const [restart, setRestart] = useState(false)
  const start = useRef({ x: Math.floor(DEFAULT_HEIGHT / 2), y: Math.floor(DEFAULT_WIDTH / 2) })
  const end = useRef({ x: DEFAULT_HEIGHT - 1, y: DEFAULT_WIDTH - 1 })

  useEffect(() => {
    setGrid(generateGrid(DEFAULT_WIDTH, DEFAULT_HEIGHT));
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
