'use client';

import { useRef, useState } from "react";
import { useParams } from "../../../store/context";
import { CiVirus } from 'react-icons/ci'
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
        let yindex = Math.floor(index / 50)
        let xindex = index % 50
        let cell = grid[yindex][xindex]
        if (cell.iswall) {
          classList.push('wall')
        }
        return (
          <div key={`${index}`} ref={elem} className={gridStyle.cell} >
            tolol
          </div>
        )
      })}
    </div>
  )
}


export default Grid;
