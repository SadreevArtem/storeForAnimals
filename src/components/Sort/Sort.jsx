import { Link } from 'react-router-dom'
import stylesSort from './styles.module.scss'

export function Sort() {
  return (
    <div className={stylesSort.wr}>
      <Link to="products/cheaper">
        <h4>По увеличению цены</h4>
      </Link>
      <Link to="products/discount">
        <h4>Товары со скидками</h4>
      </Link>
      <Link to="products/new">
        <h4>Новинки</h4>
      </Link>
    </div>
  )
}
