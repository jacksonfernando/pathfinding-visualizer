'use client';

import {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef
} from "react";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../constants/global";
import { generateGrid } from "../utils/global";

const context = createContext();

export const useParams = () => {
  return useContext(context)
};

export const ParamsProvider = ({ children }) => {
  const [mode, setMode] = useState(null)
  const [dimension, setDimension] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
  const { height, width } = dimension;
  const [algo, setAlgo] = useState('')
  const [run, setRun] = useState(false)
  const [grid, setGrid] = useState(generateGrid(width, height))
  const [editing, setEditFlag] = useState(false)
  const [restart, setRestart] = useState(false)
  const start = useRef({ x: Math.floor(height / 2), y: Math.floor(width / 2) })
  const end = useRef({ x: height - 1, y: width - 1 })

  useEffect(() => {
    setGrid(generateGrid(width, height));
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
