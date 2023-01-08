import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import stylesSignIn from './styles.module.scss'
import { USER_SIGN_IN } from '../../utils/constants'
import { getTokenAC } from '../../redux/actionsCreators/tokenAC'

export function SignIn() {
  const [input, setInput] = useState({})
  const { token, api, setToken } = useProductContext()
  const navigate = useNavigate()
  useEffect(() => {
    if (token) navigate('/')
  }, [token])
  const dispatch = useDispatch()

  const queryClient = useQueryClient()
  const signInFunc = () => api.signInRequest(input)
    .then((res) => res.json()).then((result) => setToken(result.token))

  const { mutateAsync } = useMutation({
    mutationFn: signInFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_SIGN_IN })
    },
  })
  const signInHandler = async (e) => {
    e.preventDefault()
    await mutateAsync()
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
