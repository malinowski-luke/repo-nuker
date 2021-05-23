import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { StateCreator } from 'zustand/vanilla'

import { User } from '../definitions'

type State = {
  user: User
  setUser: any
}

let store: StateCreator<State> = (set) => {
  return {
    user: {
      username: '',
      token: '',
    },
    setUser: (user: User) => set((state: State) => ({ ...state, user })),
  }
}

if (process.env.NODE_ENV === 'development') {
  store = devtools(store)
}

store = persist(store, {
  name: 'user',
  getStorage: () => sessionStorage,
})

const useUserStore = create<State>(store)

export default useUserStore
