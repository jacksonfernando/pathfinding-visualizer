'use client';

import { useRef, useEffect } from "react";
import { useParams } from "../../../store/context";
import { CiFlag1, CiLocationOn } from 'react-icons/ci'
import gridStyle from './grid.module.css'
import { BFS } from "../../../utils/algorithms/BFS";
import { DFS } from "../../../utils/algorithms/DFS";
import { BFS_ALGORITHM, DFS_ALGORITHM } from "../../../constants/global";

const Grid = () => {
  const {
    grid,
    start,
    end,
    run,
    res,
    algo,
    dimension
  } = useParams()

  const { width, height } = dimension

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '2rem 20rem'
  }

  const refArray = useRef([])

  useEffect(() => {
    refArray.current = [];
    const gridSize = width * height;
    for (let i = 0; i < gridSize; i++) {
      refArray.current.push({ current: false })
    }
  }, [grid]);

  useEffect(() => {
    refArray.current.forEach((elem) => {
      elem.current = false
      elem.path = false
    })
  }, [res])


  const createPath = (result, prevMap) => {
    let COORDINATE = result && result[0];
    const path = [];
    if (COORDINATE) {
      while (prevMap[`${COORDINATE.x}-${COORDINATE.y}`]) {
        path.push(COORDINATE)
        COORDINATE = prevMap[`${COORDINATE.x}-${COORDINATE.y}`]
      }
    }
    path.reverse().forEach((elem) => {
      refArray.current[elem.y + elem.x * width].path = true;
    })
  }

  const generateMapAndPreviousMap = () => {
    let hashmap = {}
    let prevmap = {}
    for (let j = 0; j < width; j++) {
      for (let i = 0; i < height; i++) {
        hashmap[`${i}-${j}`] = false
        prevmap[`${i}-${j}`] = null
      }
    }
    return { hashmap, prevmap }
  }

  useEffect(() => {
    const { hashmap, prevmap } = generateMapAndPreviousMap();
    if (algo == BFS_ALGORITHM) {
      let result = BFS(refArray.current, hashmap, prevmap, start.current, end.current)
      createPath(result, prevmap)
    }
    if (algo == DFS_ALGORITHM) {
      DFS(refArray.current, grid, hashmap, start.current, end.current)
    }
  }, [run])

  return (
    <div style={gridContainerStyle}>
      {refArray.current.map((elem, index) => {
        let xIndex = Math.floor(index / width)
        let yIndex = index % width
        let cell = grid[xIndex][yIndex]

        const style = !elem.current ? 'cell' : 'visited'
        const path = elem.path && 'path'

        return (
          <div key={`${index}`} className={gridStyle[path || style]} >
            {cell.isStart ? <CiLocationOn size={20} color="pink" /> : null}
            {cell.isTarget ? <CiFlag1 size={20} color="green" /> : null}
          </div>
        )
      })}
    </div>
  )
}


export default Grid;
