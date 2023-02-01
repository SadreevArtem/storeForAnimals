import stylesSort from './styles.module.scss'

export function Sort({ setSort }) {
  return (
    <div className={stylesSort.sort_button}>
      <button type="button" onClick={() => setSort('')}>По умолчанию</button>
      <button type="button" onClick={() => setSort('cheap')}>Сначала дешевле</button>
      <button type="button" onClick={() => setSort('discount')}>Распродажа</button>
      <button type="button" onClick={() => setSort('new')}>Новинки</button>
    </div>
  )
}
