import { NavLink } from 'react-router-dom'
import stylesFavoritesItem from './styles.module.scss'

export function FavoritesItem({
  pictures, name, discount, price, _id: id,
}) {
  const discountFunc = (p, discont) => Math.round((p - p * discont * 0.01) / 100) * 100
  return (
    <div>
      <div>
        <div className={stylesFavoritesItem.card_container}>
          <NavLink to={`../products/${id}`}>
            <div className={stylesFavoritesItem.imgWr}>
              <img className={stylesFavoritesItem.img} src={pictures} alt="" />
            </div>
          </NavLink>
          <div>
            <h4>{name}</h4>
            <h5 className={discount ? stylesFavoritesItem.discount_price : 'hidden'}>
              {price}
              ₽
            </h5>
            <h4 className={discount ? stylesFavoritesItem.redPrice : ''}>
              {discount ? discountFunc(price, discount) : price}
              {' '}
              ₽
            </h4>
          </div>
          <div className={stylesFavoritesItem.btn}>
            <button type="button">удалить</button>
          </div>
          <div className={discount ? stylesFavoritesItem.discount : 'hidden'}>
            -
            {discount}
            %
          </div>
        </div>
      </div>
    </div>
  )
}
