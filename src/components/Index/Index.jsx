/* eslint-disable linebreak-style */

import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import stylesIndex from './styles.module.scss'
// import stylesIndex from './styles.module.scss'

export function Index() {
  const tokenLS = localStorage.getItem('TOKEN') ? JSON.parse(localStorage.getItem('TOKEN')) : undefined
  if (!tokenLS) return <Navigate to="/signin" />
  const [products, setProducts] = useState([])
  const { api } = useProductContext()
  const id = '_id'
  useEffect(() => {
    api
      .getProducts()
      .then((result) => {
        setProducts(result.products)
      })
  }, [])

  const discountFunc = (price, discont) => Math.round((price - price * discont * 0.01) / 100) * 100

  const generateProductsCard = (el) => (
    <div key={el[id]}>
      <div>
        <div className={stylesIndex.card_container}>
          <div className={stylesIndex.imgWr}>
            <img className={stylesIndex.img} src={el.pictures} alt="" />
          </div>
          <div>
            <h4>{el.name}</h4>
            <h5 className={el.discount ? stylesIndex.discount_price : 'hidden'}>
              {el.price}
              ₽
            </h5>
            <h4 className={el.discount ? stylesIndex.redPrice : ''}>
              {el.discount ? discountFunc(el.price, el.discount) : el.price}
              {' '}
              ₽
            </h4>
            <p className={stylesIndex.p}>{el.wight}</p>
          </div>
          <div className={stylesIndex.btn}>
            <button className={stylesIndex.card_button} type="button">в корзину</button>
          </div>
          <div className={el.discount ? stylesIndex.discount : 'hidden'}>
            -
            {el.discount}
            %
          </div>
          <div className={el.tags.includes('new') ? stylesIndex.newSticker : 'hidden'}>
            NEW
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <div className={stylesIndex.wr}>
      {
        products.map((el) => generateProductsCard(el))
      }
    </div>
  )
}
