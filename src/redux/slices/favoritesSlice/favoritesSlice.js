import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: getInitialState().favorites,
  reducers: {
    addItemFavorites: {
      reducer(state, action) {
        if (state.some((el) => el === action.payload)) {
          return state.filter((el) => el !== action.payload)
        }
        return [...state, action.payload]
      },
    },
    clearFavorites() {
      return []
    },
  },
})

export const { addItemFavorites, clearFavorites } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer
