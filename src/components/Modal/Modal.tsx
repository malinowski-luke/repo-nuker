import React from 'react'

import ReactModal from 'react-modal'

interface Props {
  isOpen: boolean
  handleClose: () => void
}

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#303030',
    border: '1px solid #fff',
  },

  overlay: {
    background: 'rgba(0,0,0,0.5)',
  },
}

const Modal: React.FC<Props> = ({ isOpen, handleClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      style={modalStyle}
      ariaHideApp={false}
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick
    >
      {children}
    </ReactModal>
  )
}

export default Modal
