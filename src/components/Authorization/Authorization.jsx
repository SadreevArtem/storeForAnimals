import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearCart } from '../../redux/slices/cartSlice/cartSlice'
import { removeToken } from '../../redux/slices/tokenSlice/tokenSlice'
import stylesAccount from './styles.module.scss'

export function Authorization() {
  const token = useSelector((store) => store.token.value)
  const cart = useSelector((store) => store.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logOutFunc = () => {
    dispatch(removeToken())
    dispatch(clearCart())
    navigate('/signin')
  }

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
        <div className={stylesAccount.wrLink}>
          <button onClick={logOutFunc} type="button">Выйти</button>
        </div>
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
