import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { Repo, User } from '../definitions'

type State = {
  repos: Repo[]
  user: User
  setUser: any
  setRepos: any
}

let store: any = (set: any) => {
  return {
    repos: [],
    user: {
      username: '',
      token: '',
    },
    setUser: (user: User) => set((state: State) => ({ ...state, user })),
    setRepos: (repos: Repo[]) => set((state: State) => ({ ...state, repos })),
  }
}
store = devtools(store)
store = persist(store, { name: 'repo_config' })

const useRepoStore = create<State>(store)

export default useRepoStore
