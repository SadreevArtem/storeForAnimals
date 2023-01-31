import stylesErrorPage from './styles.module.scss'

export function ErrorPage() {
  return (
    <div className={stylesErrorPage.wr}>
      <h1>Oops!</h1>
      <p>Мы любим мир где люди видят</p>
      <p>вещи, которых на самом деле нет.</p>
      <p>Но этой страницы действительно</p>
      <p>не существует.</p>
    </div>
  )
}
