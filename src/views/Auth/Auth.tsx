import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import useSetUser from '../../hooks/useSetUser'
import useGetUser from '../../hooks/useGetUser'
import { updateRepoStore } from '../../stores/repoStore'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Checkbox from '../../components/Checkbox/Checkbox'
import Modal from '../../components/Modal/Modal'

import api from '../../utils/api'
import { cleanRepoData } from '../../utils/utils'
import { toast } from 'react-toastify'
import { User, Repo } from '../../definitions'

import styles from './auth.module.scss'

interface Props {}

const Auth: React.FC<Props> = () => {
  const [username, setUsername] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const [tokenHidden, setTokenHidden] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const history = useHistory()
  const user: User = useGetUser()
  const setUserToStore: (user: User) => void = useSetUser()

  useEffect(() => {
    if (user.username !== '') {
      history.replace('/repos')
    }
  }, [history, user.username])

  const handleUsername = (username: string) => {
    setUsername(username)
  }

  const handleOpenModal = () => {
    setModalOpen(!modalOpen)
  }

  const handleToken = (token: string) => {
    setToken(token)
  }

  const handleHideToken = () => {
    setTokenHidden(!tokenHidden)
  }

  const handleAuth = async () => {
    const currentUser: User = { username, token }

    setLoading(true)

    try {
      const response = await api.get(
        `https://api.github.com/search/repositories?q=user:${currentUser.username}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      )

      if (response.data.items.length === 0) {
        toast.success('No Repos Found')
        return
      }

      const repos: Repo[] = cleanRepoData(response.data.items)

      setUserToStore(currentUser)
      updateRepoStore(repos)

      toast.success(`Successfully Fetched ${repos.length} Github Repos`)
      history.push('/repos')
    } catch (err) {
      console.error(err.message)
      toast.error('Invalid Github Credentials')
    }

    setLoading(false)
  }

  return (
    <div className={`${styles.authContainer} slide-fade`}>
      <Modal isOpen={modalOpen} handleClose={handleOpenModal} />
      <h1 className={styles.header}>Authorize Deletion</h1>
      <Input
        title='username'
        type='text'
        onChangeHandler={handleUsername}
        textState={username}
      />
      <Input
        title='token'
        type={tokenHidden ? 'password' : 'token'}
        onChangeHandler={handleToken}
        textState={token}
      />
      <div className={styles.optionsContainer}>
        <Checkbox label='Show Token' onChangeHandler={handleHideToken} />
        <span className={styles.linkContainer}>
          <a
            href='https://github.com/settings/tokens'
            target='_blank'
            rel='noreferrer'
            className={styles.link}
          >
            How to get Github Token
          </a>{' '}
          |{' '}
          <span className={styles.link} onClick={handleOpenModal}>
            How to ?
          </span>
        </span>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          title='fetch repos'
          onClickHandler={handleAuth}
          disbleCondition={username === '' || token === ''}
          block={true}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default Auth
