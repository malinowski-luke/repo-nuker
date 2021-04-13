import React, { useState } from 'react'

import useRepoStore from '../../stores/repoStore'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import styles from './auth.module.scss'

interface Props {}

const Auth: React.FC<Props> = () => {
  const [userName, setUserName] = useState<string>('')
  const [token, setToken] = useState<string>('')

  console.log(userName, token)

  const handleUsername = (userName: string) => {
    setUserName(userName)
  }

  const handleToken = (token: string) => {
    setToken(token)
  }

  console.log(useRepoStore((state) => state.user))
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
        | <span className={styles.link}>How to?</span>
      </span>
      <div className={styles.buttonContainer}>
        <Button
          title='Fetch Repos'
          onClickHandler={() => console.log('hello button')}
        />
      </div>
    </div>
  )
}

export default Auth
