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

const generateGrid = (width, height) => {
  console.log('WIDTH_HEIGHT', Math.floor(width / 2), Math.floor(height / 2))
  let grid = []
  for (let i = 0; i < height; i++) {
    let local = []
    const RANDOM_ONE_TO_TEN = Math.floor(Math.random() * 10) + 1;
    for (let j = 0; j < width; j++) {
      local.push({
        x: i,
        y: j,
        isStart: false,
        isTarget: false,
        weight: RANDOM_ONE_TO_TEN
      })
    }
    grid.push(local)
  }
  grid[Math.floor(height / 2)][Math.floor(width / 2)].isStart = true
  console.log('GRID', grid)
  grid[height - 1][width - 1].isTarget = true
  return grid;
}

export const ParamsProvider = ({ children }) => {
  const [mode, setMode] = useState(null)
  const [dimension, setDimension] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
  const [algo, setAlgo] = useState('')
  const [run, setRun] = useState(false)
  const [grid, setGrid] = useState(generateGrid(dimension.width, dimension.height))
  const [editing, setEditFlag] = useState(false)
  const [restart, setRestart] = useState(false)
  console.log('DIMENSION', dimension)
  const start = useRef({ x: Math.floor(dimension.height / 2), y: Math.floor(dimension.width / 2) })
  const end = useRef({ x: dimension.height - 1, y: dimension.width - 1 })

  useEffect(() => {
    setGrid(generateGrid(dimension.width, dimension.height));
  }, [restart, dimension]);

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
        dimension,
        setDimension
      }}>
        {children}
      </context.Provider>
    </div>
  )
}
