import { useState } from 'react'

export const useFilter = () => {
  const [search, setSearch] = useState('')

  return { search, setSearch }
}
