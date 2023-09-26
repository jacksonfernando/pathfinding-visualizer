'use client';

import { useRef, useEffect, useState, useCallback } from "react";
import { useParams } from "../../../store/context";
import { CiFlag1, CiLocationOn } from 'react-icons/ci'
import gridStyle from './grid.module.css'
import { bfs } from "../../../utils/algorithms/BFS";
import { dfs } from "../../../utils/algorithms/DFS";
import { BFS_ALGORITHM, DFS_ALGORITHM, DIJKSTRA_ALGORITHM } from "../../../constants/global";
import { dijkstra } from "../../../utils/algorithms/Dijkstra";

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
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

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


  const createPath = (currentCoordinate, prevMap, transitionTime) => {
    let newCoordinate = currentCoordinate;
    const path = [];
    if (newCoordinate) {
      while (prevMap[`${newCoordinate.x}-${newCoordinate.y}`]) {
        path.push(newCoordinate)
        newCoordinate = prevMap[`${newCoordinate.x}-${newCoordinate.y}`]
      }
    }
    path.reverse().forEach((elem) => {
      refArray.current[elem.y + (elem.x * width)].path = true;
      refArray.current[elem.y + (elem.x * width)].transition = transitionTime;
    })
  }

  const generateMapAndPreviousMap = () => {
    let hashmap = {}
    let prevmap = {}
    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
        hashmap[`${j}-${i}`] = false
        prevmap[`${j}-${i}`] = null
      }
    }
    return { hashmap, prevmap }
  }

  useEffect(() => {
    const { hashmap, prevmap } = generateMapAndPreviousMap();
    if (algo == BFS_ALGORITHM) {
      const { currentCoordinate, transitionTime } = bfs(grid, refArray.current, hashmap, prevmap, start.current, end.current)
      createPath(currentCoordinate, prevmap, transitionTime)
    }
    if (algo == DFS_ALGORITHM) {
      dfs(refArray.current, grid, hashmap, start.current, end.current)
    }
    if (algo == DIJKSTRA_ALGORITHM) {
      const { currentCoordinate, transitionTime } = dijkstra(refArray.current, grid, hashmap, prevmap, start.current, end.current)
      console.log(currentCoordinate, transitionTime)
      createPath(currentCoordinate, prevmap, transitionTime)
    }
    forceUpdate()
  }, [run])

  const renderCell = () => {
    return refArray.current.map((elem, index) => {
      let xIndex = Math.floor(index / width)
      let yIndex = index % width
      let cell = grid[xIndex][yIndex]

      const style = !elem.current ? 'cell' : 'visited'
      const path = elem.path && 'path'

      return (
        <div
          key={`${index}`}
          className={gridStyle[path || style]}
          style={{
            transition: `background-color ${elem.transition}s ease-in`
          }}
        >
          {cell.isStart ? <CiLocationOn size={20} color="pink" /> : null}
          {cell.isTarget ? <CiFlag1 size={20} color="green" /> : null}
        </div>
      )
    })
  }

  return (
    <div style={gridContainerStyle}>
      {renderCell()}
    </div>
  )
}


export default Grid;
