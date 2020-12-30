import * as constants from './constants';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  categories: [
    { id: 1, parentId: null, title: "Category 1", children: null},
    { id: 2, parentId: null, title: "Category 2", children: null},
    { id: 3, parentId: null, title: "Category 3", children:  [
      { id: 11, parentId: null, title: "PodCategory 1", children: null},
      { id: 22, parentId: null, title: "PodCategory 2", children: null},
      { id: 33, parentId: null, title: "PodCategory 3", children: null},
    ]},
  ],
  podCategories:[],
  tasks: [
    { id: uuidv4(),  category: 1, text: 'data', done: false},
    { id: uuidv4(),  category: 1, text: 'task', done: false},
    { id: uuidv4(),  category: 1, text: 'fooo', done: false},
  ],
  searchText: '',
}

function toDoReducer(state = initialState, action)  {
  switch (action.type) {
    case constants.ADD_CATEGORY:
      return {
          ...state,
          categories: [...state.categories, action.data] 
      }
    case constants.DELETE_CATEGORY:
      return {
          ...state,
          categories: state.categories.filter(category => category.id !== action.data) 
      }
    case constants.EDIT_CATEGORY:
      const updatedItems = state.categories.map(item => {
        if (item.id === action.data.id) {
          item = action.data
        }
        return item
      })
      return {
          ...state,
          categories: [ ...updatedItems ]
      }

    //////Tasks
    
    case constants.ADD_TASK:
      return {
          ...state,
          tasks: [...state.tasks, action.data] 
      }
    case constants.EDIT_TASK:
        const updatedTasks = state.tasks.map(item => {
          if (item.id === action.data.id) {
            item = action.data
          }
          return item
        })
        return {
          ...state,
          tasks: [ ...updatedTasks ]
        }
   default:
    return state
  }
}

export default toDoReducer;
