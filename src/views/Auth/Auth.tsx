import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import useSetUser from '../../hooks/useSetUser'
import useGetUser from '../../hooks/useGetUser'
import { updateRepoStore } from '../../stores/repoStore'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Checkbox from '../../components/Checkbox/Checkbox'
import Modal from '../../components/Modal/Modal'
import GithubLogo from '../../components/GithubLogo/GithubLogo'
import { Link } from 'react-router-dom'

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

  const handleClearState = () => {
    setUsername('')
    setToken('')
    history.push('/home')
  }

  return (
    <div className={`${styles.authContainer} slide-fade`}>
      <Modal isOpen={modalOpen} handleClose={handleOpenModal}>
        <div className={styles.modalContent}>
          <h1>Get Access Token</h1>
          <hr />
          <h2>Step 1</h2>
          <p>
            Clicking the "Generate Access Token" link below will bring you to
            GitHubs token generator page. Once there, click "Generate new token"
            on the top right of the screen.
          </p>
          <h2>Step 2</h2>
          <p>
            Select "public_repo" and "delete_repo" from the listed options.
            Then, click "Generate token" and paste the generated token in the
            input field below.
          </p>
          <h2>Step 3</h2>
          <p>
            Submit. You will have the opportunity to choose which repos you want
            to save and delete after you hit "Fetch Repos"
          </p>
          <a
            href='https://github.com/settings/tokens'
            target='_blank'
            rel='noreferrer'
            onClick={handleOpenModal}
          >
            Generate Access Token
          </a>
        </div>
      </Modal>
      <h2 className={styles.header}>
        Authorize Deletion <GithubLogo />
      </h2>
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
          {/*
            href='https://github.com/settings/tokens'
            */}
          <span className={styles.link} onClick={handleOpenModal}>
            How to ?{' '}
          </span>
          |{' '}
          <Link className={styles.link} onClick={handleClearState} to='/home'>
            Home
          </Link>
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
