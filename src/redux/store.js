import { configureStore } from '@reduxjs/toolkit'
import { REDUX_LS_KEY } from './initState'
import { cartReducer } from './slices/cartSlice/cartSlice'
import { favoritesReducer } from './slices/favoritesSlice/favoritesSlice'
import { tokenReducer } from './slices/tokenSlice/tokenSlice'

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
})

store.subscribe(() => {
  localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()))
})
