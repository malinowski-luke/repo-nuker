import React from 'react'

import styles from './header.module.scss'

interface Props {
  values: string[]
}

const Header: React.FC<Props> = ({ values }) => {
  const mapHeader: JSX.Element[] = values.map((value, index) => (
    <span key={index} className={styles.text}>
      {value}
    </span>
  ))
  return <div className={styles.header}>{mapHeader}</div>
}

export default Header
