import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState().cart,
  reducers: {
    addItemCart: {
      reducer(state, action) {
        if (!state.length
          || !state.some((el) => el.id === action.payload.id)) return [action.payload, ...state]
        return state.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              counter: item.counter + 1,
            }
          }
          return item
        })
      },
      prepare(id, name, pictures, price, discount, stock) {
        return {
          payload: {
            id,
            name,
            pictures,
            price,
            discount,
            stock,
            counter: 1,
            selected: true,
          },
        }
      },
    },
    changeStatusSelected(state, action) {
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            selected: !item.selected,
          }
        }
        return item
      })
    },
    deleteItemCart(state, action) {
      return state.filter((item) => item.id !== action.payload)
    },
    increaseCountCart(state, action) {
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            counter: item.counter + 1,
          }
        }
        return item
      })
    },
    decreaseCountCart(state, action) {
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            counter: item.counter - 1,
          }
        }
        return item
      })
    },
    changeAllSelectStatus(state) {
      if (state.every((el) => el.selected === true)) {
        return state.map((item) => ({
          ...item,
          selected: false,
        }))
      }
      return state.map((item) => ({
        ...item,
        selected: true,
      }))
    },
    clearCart() {
      return []
    },
  },
})

export const {
  clearCart, decreaseCountCart, increaseCountCart,
  deleteItemCart, changeStatusSelected, addItemCart, changeAllSelectStatus,
} = cartSlice.actions
export const cartReducer = cartSlice.reducer
