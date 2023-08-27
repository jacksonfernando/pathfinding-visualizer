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

  function BFS(graph, hashmap, prevmap, start, target) {
    let queue = [start]
    let count = 0
    hashmap[`${start.x}-${start.y}`] = true
    while (queue.length > 0) {
      count += 1
      let c = queue.pop()
      refArray[c.x + c.y * 20].current.style['transition-delay'] = `${count * 8}ms`
      refArray[c.x + c.y * 20].current.classList.add('visited')
      if (c.x == target.x && c.y == target.y) return [c, count]

      if (c.x + 1 < 20 && !hashmap[`${c.x + 1}-${c.y}`] && !graph[c.y][c.x + 1].iswall) {
        queue.unshift({ x: c.x + 1, y: c.y })
        prevmap[`${c.x + 1}-${c.y}`] = { ...c }
        hashmap[`${c.x + 1}-${c.y}`] = true
      }
      if (c.x - 1 >= 0 && !hashmap[`${c.x - 1}-${c.y}`] && !graph[c.y][c.x - 1].iswall) {
        queue.unshift({ x: c.x - 1, y: c.y })
        prevmap[`${c.x - 1}-${c.y}`] = { ...c }
        hashmap[`${c.x - 1}-${c.y}`] = true
      }
      if (c.y + 1 < 20 && !hashmap[`${c.x}-${c.y + 1}`] && !graph[c.y + 1][c.x].iswall) {
        queue.unshift({ x: c.x, y: c.y + 1 })
        prevmap[`${c.x}-${c.y + 1}`] = { ...c }
        hashmap[`${c.x}-${c.y + 1}`] = true
      }
      if (c.y - 1 >= 0 && !hashmap[`${c.x}-${c.y - 1}`] && !graph[c.y - 1][c.x].iswall) {
        queue.unshift({ x: c.x, y: c.y - 1 })
        prevmap[`${c.x}-${c.y - 1}`] = { ...c }
        hashmap[`${c.x}-${c.y - 1}`] = true
      }
    }
    return null
  }

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
