/* eslint-disable class-methods-use-this */
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

  class API {
    constructor(baseUrl) {
      this.baseUrl = baseUrl
    }

    signUpRequest = (input) => fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })

    getProductsRequest = () => fetch(
      `${this.baseUrl}/products`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      },
    )

    getAllProducts = (filters) => fetch(
      `${this.baseUrl}/products/search?${new URLSearchParams(filters).toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      },
    )

    updateUserRequest = (input) => fetch(`${this.baseUrl}/v2/sm8/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token} `,
      },
      body: JSON.stringify(input),
    })

    signInRequest = (input) => fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })

    getInfoUser = () => fetch(`${this.baseUrl}/v2/sm8/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token} `,
      },
    })

    getProductsByIds(ids) {
      return Promise.all(ids.map((id) => fetch(`https://api.react-learning.ru/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token} `,
        },
      }).then((res) => res.json())))
    }
  }

  const api = new API('https://api.react-learning.ru')
  return {
    token,
    setToken,
    api,
  }
}
