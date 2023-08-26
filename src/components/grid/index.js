import { useRef, useState } from "react";
import { useParams } from "../../../store/context";

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
    grid.array.forEach(elem => {
      elem.array.forEach(child => {
        array.push(useRef())
      });
    });
    return array
  }

  return refArray.map((elem, index) => {
    let classList = ['cell']

    let yindex = Math.floor(index / 50)
    let xindex = index % 50
    let cell = grid[yindex][xindex]

    if (cell.iswall) {
      classList.push('wall')
    }

    return <div key={`${index}`} ref={elem} className={classList.join('         ')} >


      {cell.weight > 1 ? <i className="bi bi-virus"></i> : null}
      {cell.isstart ? <i className="bi bi-geo-alt"></i> : null}
      {cell.istarget ? <i className="bi bi-geo"></i> : null}

    </div>
  })
}


export default Grid;
