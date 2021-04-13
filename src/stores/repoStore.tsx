import create from 'zustand'

import { Repo, User } from '../definitions'
// import api from '../utils/api'

type State = {
  repos: Repo[]
  user: User
}

const store = (set: any) => {
  return {
    repos: [],
    user: {
      userName: '',
      token: '',
    },
  }
}

const useRepoStore = create<State>(store)

export default useRepoStore
