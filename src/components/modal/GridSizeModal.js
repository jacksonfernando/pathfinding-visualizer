import { useRef } from "react"
import Modal from "."
import { useParams } from "../../../store/context";

const GridSizeModal = ({ open, setIsModalOpen }) => {
  const { setDimension } = useParams();
  const widthRef = useRef();
  const heightRef = useRef();

  const AlgorithmContent = () => {
    return (
      <div>
        <h2>Grid width and height</h2>
        <br />
        <label>Width  : </label>
        <input type="text" ref={widthRef} />
        <br /><br />
        <label>Height : </label>
        <input type="text" ref={heightRef} />
        <br /><br />
        <button type="submit"
          onClick={() => setDimension(prev => (
            {
              ...prev,
              width: parseInt(widthRef.current.value),
              height: parseInt(heightRef.current.value)
            })
          )}
        >
          Submit
        </button>
      </div >
    )
  }
  return open && (
    <Modal setIsModalOpen={setIsModalOpen} content={AlgorithmContent()} />
  )
}

export default GridSizeModal
