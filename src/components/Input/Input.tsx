import React from 'react'
import styles from './input.module.scss'

interface Props {
  title: string
  type: string
  textState: string
  onChangeHandler: (value: string) => void
}

const Input: React.FC<Props> = ({
  title,
  type,
  onChangeHandler,
  textState,
}) => {
  return (
    <div className={styles.form}>
      <input
        type={type}
        name={title}
        value={textState}
        autoComplete='off'
        onChange={(e) => onChangeHandler(e.target.value)}
        required
      />
      <label className={styles.labelName}>
        <span className={styles.contentName}>{title}</span>
      </label>
    </div>
  )
}

export default Input
