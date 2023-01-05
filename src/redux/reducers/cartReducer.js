/* eslint-disable default-param-last */
import { ADD_ITEM_CART, CLEAR_ITEMS } from '../types/cartTypes'

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM_CART:
      return [action.payload, ...state]
    case CLEAR_ITEMS:
      return []

    default:
      return state
  }
}
