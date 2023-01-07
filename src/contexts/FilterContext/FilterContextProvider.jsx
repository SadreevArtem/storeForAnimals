import { createContext, useContext, useMemo } from 'react'
import { useFilter } from './useFilter'

const FilterContext = createContext()
const FilterContextMethods = createContext()

export function FilterContextProvider({ children }) {
  const { search, setSearch } = useFilter()

  const filterContextData = useMemo(() => ({
    search,
  }), [search])

  const filterContextMethods = useMemo(() => ({
    setSearch,
  }), [setSearch])

  return (
    <FilterContext.Provider value={filterContextData}>
      <FilterContextMethods.Provider value={filterContextMethods}>
        {children}
      </FilterContextMethods.Provider>
    </FilterContext.Provider>

  )
}

export const useFilterContextData = () => useContext(FilterContext)
export const useFilterContextMethods = () => useContext(FilterContextMethods)
