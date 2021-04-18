import React from 'react'

import LinkButton from '../../components/LinkButton/LinkButton'

import styles from './notfound.module.scss'

interface Props {}

const NotFound: React.FC<Props> = () => {
  return (
    <div className={`${styles.notFound} slide-fade`}>
      <h1>404 Not Found!</h1>
      <LinkButton linkPath='/home'>Home</LinkButton>
    </div>
  )
}

export default NotFound
