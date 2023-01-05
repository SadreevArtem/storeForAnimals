import { useDispatch } from 'react-redux'
import { addItemCartAC } from '../../redux/actionsCreators/cartAC'
import stylesIndex from './styles.module.scss'

export function ProductItem({
  _id: id, pictures, name, discount, price, tags, wight,
}) {
  const dispatch = useDispatch()
  const addItemCartHandler = () => {
    dispatch(addItemCartAC(id, name, pictures, price, discount))
  }
  const discountFunc = (p, discont) => Math.round((p - p * discont * 0.01) / 100) * 100
  return (
    <div>
      <div>
        <div className={stylesIndex.card_container}>
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
            <p className={stylesIndex.p}>{wight}</p>
          </div>
          <div className={stylesIndex.btn}>
            <button onClick={() => addItemCartHandler(id, name, pictures, price, discount)} className={stylesIndex.card_button} type="button">в корзину</button>
          </div>
          <div className={discount ? stylesIndex.discount : 'hidden'}>
            -
            {discount}
            %
          </div>
          <div className={tags.includes('new') ? stylesIndex.newSticker : 'hidden'}>
            NEW
          </div>
        </div>
      </div>
    </div>
  )
}
