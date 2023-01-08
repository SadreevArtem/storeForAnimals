import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { getInitialState, REDUX_LS_KEY } from './initState'
import { rootReducer } from './reducers/rootReducer'

export const store = createStore(rootReducer, getInitialState(), composeWithDevTools(
  applyMiddleware(thunk),
))

store.subscribe(() => {
  localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()))
})
