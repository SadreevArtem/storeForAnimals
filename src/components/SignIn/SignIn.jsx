import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import stylesSignIn from './styles.module.scss'
import { getTokenAC } from '../../redux/actionsCreators/tokenAC'

export function SignIn() {
  const [input, setInput] = useState({})
  const token = useSelector((store) => store.token)
  const navigate = useNavigate()
  useEffect(() => {
    if (token) navigate('/')
  }, [token])
  const dispatch = useDispatch()

  const signInHandler = async (e) => {
    e.preventDefault()
    dispatch(getTokenAC(input))
    console.log('32242')
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
