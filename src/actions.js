import * as constants from './constants';

//////// Category

export function getCategories() {
  return {
    type: constants.GET_CATEGORIES,
  }
}

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

export const addSubcategory = (data) => ({
  type: constants.ADD_SUBCATEGORY,
  data,
})

//////// Task

export const getTasks = () => ({
  type: constants.GET_TASKS,
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

