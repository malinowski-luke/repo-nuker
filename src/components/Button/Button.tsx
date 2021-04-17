import React from 'react'
import styles from './button.module.scss'

interface Props {
  title: string
  onClickHandler: () => any
  disbleCondition: boolean
  block: boolean
  loading: boolean
}

const Button: React.FC<Props> = ({
  title,
  onClickHandler,
  disbleCondition,
  block,
  loading,
}) => {
  return (
    <button
      className={`${styles.button} ${block && styles.block}`}
      onClick={onClickHandler}
      disabled={disbleCondition}
    >
      {!loading ? (
        title
      ) : (
        <span>
          loading <span className={styles.spinner}></span>
        </span>
      )}
    </button>
  )
}

export default Button
