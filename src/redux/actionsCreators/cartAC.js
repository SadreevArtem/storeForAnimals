import {
  ADD_ITEM_CART, CLEAR_ITEMS, DECREASE_COUNT_CART, DELETE_ITEM_CART, INCREASE_COUNT_CART,
} from '../types/cartTypes'

export const addItemCartAC = (id, name, pictures, price, discount, stock) => ({
  type: ADD_ITEM_CART,
  payload: {
    id,
    name,
    pictures,
    price,
    discount,
    stock,
    counter: 1,
  },
})
export const increaseItemCartAC = (id) => ({
  type: INCREASE_COUNT_CART,
  payload: id,
})
export const decreaseItemCartAC = (id) => ({
  type: DECREASE_COUNT_CART,
  payload: id,
})

export const deleteItemCartAC = (id) => ({
  type: DELETE_ITEM_CART,
  payload: id,
})

export const clearCartAC = () => ({
  type: CLEAR_ITEMS,
})
