import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFilterContextMethods } from '../../contexts/FilterContext/FilterContextProvider'
import { useDebounce } from '../../hooks/useDebounce'
import stylesSearch from './styles.module.scss'

export function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [input, setInput] = useState(() => searchParams.get('query') ?? '')
  const { setSearch } = useFilterContextMethods()
  const debounceValue = useDebounce(input, 500)

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      query: input,
    })
  }, [input])

  useEffect(() => {
    setSearch(debounceValue)
  }, [debounceValue])

  return (
    <form action="">
      <div>
        <input className={stylesSearch.input} type="search" placeholder="🔎 Search..." value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
    </form>
  )
}
