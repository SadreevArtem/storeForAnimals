/* eslint-disable default-param-last */
import {
  ADD_ITEM_CART, CHANGE_STATUS_SELECTED, CLEAR_ITEMS, DECREASE_COUNT_CART,
  DELETE_ITEM_CART, INCREASE_COUNT_CART,
} from '../types/cartTypes'

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM_CART:
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
    // return [action.payload, ...state]
    case CHANGE_STATUS_SELECTED:
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            selected: !item.selected,
          }
        }
        return item
      })
    case DELETE_ITEM_CART:
      return state.filter((item) => item.id !== action.payload)
    case INCREASE_COUNT_CART:
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            counter: item.counter + 1,
          }
        }
        return item
      })
    case DECREASE_COUNT_CART:
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            counter: item.counter - 1,
          }
        }
        return item
      })
    case CLEAR_ITEMS:
      return []

    default:
      return state
  }
}
