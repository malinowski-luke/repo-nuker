import React, { useEffect } from 'react'

import useGetUser from '../../hooks/useGetUser'
import useSetUser from '../../hooks/useSetUser'
import { updateRepoStore } from '../../stores/repoStore'

import LinkButton from '../../components/LinkButton/LinkButton'

import nukePng from '../../assets/nuke.png'
import styles from './home.module.scss'

interface Props {}

const Home: React.FC<Props> = () => {
  const setUser = useSetUser()
  const user = useGetUser()

  const handleClearState = () => {
    if (user.username) {
      window.alert(
        'By navigating to this page, your user data has been cleaerd!'
      )
      setUser({ username: '', token: '' })
      updateRepoStore([])
    } else return
  }

  useEffect(handleClearState, [user.username, setUser])
  return (
    <div className='slide-fade'>
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
