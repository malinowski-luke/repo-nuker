import useRepoStore from '../stores/repoStore'
import { Repo } from '../definitions'

const useAllRepos = (): Repo[] => {
  const { repos } = useRepoStore()

  return repos
}

export default useAllRepos
