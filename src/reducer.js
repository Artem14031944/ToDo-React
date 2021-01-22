import * as constants from './constants';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  categories: [
    { id: 1, parentId: null, title: "Category 1", children: null},
    { id: 2, parentId: null, title: "Category 2", children: null},
    { id: 3, parentId: null, title: "Category 3", children:  [
      { id: 11, parentId: null, title: "SubCategory 1", children: null},
      { id: 22, parentId: null, title: "SubCategory 2", children: null},
      { id: 33, parentId: null, title: "SubCategory 3", children: null},
    ]},
   ],
  podCategories:[],
  tasks: [
    { id: uuidv4(),  category: 1, text: 'data', done: false},
    { id: uuidv4(),  category: 1, text: 'task', done: false},
    { id: uuidv4(),  category: 1, text: 'foo', done: false},
    { id: uuidv4(),  category: 2, text: 'fin', done: false},
    { id: uuidv4(),  category: 2, text: 'panda', done: false},
    { id: uuidv4(),  category: 2, text: 'volvo', done: false},
    { id: uuidv4(),  category: 3, text: 'zoo', done: false},
    { id: uuidv4(),  category: 3, text: 'this', done: false},
    { id: uuidv4(),  category: 3, text: 'the move', done: false},
    { id: uuidv4(),  category: 11, text: 'sub-1', done: false},
    { id: uuidv4(),  category: 22, text: 'sub-2', done: false},
    { id: uuidv4(),  category: 33, text: 'sub-3', done: false},
   ],
  searchText: '',
  activeCategory:'',
  progress:'',
}

function toDoReducer(state = initialState, action)  {
  switch (action.type) {
    case constants.ADD_CATEGORY:
      return {
        ...state,
        categories: [ ...state.categories, action.data ] 
      }
    case constants.ADD_SUBCATEGORY:
      const category2 = state.categories.find(item  => item.id === action.data.id)
      let newCategory = {}
      if(category2.children === null) {
        newCategory  = { ... category2, children: [ action.data.subId] }
      } else {
        newCategory  = { ... category2, children: [ ...category2.children, action.data.subId] }
      } console.log(newCategory, 'new')
      const categories = state.categories.filter(item => item.id !== category2.id)
        return {
          ...state,
          categories: [ ...categories, newCategory ] 
        }
    case constants.SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.data 
      }
    case constants.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.data) 
      }
    case constants.GET_TASKS_CHILDREN:
      const parseTask = JSON.parse(localStorage.getItem('todos'));
      const category = state.categories.find(item => item.id === action.data)
      const newChildren = []
      category.children.forEach(subcategory => {
        const subcategoryTasks = parseTask.filter(item => item.category === subcategory.id)
        newChildren.push(...subcategoryTasks)
      });
      return {
        ...state,
        tasks: [ ...newChildren ]
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
        tasks: [ ...state.tasks, action.data ] 
      }
    // case constants.GET_TASKS_CATEGORY:
    //     const parse = JSON.parse(localStorage.getItem('todos'));
    //     const getCategoriesOne = parse.filter(item => item.category === action.data)
    //       return {
    //           ...state,
    //           tasks: [ ...getCategoriesOne ] 
    //       }
    case constants.SET_TASKS:
      return {
        ...state,
        tasks: action.data   
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
    case constants.GET_SEARCH:  
      return {
        ...state,
        searchText: action.data
      }
    case constants.GET_DONE_SEARCH:
      const newDoneTasks = state.tasks.filter(item => item.done).filter(item => item.text.toLowerCase().includes(action.data.toLowerCase())) 
        return {
          ...state,
          tasks: [ ...newDoneTasks ]
        }
    case constants.ALL_TASKS_SEARCH:
      const allTasks = JSON.parse(localStorage.getItem('todos'))  
        return {
          ...state,
          tasks: [ ...allTasks ]
        }
    case constants.SET_BAR:
      return {
        ...state,
        progress: action.data  
      }
     default:
      return state
  }
}

export default toDoReducer;
