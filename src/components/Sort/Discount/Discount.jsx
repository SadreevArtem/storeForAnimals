import { useQuery } from '@tanstack/react-query'
import { Link, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useProductContext } from '../../../contexts/ProductsContextProvider'
import { PRODUCTS } from '../../../utils/constants'
import { useFilterContextData } from '../../../contexts/FilterContext/FilterContextProvider'
import { Loader } from '../../Loader/Loader'
import { ProductItem } from '../../ProductItem/ProductItem'
import stylesDiscount from './styles.module.scss'

export const getProductsQueryKey = (filters) => PRODUCTS.concat(Object.values(filters))

export function Discount() {
  const filters = useFilterContextData()
  const token = useSelector((store) => store.token.value)
  const { api } = useProductContext()
  if (!token) return <Navigate to="/signin" />

  const getProductsFn = (filter) => api.getAllProducts(filter).then((res) => res.json())
  const { data, isLoading } = useQuery({
    queryKey: getProductsQueryKey(filters),
    queryFn: () => getProductsFn({
      query: filters.search,
    }),
  })
  const id = '_id'

  if (isLoading) return <Loader />
  if (!data.length) {
    return (
      <div>
        {/* <img src={img} alt="Dog" /> */}
        <h2>Странно, но ничего нет</h2>
        <p>К сожалению, по вашему запросу ничего не найдено. Попробуйте изменить запрос.</p>
      </div>
    )
  }
  console.log({ data })
  return (
    <>
      <div className={stylesDiscount.wr_btn}>
        <h2>Распродажа</h2>
        <Link to="/">
          <button type="button">Назад</button>
        </Link>
      </div>
      <div className={stylesDiscount.wr}>
        {
          data
            .filter((el) => el.discount !== 0)
            .sort((a, b) => b.discount - a.discount)
            .map((el) => <ProductItem key={el[id]} {...el} />)
        }
      </div>
    </>
  )
}
