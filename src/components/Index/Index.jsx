import { useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import { PRODUCTS } from '../../utils/constants'

import { Loader } from '../Loader/Loader'
import stylesIndex from './styles.module.scss'

export function Index() {
  const { token, api } = useProductContext()
  console.log({ token })
  if (!token) return <Navigate to="/signin" />

  const id = '_id'
  const getProductsFn = () => api.getProductsRequest().then((res) => res.json())
  const { data, isLoading } = useQuery({
    queryKey: PRODUCTS,
    queryFn: getProductsFn,
  })
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
  if (isLoading) return <Loader />
  return (
    <div className={stylesIndex.wr}>
      {
        data.products.map((el) => generateProductsCard(el))
      }
    </div>
  )
}
