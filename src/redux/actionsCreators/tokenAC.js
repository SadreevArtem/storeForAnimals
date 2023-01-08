import { ADD_TOKEN } from '../types/tokenTypes'

export const addTokenAC = (token) => ({
  type: ADD_TOKEN,
  payload: token,
})

export const getTokenAC = (input) => async (dispatch) => {
  const res = await fetch('https://api.react-learning.ru/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
  const token = await res.json()
  dispatch(addTokenAC(token.token))
}
