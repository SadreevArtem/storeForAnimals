import { Link } from 'react-router-dom'
import img from './2527488.png'
import stylesCart from './styles.module.scss'

export function Cart() {
  return (
    <div className={stylesCart.login}>
      <img src={img} alt="Dog" />
      <h2>Корзина пуста</h2>
      <p>Посмотрите предложения на главной странице или воспользуйтесь поиском</p>
      <Link to="/">
        <button type="button">на главную</button>
      </Link>
    </div>
  )
}
