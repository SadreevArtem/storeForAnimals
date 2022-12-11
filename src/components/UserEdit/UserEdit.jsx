/* eslint-disable linebreak-style */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import stylesUserEdit from './styles.module.scss'

export function UserEdit() {
  const [input, setInput] = useState({})
  const { api } = useProductContext()
  const navigate = useNavigate()
  const updateHandler = (e) => {
    e.preventDefault()
    api.updateUserInfo(input)
      .then(() => alert('Информация о пользовате обновлена'))
    navigate('/useraccount')
  }

  return (
    <div>
      <div className={stylesUserEdit.login}>
        <h2>Изменить данные пользователя</h2>
        <div>
          <form onSubmit={updateHandler} className={stylesUserEdit.login}>
            <input onChange={(e) => setInput({ ...input, name: e.target.value })} type="text" required value={input.name} placeholder="Имя пользователя" />
            <input onChange={(e) => setInput({ ...input, about: e.target.value })} type="text" required value={input.about} placeholder="О пользователе" />
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
