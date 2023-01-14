import { useDispatch } from 'react-redux'
import {
  changeStatusSelected, decreaseCountCart, deleteItemCart, increaseCountCart,
} from '../../redux/slices/cartSlice/cartSlice'
import stylesIndex from './styles.module.scss'

export function CartItem({
  pictures, name, discount, price, stock, id, selected, counter,
}) {
  const dispatch = useDispatch()

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
  const discountFunc = (p, discont) => Math.round((p - p * discont * 0.01) / 100) * 100
  return (
    <div>
      <div>
        <div className={stylesIndex.card_container}>
          <div className={stylesIndex.chbx_wr}>
            <input onClick={changeStatusHandler} className={stylesIndex.chbx} type="checkbox" checked={selected} />
          </div>
          <div className={stylesIndex.imgWr}>
            <img className={stylesIndex.img} src={pictures} alt="" />
          </div>
          <div>
            <h4>{name}</h4>
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
              <button onClick={decreaseHandler} disabled={counter === 1} className={stylesIndex.btn_counter} type="button">-</button>
              <input className={stylesIndex.input} type="text" readOnly value={counter} />
              <button onClick={increaseHandler} disabled={counter === stock} className={stylesIndex.btn_counter} type="button">+</button>
            </div>
            <button onClick={deleteHandler} type="button">удалить</button>
          </div>
          <div className={discount ? stylesIndex.discount : 'hidden'}>
            -
            {discount}
            %
          </div>
        </div>
      </div>
    </div>
  )
}
