import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import { SIGN_UP } from '../../utils/constants'
import stylesSignUp from './styles.module.scss'

export function SignUp() {
  const [input, setInput] = useState({})
  const { api } = useProductContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const signUpFunc = () => api.signUpRequest(input)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json()
      }
      throw Error('Ошибка регистрации')
    })
    .catch(alert)

  const { mutateAsync } = useMutation({
    mutationFn: signUpFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SIGN_UP })
    },
  })

  const signUpHandler = async (e) => {
    e.preventDefault()
    await mutateAsync()
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
