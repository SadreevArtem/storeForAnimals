class API {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl
    this.token = token
  }

  signUpRequest = (input) => fetch(`${this.baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

  getProductsRequest = (token) => fetch(
    `${this.baseUrl}/products`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    },
  )

  getProductItem = (id, token) => fetch(
    `${this.baseUrl}/products/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    },
  )

  getProductReview = (id, token) => fetch(
    `${this.baseUrl}/products/review/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    },
  )

  getAllProducts = (filters, token) => fetch(
    `${this.baseUrl}/products/search?${new URLSearchParams(filters).toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    },
  )

  updateUserRequest = (input, token) => fetch(`${this.baseUrl}/v2/sm8/users/me`, {
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

  addProductRequest = (input, token) => fetch(`${this.baseUrl}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token} `,
    },
    body: JSON.stringify(input),
  })

  getInfoUser = (token) => fetch(`${this.baseUrl}/v2/sm8/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })

  getProductsByIds(ids, token) {
    return Promise.all(ids.map((id) => fetch(`${this.baseUrl}/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token} `,
      },
    }).then((res) => res.json())))
  }
}

export const api = new API('https://api.react-learning.ru')
