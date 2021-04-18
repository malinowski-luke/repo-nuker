import React, { useState, useEffect } from 'react'

import ReactPaginate from 'react-paginate'
import Header from '../Header/Header'
import RepoItem from '../RepoItem/RepoItem'

import { Repo } from '../../definitions'

import styles from './paginate.module.scss'

interface Props {
  data: Repo[]
  itemsPerPage: number
  prev: string
  next: string
}

const Paginate: React.FC<Props> = ({ data, itemsPerPage, prev, next }) => {
  const [paginatedData, setPaginatedData] = useState<JSX.Element[]>([])
  const [pageOffset, setPageOffset] = useState<number>(0)

  const pageCount: number = Math.ceil(data.length / itemsPerPage) - 1

  const paginateRepos = () => {
    const start: number = pageOffset * itemsPerPage
    const end: number = start + itemsPerPage

    const paginatedArr: JSX.Element[] = data
      .slice(start, end)
      .map((repo: Repo) => <RepoItem key={repo.id} repo={repo} />)

    setPaginatedData(paginatedArr)
  }

  const handlePageClick = (e: any) => {
    const selectedPage = e.selected + 1
    setPageOffset(selectedPage)
  }

  useEffect(paginateRepos, [pageOffset, data, itemsPerPage])

  useEffect(() => {
    if (paginatedData.length < 5 && pageOffset !== pageCount) {
      setPageOffset(0)
    }
  }, [paginatedData.length, pageOffset, pageCount])

  const hideCondition: boolean = paginatedData.length < 5 && pageOffset === 0

  return (
    <div>
      <Header values={['id', 'name', 'createdAt', 'updatedAt']} />
      {paginatedData}
      {hideCondition ? null : (
        <ReactPaginate
          previousLabel={prev}
          nextLabel={next}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={3}
          pageRangeDisplayed={4}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
        />
      )}
    </div>
  )
}

export default Paginate
