import React, { useMemo } from 'react'
import { Repo, Size } from '../../definitions'

import { updateRepoStore } from '../../stores/repoStore'
import useAllRepos from '../../hooks/useAllRepos'
import useWindowSize from '../../hooks/useWindowSize'

import { DateTime } from 'luxon'

import styles from './repoitem.module.scss'

interface Props {
  repo: Repo
}

const shortenDisplayText = (text: string): string => {
  return text.substr(0, 10) + '...'
}

const RepoItem: React.FC<Props> = ({ repo }) => {
  const repos: Repo[] = useAllRepos()

  const windowSize: Size = useWindowSize()
  const { width } = windowSize

  const handleSelectRepo = (id: string) => {
    const updatedRepos = repos.map((repo) => {
      if (repo.id === id) {
        repo.selected = !repo.selected
      }
      return repo
    })
    updateRepoStore(updatedRepos)
  }

  const computedDates = useMemo(() => {
    const format = 'D'
    return {
      createdAt: DateTime.fromISO(repo.createdAt).toFormat(format),
      updatedAt: DateTime.fromISO(repo.updatedAt).toFormat(format),
    }
  }, [repo])

  return (
    <div
      className={`${styles.repoItem} ${repo.selected && styles.selected}`}
      onClick={() => handleSelectRepo(repo.id)}
    >
      <span className={styles.text}>{repo.id}</span>
      <span className={styles.text}>
        {repo.name.length > 10 && width && width <= 450
          ? shortenDisplayText(repo.name)
          : repo.name}
      </span>
      <span className={styles.text}>{computedDates.createdAt}</span>
      <span>{computedDates.updatedAt}</span>
    </div>
  )
}

export default RepoItem
