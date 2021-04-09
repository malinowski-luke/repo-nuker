import React from 'react'
import { Link } from 'react-router-dom'

import styles from './linkbutton.module.scss'

interface Props {
  linkPath: string
  children: string
}

const LinkButton: React.FC<Props> = ({ linkPath, children }) => {
  return (
    <Link to={linkPath} className={styles.linkButton}>
      {children}
    </Link>
  )
}

export default LinkButton
