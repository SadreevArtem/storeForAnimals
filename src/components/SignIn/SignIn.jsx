import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import stylesSignIn from './styles.module.scss'
import img from './2527488.png'

export function SignIn() {
  const [input, setInput] = useState({})
  const { token, setToken } = useProductContext()
  const navigate = useNavigate()

  const signInRequest = () => fetch('https://api.react-learning.ru/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

  const signInHandler = (e) => {
    e.preventDefault()
    signInRequest().then((res) => res.json()).then((result) => {
      setToken(result.token)
    }).then(navigate('/'))
      .catch(alert)
  }
  if (token) {
    return (
      <div className={stylesSignIn.login}>
        <h2>Вы авторизованы</h2>
        <img src={img} alt="Dog" />
        <Link to="/">
          <button type="button">на главную</button>
        </Link>
      </div>
    )
  }
  return (
    <div>
      <form onSubmit={signInHandler} name="login" className={stylesSignIn.login}>
        <input onChange={(e) => setInput({ ...input, email: e.target.value })} type="email" required value={input.email || ''} placeholder="Адрес электронной почты" />
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
