import React, { useMemo } from 'react'
import { Repo } from '../../definitions'

import { updateRepoStore } from '../../stores/repoStore'
import useAllRepos from '../../hooks/useAllRepos'

import { DateTime } from 'luxon'

import styles from './repoitem.module.scss'

interface Props {
  repo: Repo
}

const RepoItem: React.FC<Props> = ({ repo }) => {
  const repos = useAllRepos()

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
      <span className={styles.text}>{repo.name}</span>
      <span className={styles.text}>{computedDates.createdAt}</span>
      <span>{computedDates.updatedAt}</span>
    </div>
  )
}

export default RepoItem
