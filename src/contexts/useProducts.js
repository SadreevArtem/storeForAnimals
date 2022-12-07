/* eslint-disable linebreak-style */
/* eslint-disable quote-props */
import { useState } from 'react'

export function useProducts() {
  const [token, setToken] = useState('')

  const addToken = (response) => {
    setToken(response)
    console.log(token)
  }
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

    async getUserInfo() {
      const response = await fetch(`${this.baseUrl}/v2/sm8/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
        },
      })
      return response.json()
    }
  }

  const api = new API('https://api.react-learning.ru')
  return {
    // products,
    token,
    addToken,
    api,
  }
}
