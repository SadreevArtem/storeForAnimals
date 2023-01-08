/* eslint-disable default-param-last */
import { ADD_TOKEN, REMOVE_TOKEN } from '../types/tokenTypes'

export const tokenReducer = (state = '', action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return action.payload
    case REMOVE_TOKEN:
      return ''

    default:
      return state
  }
}
