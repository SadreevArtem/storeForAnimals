import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import { Loader } from '../Loader/Loader'
import stylesProductDetail from './styles.module.scss'

export function ProductDetail() {
  const { id } = useParams()
  const { api } = useProductContext()
  console.log(id)
  const getProductFunc = () => api.getProductItem(id).then((res) => res.json())
  const { data, isLoading } = useQuery({
    queryKey: ['GET_QUERY_KEY'],
    queryFn: getProductFunc,
  })
  const discountFunc = (p, discont) => Math.round((p - p * discont * 0.01) / 100) * 100
  console.log(data)
  if (isLoading) return <Loader />
  return (
    <div className={stylesProductDetail.wr}>
      <div className={stylesProductDetail.ImgWr}>
        <img className={stylesProductDetail.img} src={data.pictures} alt="Image_item" />
      </div>
      <div className={stylesProductDetail.wrInfo}>
        <div className={stylesProductDetail.wrList}>
          <h2>{data.name}</h2>
          <h4 className={data.discount ? stylesProductDetail.discount_price : 'hidden'}>
            {data.price}
            {' '}
            ₽
          </h4>
          <h3 className={data.discount ? stylesProductDetail.redPrice : ''}>
            {data.discount ? discountFunc(data.price, data.discount) : data.price}
            {' '}
            ₽
          </h3>
          <h4>
            Вес
            {' '}
            {data.wight}
          </h4>
        </div>
        <div>
          <p className={stylesProductDetail.reviews}>
            Отзывы
            {' '}
            {`(${data.reviews.length})`}
          </p>
        </div>
      </div>
    </div>
  )
}
