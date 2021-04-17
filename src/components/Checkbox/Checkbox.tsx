import React from 'react'

import styles from './checkbox.module.scss'

interface Props {
  label: string
  onChangeHandler: any
}

const Checkbox: React.FC<Props> = ({ label, onChangeHandler }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        type='checkbox'
        onChange={onChangeHandler}
        className={styles.checkbox}
      />
    </div>
  )
}

export default Checkbox
