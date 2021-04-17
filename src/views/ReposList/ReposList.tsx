import React, { useMemo, useEffect, useState } from 'react'
import { Repo } from '../../definitions'

import { useHistory } from 'react-router-dom'
import useAllRepos from '../../hooks/useAllRepos'
import useGetUser from '../../hooks/useGetUser'
import useSetUser from '../../hooks/useSetUser'

import { updateRepoStore } from '../../stores/repoStore'
import api from '../../utils/api'
import { toast } from 'react-toastify'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Paginate from '../../components/Paginate/Paginate'

import styles from './reposlist.module.scss'

interface Props {}

const ReposList: React.FC<Props> = () => {
  const repos = useAllRepos()

  const user = useGetUser()
  const setUser = useSetUser()
  const history = useHistory()
  const [filterName, setFilterName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (user.username === '' || repos.length === 0) {
      history.replace('/auth')
    }
  }, [user, repos.length])

  const computed = useMemo(() => {
    const selectedRepos = repos.filter((repo: Repo) => repo.selected)

    const selectedRepoCount = repos.filter((repo: Repo) => repo.selected).length

    return {
      selectedRepos,
      selectedRepoCount,
    }
  }, [repos])

  const filteredReposByName = repos.filter(
    (repo: Repo) => repo.name.includes(filterName) === true
  )

  const clearUserData = () => {
    history.push('/home')
    setUser({ username: '', token: '' })
    updateRepoStore([])
  }

  const handleGoHome = (): void => {
    const msg =
      'If navigate away from this page you will need to re-enter your Github credentials. Are you sure?'

    const confirm = window.confirm(msg)

    if (!confirm) {
      return
    }

    clearUserData()
  }

  const handleDeselectRepos = () => {
    const deselectedRepos: Repo[] = repos.map((repo: Repo) => {
      if (repo.selected) {
        repo.selected = false
      }
      return repo
    })

    updateRepoStore(deselectedRepos)
  }

  const handleDeleteRepos = async () => {
    const msg = `Are sure you want to delete these repos? This action can't be undone!`

    const confirm = window.confirm(msg)

    if (!confirm) {
      return
    }

    setLoading(true)
    try {
      const bulkDeleteResponse = await Promise.all(
        computed.selectedRepos.map(async (repo: Repo) => {
          const options = {
            headers: {
              Authorization: `Bearer ${user.token}`,
              Accept: 'application/vnd.github.v3+json',
            },
          }

          const response = await api.delete(
            `https://api.github.com/repos/${user.username}/${repo.name}`,
            options
          )
          return response
        })
      )
      interface ResultCountObjTypes {
        deletedCount: number
        failedCount: number
      }
      const resultCountObj: ResultCountObjTypes = bulkDeleteResponse.reduce(
        (acc, curr) => {
          if (curr.status === 204) {
            acc.deletedCount += 1
          } else {
            acc.failedCount += 1
          }
          return acc
        },
        {
          deletedCount: 0,
          failedCount: 0,
        }
      )

      if (resultCountObj.deletedCount > 0) {
        toast.success(
          `Deleted ${resultCountObj.deletedCount} Repo${
            resultCountObj.deletedCount > 1 ? 's' : ''
          }`
        )
      } else if (resultCountObj.failedCount > 0) {
        toast.error(
          `Failed to Delete ${resultCountObj.failedCount} Repos${
            resultCountObj.failedCount > 1 ? 's' : ''
          }`
        )
      }
      setLoading(false)
    } catch (err) {
      console.error(err.message)
      toast.error('Delete Action Failed!')
    }
    clearUserData()
  }

  return (
    <div className={`${styles.repoList} slide-fade`}>
      <h2>Number of Selected Repos: {computed.selectedRepoCount}</h2>
      <Input
        type='text'
        textState={filterName}
        title='filter'
        onChangeHandler={setFilterName}
      />
      <Paginate
        data={filterName === '' ? repos : filteredReposByName}
        itemsPerPage={5}
        prev='Previous'
        next='Next'
      />
      <div className={styles.buttonContainer}>
        <Button
          title='Delete Repos'
          onClickHandler={handleDeleteRepos}
          disbleCondition={computed.selectedRepoCount === 0}
          block={false}
          loading={loading}
        />
        <Button
          title='Deselect All Repos'
          onClickHandler={handleDeselectRepos}
          disbleCondition={computed.selectedRepoCount === 0}
          block={false}
          loading={false}
        />
        <Button
          title='Home'
          onClickHandler={handleGoHome}
          disbleCondition={false}
          block={false}
          loading={false}
        />
      </div>
    </div>
  )
}

export default ReposList
