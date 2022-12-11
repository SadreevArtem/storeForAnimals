/* eslint-disable linebreak-style */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import stylesSignUp from './styles.module.scss'

export function SignUp() {
  const [input, setInput] = useState({})
  const { api } = useProductContext()
  const navigate = useNavigate()

  const signUpHandler = (e) => {
    e.preventDefault()

    api.signUp(input)
      .then((result) => alert(result))
    navigate('/')
  }

  return (
    <div className={stylesSignUp.login}>
      <h2>Регистрация пользователя</h2>
      <div>
        <form onSubmit={signUpHandler} className={stylesSignUp.login}>
          <input onChange={(e) => setInput({ ...input, email: e.target.value })} type="email" required value={input.email} placeholder="Адрес электронной почты" />
          <input onChange={(e) => setInput({ ...input, group: e.target.value })} type="text" required value={input.group} placeholder="Группа" />
          <input
            type="password"
            required
            placeholder="Пароль"
            onChange={(e) => setInput({
              ...input,
              password: e.target.value,
            })}
          />
          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  )
}
