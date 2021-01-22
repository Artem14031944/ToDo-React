import * as constants from './constants';

//////// Category

export function getCategories() {
  return {
    type: constants.GET_CATEGORIES,
  }
}

export const getTasksChildren = (data) => ({
    type: constants.GET_TASKS_CHILDREN,
    data,
  })

export const addCategory = (data) => {
  return ({
    type: constants.ADD_CATEGORY,
    data,}
  )
}

export const deleteCategory = (data) => ({
  type: constants.DELETE_CATEGORY,
  data,
})


export const editCategory = (data) => ({
  type: constants.EDIT_CATEGORY,
  data,
})

export const setActiveCategory = (data) => ({
  type: constants.SET_ACTIVE_CATEGORY,
  data,
})

export const addSubcategory = (data) => ({
  type: constants.ADD_SUBCATEGORY,
  data,
})

//////// Task

export const getTasks = () => ({
  type: constants.GET_TASKS,
})

export const setTasks = (data) => ({
  type: constants.SET_TASKS,
  data
})

export const getTasksCategory = (data) => ({
  type: constants.GET_TASKS_CATEGORY,
  data,
})

export const setBar = (data) => ({
  type: constants.SET_BAR,
  data,
})

export const editTask = (data) => ({
  type: constants.EDIT_TASK,
  data
})

export const addTask = (data) => ({
  type: constants.ADD_TASK,
  data
})

export const doneTask = (data) => ({
  type: constants.DONE_TASK,
  data
})

export const sendTask = (data) => ({
  type: constants.SEND_TASK,
  data
})

//////// Search 

export const getSearch = (data) => ({
  type: constants.GET_SEARCH,
  data
})

export const getDoneSearch = (data) => ({
  type: constants.GET_DONE_SEARCH,
  data
})

export const allTasksSearch = (data) => ({
  type: constants.ALL_TASKS_SEARCH,
  data
})

