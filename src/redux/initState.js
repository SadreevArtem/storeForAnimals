export const REDUX_LS_KEY = 'REDUX_LS_KEY'

export const initialState = {
  token: {
    value: '',
  },
  cart: [],
}
console.log({ initialState })
export const getInitialState = () => {
  const stateLS = localStorage.getItem(REDUX_LS_KEY)
  return stateLS ? JSON.parse(stateLS) : initialState
}
console.log(getInitialState())
