import Modal from "."
import { BFS_ALGORITHM, DFS_ALGORITHM, DIJKSTRA_ALGORITHM } from "../../../constants/global"
import { useParams } from "../../../store/context"

const AlgorithmsModal = ({ open, setIsModalOpen }) => {
  const { setAlgo } = useParams()

  const setAlgoAndCloseModal = (algo) => {
    setAlgo(algo)
    setIsModalOpen(false)
  }

  const AlgorithmContent = () => {
    return (
      <div>
        <h2>Choose your Algorithm!</h2>
        <br />
        <p onClick={() => setAlgoAndCloseModal(BFS_ALGORITHM)}>BFS</p>
        <p onClick={() => setAlgoAndCloseModal(DFS_ALGORITHM)}>DFS</p>
        <p onClick={() => setAlgoAndCloseModal(DIJKSTRA_ALGORITHM)}>DIJKSTRA</p>
      </div >
    )
  }
  return open && (
    <Modal setIsModalOpen={setIsModalOpen} content={AlgorithmContent()} />
  )
}

export default AlgorithmsModal
