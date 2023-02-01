import {
  FaHome, FaShoppingCart,
  FaHeart, FaDog,
} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import stylesMobileFooter from './styles.module.scss'

export function MobileFooter() {
  const cart = useSelector((store) => store.cart)
  const favorites = useSelector((store) => store.favorites)
  return (
    <div className={stylesMobileFooter.wr}>
      <div className={stylesMobileFooter.wr_item}>
        <NavLink to="/">
          <FaHome className={stylesMobileFooter.icon} />
          <h4>Главная</h4>
        </NavLink>
      </div>
      <div className={stylesMobileFooter.wr_item}>
        <NavLink to="/cart">
          <FaShoppingCart className={stylesMobileFooter.icon} />
          <h4>Корзина</h4>
          <div className={cart.length ? stylesMobileFooter.cartSticker : 'hidden'}>
            {cart.length}
          </div>
        </NavLink>
      </div>
      <div className={stylesMobileFooter.wr_item}>
        <NavLink to="/favorites">
          <FaHeart className={stylesMobileFooter.icon} />
          <h4>Избранное</h4>
          <div className={favorites.length ? stylesMobileFooter.favoritesSticker : 'hidden'}>
            {favorites.length}
          </div>
        </NavLink>
      </div>
      <div className={stylesMobileFooter.wr_item}>
        <NavLink to="/useraccount">
          <FaDog className={stylesMobileFooter.icon} />
          <h4>Аккаунт</h4>
        </NavLink>
      </div>
    </div>
  )
}
