import { useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import { PRODUCTS } from '../../utils/constants'
import { useFilterContextData } from '../../contexts/FilterContext/FilterContextProvider'
import { Loader } from '../Loader/Loader'
import { ProductItem } from '../ProductItem/ProductItem'
import stylesIndex from './styles.module.scss'

export const getProductsQueryKey = (filters) => PRODUCTS.concat(Object.values(filters))

export function Index() {
  const filters = useFilterContextData()
  const { token, api } = useProductContext()
  if (!token) return <Navigate to="/signin" />
  console.log(token)
  console.log(filters)
  const getProductsFn = (filter) => api.getAllProducts(filter).then((res) => res.json())
  const { data, isLoading } = useQuery({
    queryKey: getProductsQueryKey(filters),
    queryFn: () => getProductsFn({
      query: filters.search,
    }),
  })
  const id = '_id'
  console.log(data)

  if (isLoading) return <Loader />
  return (
    <div className={stylesIndex.wr}>
      {
        data.map((el) => <ProductItem key={el[id]} {...el} />)
      }
    </div>
  )
}
