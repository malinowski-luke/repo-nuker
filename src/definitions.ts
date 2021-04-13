export interface User {
  userName: string
  token: string
}

export interface Repo {
  name: string
  id: string | number
  createdAt: string
  updatedAt: string
}
