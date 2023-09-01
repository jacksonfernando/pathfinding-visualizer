'use client';

import { useRef, useEffect } from "react";
import { useParams } from "../../../store/context";
import { CiVirus, CiFlag1, CiLocationOn } from 'react-icons/ci'
import gridStyle from './grid.module.css'
import { BFS } from "../../../utils/algorithms/BFS";

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
    refArray.current.forEach((elem) => elem.current = false)
  }, [res])


  useEffect(() => {
    if (algo == 'BFS') {
      let hashmap = {}
      let prevmap = {}
      for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 5; i++) {
          hashmap[`${i}-${j}`] = false
          prevmap[`${i}-${j}`] = null
        }
      }
      let result = BFS(refArray.current, grid, hashmap, prevmap, start.current, end.current)
      let path = []
      if (result) {
        let current = result[0]
        while (prevmap[`${current.x}-${current.y}`] != null) {
          path.push(current)
          current = prevmap[`${current.x}-${current.y}`]
        }
        setTimeout(() => {
          path.reverse().forEach((elem) => {
            refArray.current[elem.x + elem.y * 5].path = true;
          })
        }, result[1] * 9)
      }
    }
  }, [run])

  return (
    <div className={gridStyle.container}>
      {console.log(refArray.current)}
      {refArray.current.map((elem, index) => {
        let xIndex = Math.floor(index / 5)
        let yIndex = index % 5
        let cell = grid[xIndex][yIndex]

        const style = !elem.current ? 'cell' : 'visited'

        return (
          <div key={`${index}`} ref={elem} className={gridStyle[style]} >
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
