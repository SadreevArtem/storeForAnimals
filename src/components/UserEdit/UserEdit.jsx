import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import { Loader } from '../Loader/Loader'
import { USER_INFO } from '../UserAccount/UserAccount'
import stylesUserEdit from './styles.module.scss'

export function UserEdit() {
  const [isFetching, setIsfetching] = useState(false)
  const [input, setInput] = useState({})
  const { api } = useProductContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const updateUserInfo = () => api.updateUserRequest(input)

  const { mutateAsync } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_INFO })
    },
  })

  const updateHandler = async (e) => {
    e.preventDefault()
    setIsfetching(true)
    await mutateAsync()
    setIsfetching(false)
    navigate('/useraccount')
  }
  if (isFetching) return <Loader />
  return (
    <div>
      <div className={stylesUserEdit.login}>
        <h2>Изменить данные пользователя</h2>
        <div>
          <form onSubmit={updateHandler} className={stylesUserEdit.login}>
            <input onChange={(e) => setInput({ ...input, name: e.target.value })} type="text" required value={input.name || ''} placeholder="Имя пользователя" />
            <input onChange={(e) => setInput({ ...input, about: e.target.value })} type="text" required value={input.about || ''} placeholder="О пользователе" />
            <button type="submit">СОХРАНИТЬ</button>
            <Link to="/">
              <button type="button">ОТМЕНА</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
