import modalStyle from './modal.module.css'
import { IoCloseOutline } from "react-icons/io5";

const Modal = ({ content, open, setIsModalOpen }) => {
  return open && (
    <div className={modalStyle.container}>
      <IoCloseOutline
        key='closeMenu'
        size={33}
        onClick={() => setIsModalOpen(false)}
      />
      {content}
    </div>
  )
}

export default Modal
