import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import stylesAccount from './styles.module.scss'

export function Authorization() {
  const token = useSelector((store) => store.token)
  const cart = useSelector((store) => store.cart)
  if (token) {
    return (
      <div className={stylesAccount.wr}>
        <Link to="/cart">
          <div className={stylesAccount.wrLink}>
            <button type="button">Корзина</button>
          </div>
        </Link>
        <Link to="/useraccount">
          <div className={stylesAccount.wrLink}>
            <button type="button">Аккаунт</button>
          </div>
        </Link>
        <div className={cart.length ? stylesAccount.cartSticker : 'hidden'}>
          {cart.length}
        </div>
      </div>
    )
  }

  return (
    <div className={stylesAccount.wr}>
      <Link to="/signup">
        <div className={stylesAccount.wrLink}>

          <button type="button">Регистрация</button>
        </div>
      </Link>

      <Link to="signin" type="button">
        <div className={stylesAccount.wrLink}>

          <button type="button">Войти</button>
        </div>
      </Link>
      <Link to="/useraccount">
        <div className={stylesAccount.wrLink}>

          <button type="button">Аккаунт</button>
        </div>
      </Link>
    </div>
  )
}
