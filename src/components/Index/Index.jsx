import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import { PRODUCTS } from '../../utils/constants'
import { useFilterContextData } from '../../contexts/FilterContext/FilterContextProvider'
import { Loader } from '../Loader/Loader'
import { ProductItem } from '../ProductItem/ProductItem'
import stylesIndex from './styles.module.scss'
import { Sort } from '../Sort/Sort'

export const getProductsQueryKey = (filters, sort) => PRODUCTS
  .concat(Object.values(filters)).concat(sort)

export function Index() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState(() => searchParams.get('sort') ?? '')
  const filters = useFilterContextData()
  const token = useSelector((store) => store.token.value)
  const { api } = useProductContext()
  if (!token) return <Navigate to="/signin" />

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sort,
    })
  }, [sort])

  const getProductsFn = (filter) => api.getAllProducts(filter).then((res) => res.json())
  const { data, isLoading } = useQuery({
    queryKey: getProductsQueryKey(filters, sort),
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
  if (sort === '') {
    return (
      <>
        <Sort setSort={setSort} />
        <div className={stylesIndex.wr}>
          {
            data.map((el) => <ProductItem key={el[id]} {...el} />)
          }
        </div>
      </>
    )
  }
  if (sort === 'new') {
    return (
      <>
        <Sort setSort={setSort} />
        <div className={stylesIndex.wr}>
          {
            data.filter((el) => el.tags.includes('new')).map((el) => <ProductItem key={el[id]} {...el} />)
          }
        </div>
      </>
    )
  }
  if (sort === 'cheap') {
    return (
      <>
        <Sort setSort={setSort} />
        <div className={stylesIndex.wr}>
          {
            data
              .sort((a, b) => a.price - b.price)
              .map((el) => <ProductItem key={el[id]} {...el} />)
          }
        </div>
      </>
    )
  }
  if (sort === 'discount') {
    return (
      <>
        <Sort setSort={setSort} />
        <div className={stylesIndex.wr}>
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
  return <h2>Products</h2>
}
