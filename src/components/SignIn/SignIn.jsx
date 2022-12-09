/* eslint-disable linebreak-style */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import stylesSignIn from './styles.module.scss'

/* eslint-disable linebreak-style */
export function SignIn() {
  const [input, setInput] = useState({})
  const { api } = useProductContext()
  const navigate = useNavigate()
  const tokenLS = localStorage.getItem('TOKEN') ? JSON.parse(localStorage.getItem('TOKEN')) : undefined
  console.log(tokenLS)
  console.log(input)

  const signInHandler = (e) => {
    e.preventDefault()
    api.logIn(input)
      .then((result) => {
        localStorage.setItem('TOKEN', JSON.stringify(result.token))
      })
  }
  if (tokenLS) {
    navigate('/')
    return <h2>Вы авторизованы</h2>
  }
  return (
    <div>
      <form onSubmit={signInHandler} name="login" className={stylesSignIn.login}>
        <input onChange={(e) => setInput({ ...input, email: e.target.value })} type="email" required value={input.email} placeholder="Адрес электронной почты" />
        <input
          type="password"
          required
          placeholder="Пароль"
          onChange={(e) => setInput({
            ...input,
            password: e.target.value,
          })}
        />
        <button type="submit">Войти</button>
        <h3>Нет аккаунта? </h3>
        <Link to="/signup">
          <button type="button">Зарегистрироваться</button>
        </Link>
      </form>
    </div>
  )
}
