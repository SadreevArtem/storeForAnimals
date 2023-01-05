import { combineReducers } from 'redux'
import { cartReducer } from './cartReducer'
import { tokenReducer } from './tokenReducer'

export const rootReducer = combineReducers({
  token: tokenReducer,
  cart: cartReducer,
})
