import * as constants from './constants';

const initialState = {
  categories: [
    { id: 1, parentId: null, title: "Category 1", children: null},
    { id: 2, parentId: null, title: "Category 2", children: null},
    { id: 3, parentId: null, title: "Category 3", children: null},
  ],
  tasks: []
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
   default:
    return state
  }
}

export default toDoReducer;
