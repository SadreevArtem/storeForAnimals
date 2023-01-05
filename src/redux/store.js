import { createStore } from 'redux'
import { getInitialState, REDUX_LS_KEY } from './initState'
import { rootReducer } from './reducers/rootReducer'

export const store = createStore(rootReducer, getInitialState())

store.subscribe(() => {
  localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()))
})
