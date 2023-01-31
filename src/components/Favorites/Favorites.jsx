import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { api } from '../../API/api'
import { FavoritesItem } from '../FavoritesItem/FavoritesItem'
import { Loader } from '../Loader/Loader'
import stylesFavorites from './styles.module.scss'

export function Favorites() {
  const favorites = useSelector((store) => store.favorites)
  const token = useSelector((store) => store.token.value)
  const getFavoritesItemsQueryKey = (cartItemsId) => ['vavorites'].concat(cartItemsId)
  const {
    data: products, isLoading, isError,
  } = useQuery({
    queryKey: getFavoritesItemsQueryKey(favorites.map((product) => product)),
    queryFn: () => api.getProductsByIds(favorites.map((product) => product), token),
  })
  const idn = '_id'
  if (isLoading) return <Loader />
  if (isError) return <div>Error</div>
  if (!favorites.length) {
    return (
      <div className={stylesFavorites.login}>
        <h2>Избраных товаров нет</h2>
        <p>Посмотрите предложения на главной странице или воспользуйтесь поиском</p>
        <Link to="/">
          <button type="button">на главную</button>
        </Link>
      </div>
    )
  }

  return (

    <div className={stylesFavorites.wr}>
      <div>
        <h2>Избраные товары</h2>
        <div className={stylesFavorites.wr_aside}>
          {
        products.map((el) => <FavoritesItem key={el[idn]} {...el} />)
        }
        </div>
      </div>
    </div>
  )
}
