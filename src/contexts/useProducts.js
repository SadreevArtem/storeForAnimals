/* eslint-disable quote-props */

import { useEffect, useState } from 'react'
import { TOKEN_LS } from '../utils/constants'

export function useProducts() {
  const [token, setToken] = useState('')
  useEffect(() => {
    const tokenFromLS = localStorage.getItem(TOKEN_LS)
    const prepareToken = tokenFromLS ? JSON.parse(tokenFromLS) : ''
    if (prepareToken.length) {
      setToken(prepareToken)
    }
  }, [])
  useEffect(() => {
    window.localStorage.setItem(TOKEN_LS, JSON.stringify(token))
  }, [token])

  // const [products, setProducts] = useState([])
  class API {
    constructor(baseUrl) {
      this.baseUrl = baseUrl
    }

    async signUp(input) {
      const response = await fetch(`${this.baseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })
      return response.json()
    }

    async logIn(input) {
      const response = await fetch(`${this.baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })
      return response.json()
    }

    async getProducts(t) {
      try {
        const response = await fetch(`${this.baseUrl}/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${t}`,
          },
        })
        return response.json()
      } catch (error) {
        throw new Error(error)
      }
    }
  }

  const api = new API('https://api.react-learning.ru')
  return {
    token,
    setToken,
    api,
  }
}
