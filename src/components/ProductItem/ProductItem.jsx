import { FaRegHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addItemCart } from '../../redux/slices/cartSlice/cartSlice'
import { addItemFavorites } from '../../redux/slices/favoritesSlice/favoritesSlice'
import stylesIndex from './styles.module.scss'

export function ProductItem({
  _id: id, pictures, name, discount, price, tags, wight,
}) {
  const dispatch = useDispatch()
  const favorites = useSelector((store) => store.favorites)
  const cart = useSelector((store) => store.cart)
  const addItemCartHandler = (event) => {
    event.preventDefault()
    dispatch(addItemCart(id))
  }
  const changeFavoriteHandler = (event) => {
    event.preventDefault()
    dispatch(addItemFavorites(id))
  }
  const discountFunc = (p, discont) => Math.round((p - p * discont * 0.01) / 100) * 100
  return (
    <NavLink to={`/products/${id}`}>
      <div>
        <div>
          <div className={stylesIndex.card_container}>
            <div className={stylesIndex.imgWr}>
              <img className={stylesIndex.img} src={pictures} alt="" />
            </div>
            <div>
              <h4>{`${name.slice(0, 25)}...`}</h4>
              <h5 className={discount ? stylesIndex.discount_price : 'hidden'}>
                {price}
                ₽
              </h5>
              <h4 className={discount ? stylesIndex.redPrice : ''}>
                {discount ? discountFunc(price, discount) : price}
                {' '}
                ₽
              </h4>
              <p className={stylesIndex.p}>{wight}</p>
            </div>
            <div className={stylesIndex.btn}>
              <button onClick={addItemCartHandler} className={stylesIndex.card_button} type="button">в корзину</button>
            </div>
            <div className={discount ? stylesIndex.discount : 'hidden'}>
              -
              {discount}
              %
            </div>
            <div className={tags.includes('new') ? stylesIndex.newSticker : 'hidden'}>
              NEW
            </div>
            <FaRegHeart
              onClick={changeFavoriteHandler}
              className={favorites.some((el) => el === id) ? stylesIndex.heart_red
                : stylesIndex.heart}
            />
            <div className={cart.some((el) => el.id === id) ? stylesIndex.cartSticker : 'hidden'}>
              {cart.find((el) => el.id === id) ? cart.find((el) => el.id === id).counter : ''}
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  )
}
