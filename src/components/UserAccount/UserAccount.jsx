/* eslint-disable linebreak-style */
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import styleUserInfo from './styles.module.scss'

export function UserAccount() {
  const [user, setUser] = useState({})
  const tokenLS = localStorage.getItem('TOKEN') ? JSON.parse(localStorage.getItem('TOKEN')) : undefined
  const { api } = useProductContext()
  if (!tokenLS) return <Navigate to="/signin" />
  useEffect(() => {
    api
      .getUserInfo()
      .then((result) => setUser(result))
    console.log(tokenLS)
  }, [])

  const generateInfo = (obj) => (
    <div className={styleUserInfo.wr}>
      <div>
        <img className={styleUserInfo.img} src={obj.avatar} alt="Avatar" />
      </div>
      <div>
        <h3>{`${obj.name}`}</h3>
        <h4>{`${obj.about}`}</h4>
        <h4>{`${obj.email}`}</h4>
      </div>
    </div>
  )
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
