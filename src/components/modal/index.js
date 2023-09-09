import modalStyle from './modal.module.css'

const Modal = ({ content, open }) => {
  return open && (
    <div className={modalStyle.container}>
      {content}
    </div>
  )
}

export default Modal
