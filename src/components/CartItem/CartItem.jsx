import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa'
import {
  changeStatusSelected, decreaseCountCart, deleteItemCart, increaseCountCart,
} from '../../redux/slices/cartSlice/cartSlice'
import stylesIndex from './styles.module.scss'
import { addItemFavorites } from '../../redux/slices/favoritesSlice/favoritesSlice'

export function CartItem({
  pictures, name, discount, price, stock, _id: id,
}) {
  const dispatch = useDispatch()
  const cart = useSelector((store) => store.cart)
  const favorites = useSelector((store) => (store.favorites))
  const item = cart.find((el) => el.id === id)

  const increaseHandler = () => {
    dispatch(increaseCountCart(id))
  }
  const decreaseHandler = () => {
    dispatch(decreaseCountCart(id))
  }
  const changeStatusHandler = () => {
    dispatch(changeStatusSelected(id))
  }
  const deleteHandler = () => {
    dispatch(deleteItemCart(id))
  }
  const changeFavoriteHandler = () => {
    dispatch(addItemFavorites(id))
  }
  const discountFunc = (p, discont) => Math.round((p - p * discont * 0.01) / 100) * 100
  return (
    <div>
      <div>
        <div className={stylesIndex.card_container}>
          <div className={stylesIndex.chbx_wr}>
            <input onChange={changeStatusHandler} className={stylesIndex.chbx} type="checkbox" checked={item.selected} />
          </div>
          <NavLink to={`../products/${id}`}>
            <div className={stylesIndex.imgWr}>
              <img className={stylesIndex.img} src={pictures} alt="" />
            </div>
          </NavLink>
          <div>
            <h4>{`${name.slice(0, 18)}...`}</h4>
            <h5 className={discount ? stylesIndex.discount_price : 'hidden'}>
              {price}
              ₽
            </h5>
            <h4 className={discount ? stylesIndex.redPrice : ''}>
              {discount ? discountFunc(price, discount) : price}
              {' '}
              ₽
            </h4>
          </div>
          <div className={stylesIndex.btn}>
            <div className={stylesIndex.wr_counter}>
              <button onClick={decreaseHandler} disabled={item.counter === 1} className={stylesIndex.btn_counter} type="button">-</button>
              <input className={stylesIndex.input} type="text" readOnly value={item.counter} />
              <button onClick={increaseHandler} disabled={item.counter === stock} className={stylesIndex.btn_counter} type="button">+</button>
            </div>
            <button onClick={deleteHandler} type="button">удалить</button>
          </div>
          <div className={discount ? stylesIndex.discount : 'hidden'}>
            -
            {discount}
            %
          </div>
          <FaRegHeart
            onClick={changeFavoriteHandler}
            className={favorites.some((el) => el === id) ? stylesIndex.heart_red
              : stylesIndex.heart}
          />
        </div>
      </div>
    </div>
  )
}
