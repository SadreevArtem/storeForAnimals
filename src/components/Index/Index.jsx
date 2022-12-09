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
  console.log(products)
  useEffect(() => {
    api
      .getProducts()
      .then((result) => {
        setProducts(result.products)
      })
  }, [])

  const generateProductsCard = (el) => (
    <div>
      <div>
        <div className={stylesIndex.card_container}>
          <div>
            <img className={stylesIndex.img} src={el.pictures} alt="" />
          </div>
          <div>
            <h3>{el.name}</h3>
            <h4>
              {el.price}
              {' '}
              руб
            </h4>
            <p>{el.wight}</p>
          </div>
          <div className={stylesIndex.btn}>
            <button className={stylesIndex.card_button} type="button">Купить</button>
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
