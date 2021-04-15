export interface User {
  username: string
  token: string
}

export interface Repo {
  name: string
  id: string | number
  createdAt: string
  updatedAt: string
}
