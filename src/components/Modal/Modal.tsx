import React from 'react'

import ReactModal from 'react-modal'
import Button from '../Button/Button'

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
    padding: '50px',
    transition: 'all 0.3s ease',
  },
}

const Modal: React.FC<Props> = ({ isOpen, handleClose }) => {
  return (
    <ReactModal isOpen={isOpen} style={modalStyle} ariaHideApp={false}>
      <h1>Hello From Modal</h1>
      <Button
        title='Close'
        loading={false}
        onClickHandler={handleClose}
        disbleCondition={false}
        block={false}
      />
    </ReactModal>
  )
}

export default Modal
