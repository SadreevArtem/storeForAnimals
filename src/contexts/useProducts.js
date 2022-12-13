/* eslint-disable linebreak-style */
/* eslint-disable quote-props */

export function useProducts() {
  const tokenLS = localStorage.getItem('TOKEN') ? JSON.parse(localStorage.getItem('TOKEN')) : undefined

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

    async getUserInfo(token) {
      const response = await fetch(`${this.baseUrl}/v2/sm8/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
        },
      })
      return response.json()
    }

    async getProducts(token) {
      try {
        const response = await fetch(`${this.baseUrl}/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
        })
        return response.json()
      } catch (error) {
        throw new Error(error)
      }
    }

    async updateUserInfo(input) {
      const response = await fetch(`${this.baseUrl}/v2/sm8/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${tokenLS}`,
        },
        body: JSON.stringify(input),
      })
      return response.json()
    }
  }

  const api = new API('https://api.react-learning.ru')
  return {
    // products,
    api,
  }
}
