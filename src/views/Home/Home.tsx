import React from 'react'
import LinkButton from '../../components/LinkButton/LinkButton'
import nukePng from '../../assets/nuke.png'
import styles from './home.module.scss'

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <div>
      <div className={styles.logoContainer}>
        <img className={styles.nuke} src={nukePng} alt='nuke img' />
        <h1 className={styles.textHeader}>Repo Nuker!</h1>
      </div>
      <div className={styles.buttonContainer}>
        <LinkButton linkPath='/auth'>Continue</LinkButton>
      </div>
    </div>
  )
}

export default Home
