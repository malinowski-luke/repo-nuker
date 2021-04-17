import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { User } from '../definitions'

type State = {
  user: User
  setUser: any
}

let store: any = (set: any) => {
  return {
    user: {
      username: '',
      token: '',
    },
    setUser: (user: User) => set((state: State) => ({ ...state, user })),
  }
}
store = devtools(store)
store = persist(store, {
  name: 'user',
  getStorage: () => sessionStorage,
})

const useUserStore = create<State>(store)

export default useUserStore
