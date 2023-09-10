'use client';

import { useRef, useEffect } from "react";
import { useParams } from "../../../store/context";
import { CiVirus, CiFlag1, CiLocationOn } from 'react-icons/ci'
import gridStyle from './grid.module.css'
import { BFS } from "../../../utils/algorithms/BFS";
import { DFS } from "../../../utils/algorithms/DFS";
import { BFS_ALGORITHM, DFS_ALGORITHM, DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../../../constants/global";

const gridContainerStyle = {
  display: 'grid',
  gridTemplateColumns: `repeat(${DEFAULT_WIDTH}, 1fr)`,
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: '2rem 20rem'
}

const Grid = () => {
  const {
    grid,
    start,
    end,
    run,
    res,
    algo
  } = useParams()

  const refArray = useRef([])

  useEffect(() => {
    refArray.current = [];
    const gridSize = grid.length * grid[0].length;
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
      refArray.current[elem.y + elem.x * DEFAULT_WIDTH].path = true;
    })
  }

  const generateMapAndPreviousMap = () => {
    let hashmap = {}
    let prevmap = {}
    for (let j = 0; j < DEFAULT_WIDTH; j++) {
      for (let i = 0; i < DEFAULT_HEIGHT; i++) {
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
      let result = DFS(refArray.current, grid, hashmap, start.current, end.current)
      createPath(result, prevmap)
    }
  }, [run])

  return (
    <div style={gridContainerStyle}>
      {refArray.current.map((elem, index) => {
        let xIndex = Math.floor(index / DEFAULT_WIDTH)
        let yIndex = index % DEFAULT_WIDTH
        let cell = grid[xIndex][yIndex]

        const style = !elem.current ? 'cell' : 'visited'
        const path = elem.path && 'path'

        return (
          <div key={`${index}`} className={gridStyle[path || style]} >
            {cell.weight > 1 ? <CiVirus size={20} color="pink" /> : null}
            {cell.isStart ? <CiLocationOn size={20} color="pink" /> : null}
            {cell.isTarget ? <CiFlag1 size={20} color="green" /> : null}
          </div>
        )
      })}
    </div>
  )
}


export default Grid;
