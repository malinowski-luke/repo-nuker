import React from 'react'
import styles from './button.module.scss'

interface Props {
  title: string
  onClickHandler: () => any
}

const Button: React.FC<Props> = ({ title, onClickHandler }) => {
  return (
    <button className={styles.button} onClick={onClickHandler}>
      {title}
    </button>
  )
}

export default Button
