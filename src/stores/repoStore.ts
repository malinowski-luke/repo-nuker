import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { Repo } from '../definitions'

type State = {
  repos: Repo[]
}

let store: any = (set: any) => {
  return {
    repos: [],
  }
}
store = devtools(store)
store = persist(store, {
  name: 'repo_store',
  getStorage: () => sessionStorage,
})

const useRepoStore = create<State>(store)

export default useRepoStore

export const updateRepoStore = (repos: Repo[]) => {
  useRepoStore.setState({ repos })
}
