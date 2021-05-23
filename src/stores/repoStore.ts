import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { StateCreator } from 'zustand/vanilla'

import { Repo } from '../definitions'

type State = {
  repos: Repo[]
}

let store: StateCreator<State> = (set) => {
  return {
    repos: [],
  }
}

if (process.env.NODE_ENV === 'development') {
  store = devtools(store)
}

store = persist(store, {
  name: 'repo_store',
  getStorage: () => sessionStorage,
})

const useRepoStore = create<State>(store)

export const updateRepoStore = (repos: Repo[]) => {
  useRepoStore.setState({ repos })
}

export default useRepoStore
