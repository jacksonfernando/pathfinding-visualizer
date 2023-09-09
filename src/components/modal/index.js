import modalStyle from './modal.module.css'
import { IoCloseOutline } from "react-icons/io5";

const Modal = ({ content, setIsModalOpen }) => {
  return (
    <div className={modalStyle.container}>
      <div className={modalStyle.closeIcon}>
        <IoCloseOutline
          key='closeMenu'
          size={33}
          onClick={() => setIsModalOpen(false)}
        />
      </div>
      <div className={modalStyle.content}>
        {content}
      </div >
    </div >
  )
}

export default Modal
