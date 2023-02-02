import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { api } from '../../API/api'
import { REVIEWS } from '../../utils/constants'
import { Loader } from '../Loader/Loader'
import { ReviewItem } from '../ReviewItem/ReviewItem'
import stylesReviews from './styles.module.scss'

export function Reviews() {
  const { id } = useParams()
  const token = useSelector((store) => store.token.value)
  const idn = '_id'
  const getProductReviewFunc = () => api.getProductReview(id, token).then((res) => res.json())
  const { data, isLoading } = useQuery({
    queryKey: REVIEWS,
    queryFn: getProductReviewFunc,
  })

  if (isLoading) return <Loader />
  return (
    <div className={stylesReviews.wr}>
      {data.map((el) => <ReviewItem key={el[idn]} {...el} />)}
      <h2>Отзывы покупателей</h2>
    </div>
  )
}
