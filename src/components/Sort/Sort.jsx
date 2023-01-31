import stylesSort from './styles.module.scss'

export function Sort({ setSort }) {
  return (
    <div className={stylesSort.sort_button}>
      <button
        type="button"
        onClick={() => {
          setSort('')
        }}
      >
        По умолчанию
      </button>
      <button type="button" onClick={() => setSort('cheap')}>По увеличению цены</button>
      <button type="button" onClick={() => setSort('discount')}>Товары со скидками</button>
      <button type="button" onClick={() => setSort('new')}>Новинки</button>
    </div>
  )
}
