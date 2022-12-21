import { useQuery } from '@tanstack/react-query'
import { Link, Navigate } from 'react-router-dom'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import { Loader } from '../Loader/Loader'
import styleUserInfo from './styles.module.scss'

export const USER_INFO = ['USER_INFO']

export function UserAccount() {
  const { token, api } = useProductContext()

  if (!token) return <Navigate to="/signin" />
  const getUserInfo = () => api.getInfoUser().then((res) => res.json())

  const { data: user, isLoading } = useQuery({
    queryKey: USER_INFO,
    queryFn: getUserInfo,
  })

  const generateInfo = (obj) => (
    <div className={styleUserInfo.wr}>
      <div>
        <img className={styleUserInfo.img} src={obj.avatar} alt="Avatar" />
      </div>
      <div>
        <h3>{`${obj.name}`}</h3>
        <h4>{`${obj.about}`}</h4>
        <h4>{`${obj.email}`}</h4>
        <Link to="edit">
          <button type="button">Изменить профиль</button>
        </Link>
      </div>
    </div>
  )
  if (isLoading) return <Loader />
  return (
    <div className={styleUserInfo.card}>
      <h2>Личный кабинет</h2>
      <div>
        {
          generateInfo(user)
        }
      </div>
    </div>
  )
}
