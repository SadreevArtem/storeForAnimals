import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { api } from '../../API/api'
import { USER_INFO } from '../../utils/constants'
import { AddProduct } from '../AddProduct/AddProduct'
import { Loader } from '../Loader/Loader'
import styleUserInfo from './styles.module.scss'

export function UserAccount() {
  const token = useSelector((store) => store.token.value)
  if (!token) return <Navigate to="/signin" />
  const getUserInfo = () => api.getInfoUser(token).then((res) => res.json())

  const { data: user, isLoading } = useQuery({
    queryKey: USER_INFO,
    queryFn: getUserInfo,
  })

  const generateInfo = (obj) => (
    <div className={styleUserInfo.wr}>
      <div>
        <img className={styleUserInfo.img} src={obj.avatar} alt="Avatar" />
      </div>
      <div className={styleUserInfo.aboutUser}>
        <h3>{`${obj.name}`}</h3>
        <h4>{`${obj.about}`}</h4>
        <h4>{`${obj.email}`}</h4>
        <Link to="edit">
          <button type="button">Изменить профиль</button>
        </Link>
        <AddProduct className={styleUserInfo.addProduct} />
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
