import { ADD_ITEM_CART, CLEAR_ITEMS } from '../types/cartTypes'

export const addItemCartAC = (id, name, pictures, price, discount) => ({
  type: ADD_ITEM_CART,
  payload: {
    id,
    name,
    pictures,
    price,
    discount,
    counter: 1,
  },
})

export const clearCartAC = () => ({
  type: CLEAR_ITEMS,
})
