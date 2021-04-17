import useUserStore from '../stores/userStore'
import { User } from '../definitions'

const useGetUser = (): User => {
  const { user } = useUserStore()
  return user
}

export default useGetUser
