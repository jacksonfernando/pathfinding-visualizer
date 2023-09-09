import Modal from "."

const Algorithmsmodal = ({ open, setIsModalOpen }) => {
  const AlgorithmContent = () => {
    return (
      <div>
        <p>BFS</p>
        <p>DFS</p>
        <p>Djakstra</p>
      </div>
    )
  }
  return open && (
    <Modal setIsModalOpen={setIsModalOpen} content={AlgorithmContent()} />
  )
}

export default Algorithmsmodal
