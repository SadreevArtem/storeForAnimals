import { ADD_TOKEN } from '../types/tokenTypes'

/* eslint-disable default-param-last */
export const tokenReducer = (state = '', action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return [action.payload, ...state]

    default:
      return state
  }
}
