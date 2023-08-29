'use client';

import { useRef, useState, useEffect } from "react";
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
      refArray[c.x + c.y * 5].current.style['transition-delay'] = `${count * 8}ms`
      refArray[c.x + c.y * 5].current.value = true
      if (c.x == target.x && c.y == target.y) return [c, count]

      if (c.x + 1 < 5 && !hashmap[`${c.x + 1}-${c.y}`] && !graph[c.y][c.x + 1].iswall) {
        queue.unshift({ x: c.x + 1, y: c.y })
        prevmap[`${c.x + 1}-${c.y}`] = { ...c }
        hashmap[`${c.x + 1}-${c.y}`] = true
      }
      if (c.x - 1 >= 0 && !hashmap[`${c.x - 1}-${c.y}`] && !graph[c.y][c.x - 1].iswall) {
        queue.unshift({ x: c.x - 1, y: c.y })
        prevmap[`${c.x - 1}-${c.y}`] = { ...c }
        hashmap[`${c.x - 1}-${c.y}`] = true
      }
      if (c.y + 1 < 5 && !hashmap[`${c.x}-${c.y + 1}`] && !graph[c.y + 1][c.x].iswall) {
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
      let result = BFS(grid, hashmap, prevmap, start.current, end.current)
      let path = []
      if (result != null) {
        let current = result[0]
        while (prevmap[`${current.x}-${current.y}`] != null) {
          path.push(current)
          current = prevmap[`${current.x}-${current.y}`]
        }
        setTimeout(() => {
          path.reverse().forEach((elem, index) => {
            refArray[elem.x + elem.y * 5].current.style['transition-delay'] = `${(index) * 15}ms`
            refArray[elem.x + elem.y * 5].current.classList.add('path')
          })
        }, result[1] * 9)

      }
    }
  }, [run])

  useEffect(() => {
    refArray.forEach((elem) => { elem.current.style['transition-delay'] = '0ms' })
    // refArray.forEach((elem) => {
    //   elem.current.value = { visited: false };
    //   elem.current.classList.remove('path')
    // }
    // )
  }, [res])

  function getRefArray(grid) {
    let array = []
    grid.forEach(elem => {
      elem.forEach((child) => {
        array.push(useRef(false))
      });
    });
    return array
  }

  return (
    <div className={gridStyle.container}>
      {refArray.map((elem, index) => {
        let xIndex = Math.floor(index / 5)
        let yIndex = index % 5
        let cell = grid[xIndex][yIndex]

        const style = elem?.current?.value ? 'cell' : 'visited'

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
