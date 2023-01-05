import stylesIndex from './styles.module.scss'

export function CartItem({
  pictures, name, discount, price, counter,
}) {
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
          </div>
          <div className={stylesIndex.btn}>
            <input type="number" value={counter} />
            <button type="button">удалить</button>
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
