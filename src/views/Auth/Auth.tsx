import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useRepoStore from '../../stores/repoStore'
import api from '../../utils/api'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import styles from './auth.module.scss'

import { User } from '../../definitions'

interface Props {}

const Auth: React.FC<Props> = () => {
  const history = useHistory()

  const [user, setUser] = useState<User>({ username: '', token: '' })

  const [setUserToStore, setReposToStore] = useRepoStore((state) => [
    state.setUser,
    state.setRepos,
  ])

  const handleUsername = (username: string) => {
    setUser({ ...user, username })
  }

  const handleToken = (token: string) => {
    setUser({ ...user, token })
  }

  const handleAuth = async () => {
    setUserToStore(user)

    try {
      const response = await api.get(
        `https://api.github.com/search/repositories?q=user:${user.username}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      )
      const repos = response.data.items

      if (repos.length === 0) {
        return
      }

      setReposToStore(repos)
      history.push('/repos')
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.header}>Authorize Deletion</h1>
      <Input title='username' type='text' onChangeHandler={handleUsername} />
      <Input title='token' type='password' onChangeHandler={handleToken} />
      <span className={styles.linkContainer}>
        <a
          href='https://github.com/settings/tokens'
          target='_blank'
          rel='noreferrer'
          className={styles.link}
        >
          How to get Github Token
        </a>{' '}
        | <span className={styles.link}>How to ?</span>
      </span>
      <div className={styles.buttonContainer}>
        <Button
          title='Fetch Repos'
          onClickHandler={handleAuth}
          disbleCondition={user.username === '' && user.token === ''}
        />
      </div>
    </div>
  )
}

export default Auth
