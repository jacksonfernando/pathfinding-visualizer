import Modal from "."
import { BFS_ALGORITHM, DFS_ALGORITHM } from "../../../constants/global"
import { useParams } from "../../../store/context"

const Algorithmsmodal = ({ open, setIsModalOpen }) => {
  const { setAlgo } = useParams()

  const AlgorithmContent = () => {
    return (
      <div>
        <h2>Choose your Algorithm!</h2>
        <br />
        <p onClick={() => {
          setAlgo(BFS_ALGORITHM)
          setIsModalOpen(false)
        }}>BFS</p>
        <p onClick={() => {
          setAlgo(DFS_ALGORITHM)
          setIsModalOpen(false)
        }}>DFS</p>
        <p>Djakstra</p>
      </div>
    )
  }
  return open && (
    <Modal setIsModalOpen={setIsModalOpen} content={AlgorithmContent()} />
  )
}

export default Algorithmsmodal
