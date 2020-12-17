import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import Typography  from '@material-ui/core/Typography';
import TodoForm from './components/todoForm/TodoForm';
import TodoList from './components/todoList/todoList';
import useTodoState from './components/useTodoState/useTodoState';
import SearchTodo from './components/search/search';
import CategoryList from './components/category/category';
import addCategories from './components/addCategories/addCategory';
import { addCategory, addTask, getCategories } from './actions';
import AddCategories from './components/addCategories/addCategory';
import { createStore } from 'redux';
import './styles.css';


const categories = [
  { id: 1, parentId: null, title: "Category 1", children: null},
  { id: 2, parentId: null, title: "Category 2", children: null},
  { id: 3, parentId: null, title: "Category 3", children: null},
];

const Tasks = () => {
  // useEffect(() => {
  //   dispatch(getCategories())
  // }, []);
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.categories);
  // console.log('categories', categories)
  // const { todos, addTodo, deleteTodo } = useTodoState(activeCategory);
  const [activeCategory, setActiveCategory] = useState('');


  // const [state, dispatch] = useReducer(reducer,JSON.parse(localStorage.getItem('todos'))); 
 
  // useEffect(()=> {
  //   localStorage.setItem('todos', JSON.stringify(state))
  //  }, [state])


  const addNewCategory = (data) => {
    const newCategory = { id: Date.now(), parentId: null, title: data, children: null}
    dispatch(addCategory(newCategory))
  }
  const addTodo = (data) => {
    const newTask = { id: Date.now(),  category: activeCategory, text: data}
    dispatch(addTask(newTask))
  }

  return (
    <div className="App">
      <div className="item-header">
       <Typography component="h1" variant="h2">
         To-Do List
       </Typography>
      </div>
      <div className="item-search">
       {/* <SearchTodo
        saveTodo={todoText => {
          const trimmedText = todoText.trim();
          if (trimmedText.length > 0) {
            searchTodo(trimmedText);}}} 
      /> */}
      </div>
      <div className="item-form">
        <div className = "category">
        <AddCategories
        saveTodo={todoText => {
          const trimmedText = todoText.trim();
          if (trimmedText.length > 0) {
            addNewCategory(trimmedText); }}} /> 
        <CategoryList
          categories={categories}
          parentId={null}  
          className='category' 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
        /> 
        </div>
        <div className="task">
          <div className="taskForm">
          <TodoForm
           saveTodo={todoText => {
            const trimmedText = todoText.trim();
            if (trimmedText.length > 0) {
              addTodo(trimmedText); }}} />
          </div>
        {/* <TodoList todos={todos} deleteTodo={deleteTodo} /> */}
        </div>
        </div>  
      </div>
  );
};

export default Tasks;


