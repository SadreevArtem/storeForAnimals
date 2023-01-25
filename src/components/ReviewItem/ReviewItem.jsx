import stylesReviewsItem from './styles.module.scss'

export function ReviewItem({
  author, created_at: date, rating, text,
}) {
  return (
    <div className={stylesReviewsItem.wr}>
      <div className={stylesReviewsItem.aboutUser}>
        <img className={stylesReviewsItem.img} src={author.avatar} alt="avatar" />
        <h3 className={stylesReviewsItem.authorName}>{author.name}</h3>
        <h4 className={stylesReviewsItem.date}>{date.slice(0, 10)}</h4>
      </div>
      <div className={stylesReviewsItem.reviewsBody}>
        <h3>
          Общая оценка:
          {' '}
          {rating}
        </h3>
        <h3>Комментарий</h3>
        <p>{text}</p>
      </div>
    </div>
  )
}
