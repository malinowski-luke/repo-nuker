import useUserStore from '../stores/userStore'

const useSetUser = () => {
  const { setUser } = useUserStore()
  return setUser
}

export default useSetUser
