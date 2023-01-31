import { useQuery } from '@tanstack/react-query'
import { FaRegHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import { addItemCart } from '../../redux/slices/cartSlice/cartSlice'
import { addItemFavorites } from '../../redux/slices/favoritesSlice/favoritesSlice'
import { PRODUCT_DETAIL } from '../../utils/constants'
import { Loader } from '../Loader/Loader'
import stylesProductDetail from './styles.module.scss'

export function ProductDetail() {
  const { id } = useParams()
  const { api } = useProductContext()
  const favorites = useSelector((store) => store.favorites)
  const cart = useSelector((store) => store.cart)
  const dispatch = useDispatch()
  const getProductFunc = () => api.getProductItem(id).then((res) => res.json())
  const { data, isLoading } = useQuery({
    queryKey: PRODUCT_DETAIL,
    queryFn: getProductFunc,
  })
  const addItemCartHandler = () => {
    dispatch(addItemCart(id))
  }
  const changeFavoriteHandler = (event) => {
    event.preventDefault()
    dispatch(addItemFavorites(id))
  }
  const discountFunc = (p, discont) => Math.round((p - p * discont * 0.01) / 100) * 100

  if (isLoading) return <Loader />
  return (
    <div className={stylesProductDetail.wr}>
      <div className={stylesProductDetail.ImgWr}>
        <img className={stylesProductDetail.img} src={data.pictures} alt="Image_item" />
      </div>
      <div className={stylesProductDetail.wrInfo}>
        <div className={stylesProductDetail.wrList}>
          <h2>{data.name}</h2>
          <h4 className={data.discount ? stylesProductDetail.discount_price : 'hidden'}>
            {data.price}
            {' '}
            ₽
          </h4>
          <h3 className={data.discount ? stylesProductDetail.redPrice : ''}>
            {data.discount ? discountFunc(data.price, data.discount) : data.price}
            {' '}
            ₽
          </h3>
          <h4>
            Вес
            {' '}
            {data.wight}
          </h4>
          <h4>{data.description.slice(0, 290)}</h4>
          <div className={stylesProductDetail.buttonWr}>
            <button type="button" onClick={addItemCartHandler}>в корзину</button>
          </div>
          <div className={cart.some((el) => el.id === id) ? stylesProductDetail.cartSticker : 'hidden'}>
            {cart.find((el) => el.id === id) ? `В корзине: ${cart.find((el) => el.id === id).counter}` : ''}
          </div>
        </div>
        <div className={stylesProductDetail.reviews}>
          <NavLink to="reviews">
            Отзывы
            {' '}
            {`(${data.reviews.length})`}
          </NavLink>
        </div>
      </div>
      <div className={data.discount ? stylesProductDetail.discount : 'hidden'}>
        -
        {data.discount}
        %
      </div>
      <div className={data.tags.includes('new') ? stylesProductDetail.newSticker : 'hidden'}>
        NEW
      </div>
      <FaRegHeart
        onClick={changeFavoriteHandler}
        className={favorites.some((el) => el === id) ? stylesProductDetail.heart_red
          : stylesProductDetail.heart}
      />
    </div>
  )
}
