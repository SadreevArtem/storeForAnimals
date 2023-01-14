import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import stylesSignIn from './styles.module.scss'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import { USER_SIGN_IN } from '../../utils/constants'
import { setToken } from '../../redux/slices/tokenSlice/tokenSlice'

export function SignIn() {
  const [input, setInput] = useState({})
  const token = useSelector((store) => store.token.value) || ''
  console.log({ token })
  const { api } = useProductContext()
  const navigate = useNavigate()
  useEffect(() => {
    if (token) navigate('/')
  }, [token])
  const dispatch = useDispatch()

  const queryClient = useQueryClient()
  const signInFunc = () => api.signInRequest(input)
    .then((res) => res.json())
    .then((result) => {
      console.log(result.token)
      dispatch(setToken(result.token))
    })

  const { mutateAsync } = useMutation({
    mutationFn: signInFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_SIGN_IN })
    },
  })

  const signInHandler = async (e) => {
    e.preventDefault()
    await mutateAsync()
    navigate('/')
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
