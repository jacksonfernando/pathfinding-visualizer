'use client';

import { useRef, useState } from "react";
import { useParams } from "../../../store/context";
import { CiVirus, CiFlag1, CiLocationOn } from 'react-icons/ci'
import gridStyle from './grid.module.css'

const Grid = () => {
  const {
    grid,
    setGrid,
    editing,
    setEditFlag,
    mode,
    start,
    end,
    run,
    res,
    algo
  } = useParams()

  const [refArray, mm] = useState(getRefArray(grid))

  function getRefArray(grid) {
    let array = []
    grid.forEach(elem => {
      elem.forEach((child) => {
        array.push(useRef())
      });
    });
    return array
  }

  return (
    <div className={gridStyle.container}>
      {refArray.map((elem, index) => {
        let classList = ['cell']
        let xIndex = Math.floor(index / 20)
        let yIndex = index % 20
        let cell = grid[xIndex][yIndex]
        if (cell.isWall) {
          classList.push('wall')
        }

        return (
          <div key={`${index}`} ref={elem} className={gridStyle.cell} >
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
