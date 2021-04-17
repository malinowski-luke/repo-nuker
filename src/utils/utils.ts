import { Repo } from '../definitions'

export const cleanRepoData = (rawRepoArr: Object[]): Repo[] =>
  rawRepoArr.map((repo: any) => ({
    id: repo.id,
    name: repo.name,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    selected: false,
  }))
