import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import Typography  from '@material-ui/core/Typography';
import TodoForm from './components/todoForm/TodoForm';
import TodoList from './components/todoList/todoList';
import SearchTodo from './components/search/search';
import CategoryList from './components/category/category';
import addCategories from './components/addCategories/addCategory';
import { addCategory, addTask, editTask, getCategories } from './actions';
import AddCategories from './components/addCategories/addCategory';
import Switches from './components/switch/switch';
import { createStore } from 'redux';
import ProgressBar from './components/progressBar/progressBar';
import { v4 as uuidv4 } from 'uuid';
import Modal from './components/modal/modal';
import './styles.css';


const Tasks = () => {
  useEffect(() => {
    dispatch(getCategories())
  }, [todos]);

  const dispatch = useDispatch()
  const categories = useSelector((state) => state.categories);
  const todos = useSelector((state) => state.tasks);
  // const todos = useSelector((state) => state.tasks.filter(item => item.text.toLowerCase().includes(state.searchText && state.searchText.toLowerCase())));
  const search = useSelector((state) => state.searchText);
  const [activeCategory, setActiveCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [activeTodo, setActiveTodo] = useState('');
  const [renderTodos, setRenderTodos] = useState(todos);
  const [showDone, setShowDone] = useState(false);



  // const [state, dispatch] = useReducer(reducer,JSON.parse(localStorage.getItem('todos'))); 
 
  // useEffect(()=> {
  //   localStorage.setItem('todos', JSON.stringify(state))
  //  }, [state])

  const searchTodo = (data) => {
    if(data.length > 0) {
      if(showDone)  {
        const newTasks = todos.filter(item => item.done).filter(item => item.text.toLowerCase().includes(data.toLowerCase()))
          setRenderTodos(newTasks)
      } else {
        const newTasks = todos.filter(item => item.text.toLowerCase().includes(data.toLowerCase()))
        setRenderTodos(newTasks)
      }
    } else {
      setRenderTodos(todos)
    }
  };

  const handleClose = () => {
    setOpen(false)
  };

  const handleEd = (data) => {
    setOpen(true)
    setActiveTodo(data)
  };

  const handleCheckbox = (val, todo) => {
    const newTodo ={ ...todo, done: val}
    dispatch(editTask(newTodo))
  };

  const addNewCategory = (data) => {
    const newCategory = { id: uuidv4(), parentId: null, title: data, children: null}
    dispatch(addCategory(newCategory))
  };

  const addTodo = (data) => {
    const newTask = { id: uuidv4(),  category: activeCategory, text: data, done: false}
    dispatch(addTask(newTask))
  };

  return (
    <div className="App">
      <div className="item-header">
      <Switches />
       <Typography component="h1" variant="h2">
         To-Do List
       </Typography>
      </div>
       <div className="item-search">
        <SearchTodo
          showDone={showDone}
          handleShowDone={() => setShowDone(!showDone)}
          search={search}   
          saveTodo={todoText => {
            const trimmedText = todoText.trim();
            if (trimmedText.length > 0) {
              searchTodo(trimmedText);}}} 
        />
       </div>
         <ProgressBar todos={todos} />
          <div className="item-form">
            <div className = "category">
              <AddCategories
                saveTodo={todoText => {
                  const trimmedText = todoText.trim();
                if (trimmedText.length > 0) {
                  addNewCategory(trimmedText);}}} /> 
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
                      addTodo(trimmedText);}}} />
               </div>
              <TodoList 
                todos={renderTodos} 
                handleCheckbox={handleCheckbox} 
                handleEd={handleEd}/>
            <Modal 
              open={open} 
              handleClose={() => handleClose()} 
              todo={activeTodo} />
         </div>
        </div>  
      </div>
  );
};

export default Tasks;
