import { createStore } from 'redux'

import toDoReducer from './reducer'

export default function configureStore(preloadedState) {
  const store = createStore(toDoReducer, preloadedState)
  return store
}
