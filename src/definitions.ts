export interface User {
  username: string,
  githubToken: string
}

export interface Repo {
  name: string,
  id: string | number,
  createdAt: string,
  updatedAt: string
}
