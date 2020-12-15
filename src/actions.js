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

export const editTask = () => ({
  type: constants.EDIT_TASK,
})

export const addTask = () => ({
  type: constants.ADD_TASK,
})

export const doneTask = () => ({
  type: constants.DONE_TASK,
})

export const sendTask = () => ({
  type: constants.SEND_TASK,
})

