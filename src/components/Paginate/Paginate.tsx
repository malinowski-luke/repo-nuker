import React, { useState, useEffect } from 'react'

import ReactPaginate from 'react-paginate'
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

  const pageCount: number = Math.ceil(data.length / itemsPerPage)

  const paginateRepos = () => {
    const start: number = pageOffset * itemsPerPage
    const end: number = start + itemsPerPage

    const paginatedArr: JSX.Element[] = data
      .slice(start, end)
      .map((repo: Repo) => <RepoItem key={repo.id} repo={repo} />)

    setPaginatedData(paginatedArr)
  }

  const handlePageClick = (e: any) => {
    const selectedPage = e.selected
    setPageOffset(selectedPage)
  }

  useEffect(() => {
    paginateRepos()
  }, [pageOffset, data])

  return (
    <div>
      {paginatedData}
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
    </div>
  )
}

export default Paginate
