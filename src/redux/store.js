import { configureStore } from '@reduxjs/toolkit'
import { REDUX_LS_KEY } from './initState'
import { cartReducer } from './slices/cartSlice/cartSlice'
import { tokenReducer } from './slices/tokenSlice/tokenSlice'

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    cart: cartReducer,
  },
})

store.subscribe(() => {
  localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()))
})
