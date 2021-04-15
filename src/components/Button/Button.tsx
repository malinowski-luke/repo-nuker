import React from 'react'
import styles from './button.module.scss'

interface Props {
  title: string
  onClickHandler: () => any
  disbleCondition: boolean
}

const Button: React.FC<Props> = ({
  title,
  onClickHandler,
  disbleCondition,
}) => {
  return (
    <button
      className={styles.button}
      onClick={onClickHandler}
      disabled={disbleCondition}
    >
      {title}
    </button>
  )
}

export default Button
