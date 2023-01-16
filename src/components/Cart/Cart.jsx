/* eslint-disable jsx-a11y/label-has-associated-control */
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import { changeAllSelectStatus, clearCart } from '../../redux/slices/cartSlice/cartSlice'
import { CartItem } from '../CartItem/CartItem'
import { Loader } from '../Loader/Loader'
import img from './2527488.png'
import stylesCart from './styles.module.scss'

export function Cart() {
  const { api } = useProductContext()
  const cart = useSelector((store) => store.cart)
  const navigate = useNavigate()
  const getCartItemsQueryKey = (cartItemsId) => ['cart'].concat(cartItemsId)
  const {
    data: products, isLoading, isError,
  } = useQuery({
    queryKey: getCartItemsQueryKey(cart.map((product) => product.id)),
    queryFn: () => api.getProductsByIds(cart.map((product) => product.id)),
  })
  if (isLoading) return <Loader />
  if (isError) return <div>Error</div>
  console.log(products.length)
  console.log({ cart })

  const dispatch = useDispatch()
  const clearCartHandler = () => {
    dispatch(clearCart())
    navigate('/')
  }
  const changeAllSelectHandler = () => {
    dispatch(changeAllSelectStatus())
  }

  if (!cart.length) {
    return (
      <div className={stylesCart.login}>
        <img src={img} alt="Dog" />
        <h2>Корзина пуста</h2>
        <p>Посмотрите предложения на главной странице или воспользуйтесь поиском</p>
        <Link to="/">
          <button type="button">на главную</button>
        </Link>
      </div>
    )
  }

  const cartSym = cart.map((el) => {
    if (el.discount) {
      return Math.round((el.price - el.price
         * el.discount * 0.01) / 100) * 100 * el.counter * (el.selected ? 1 : 0)
    }
    return el.price * el.counter * (el.selected ? 1 : 0)
  })
  console.log({ cartSym })
  return (

    <div className={stylesCart.wr}>
      <div>
        <div className={stylesCart.selectAll}>
          <input type="checkbox" id="chbx" onChange={changeAllSelectHandler} defaultChecked className={stylesCart.chbx} />
          <label htmlFor="chbx">
            Выбрать все
          </label>
        </div>
        <div className={stylesCart.wr_aside}>
          {
        cart.map((el) => <CartItem key={el.id} {...el} />)
        }
        </div>
      </div>
      <div className={stylesCart.confirm}>
        <h3>
          Условия заказа:
        </h3>
        <h3>
          Итого:
          {cart.filter((el) => el.selected === true).length}
          {' '}
          товара(ов)
        </h3>
        <h2>
          {cartSym.length ? cartSym.reduce((a, b) => a + b) : 0}
          {' '}
          руб.
        </h2>
        <button type="button">Перейти к оформлению</button>
        <button type="button" onClick={clearCartHandler}>Очистить корзину</button>
      </div>
    </div>
  )
}
