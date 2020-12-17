import { createStore } from 'redux';
import toDoReducer from './reducer';


export default function configureStore(preloadedState) {
  const store = createStore(toDoReducer, preloadedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  return store
}

