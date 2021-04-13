import React from 'react'
import styles from './input.module.scss'

interface Props {
  title: string
  type: string
  onChangeHandler: (value: string) => void
}

const Input: React.FC<Props> = ({ title, type, onChangeHandler }) => {
  return (
    <div className={styles.form}>
      <input
        type={type}
        name={title}
        autoComplete='off'
        required
        onChange={(e) => onChangeHandler(e.target.value)}
      />
      <label className={styles.labelName}>
        <span className={styles.contentName}>{title}</span>
      </label>
    </div>
  )
}

export default Input
