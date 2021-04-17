import React from 'react'
import styles from './button.module.scss'

interface Props {
  title: string
  onClickHandler: () => any
  disbleCondition: boolean
  block: boolean
}

const Button: React.FC<Props> = ({
  title,
  onClickHandler,
  disbleCondition,
  block,
}) => {
  return (
    <button
      className={`${styles.button} ${block && styles.block}`}
      onClick={onClickHandler}
      disabled={disbleCondition}
    >
      {title}
    </button>
  )
}

export default Button
