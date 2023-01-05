import { useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import { PRODUCTS } from '../../utils/constants'

import { Loader } from '../Loader/Loader'
import { ProductItem } from '../ProductItem/ProductItem'
import stylesIndex from './styles.module.scss'

export function Index() {
  const { token, api } = useProductContext()
  if (!token) return <Navigate to="/signin" />

  const getProductsFn = () => api.getProductsRequest().then((res) => res.json())
  const { data, isLoading } = useQuery({
    queryKey: PRODUCTS,
    queryFn: getProductsFn,
  })
  const id = '_id'

  if (isLoading) return <Loader />
  return (
    <div className={stylesIndex.wr}>
      {
        data.products.map((el) => <ProductItem key={el[id]} {...el} />)
      }
    </div>
  )
}
