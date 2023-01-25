import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useProductContext } from '../../contexts/ProductsContextProvider'
import { REVIEWS } from '../../utils/constants'
import { Loader } from '../Loader/Loader'
import { ReviewItem } from '../ReviewItem/ReviewItem'
import stylesReviews from './styles.module.scss'

export function Reviews() {
  const { api } = useProductContext()
  const { id } = useParams()
  const getProductReviewFunc = () => api.getProductReview(id).then((res) => res.json())
  console.log(id)
  const { data, isLoading } = useQuery({
    queryKey: REVIEWS,
    queryFn: getProductReviewFunc,
  })
  console.log({ data })
  if (isLoading) return <Loader />

  return (
    <div className={stylesReviews.wr}>
      {data.map((el) => <ReviewItem key={el.id} {...el} />)}
    </div>
  )
}
