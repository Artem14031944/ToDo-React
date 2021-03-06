import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography  from '@material-ui/core/Typography';
import TodoForm from './components/todoForm/todoForm';
import TodoList from './components/todoList/todoList';
import SearchTodo from './components/search/search';
import CategoryList from './components/category/category';
import { addCategory, addTask, editTask, getCategories, getSearch, setShowDone } from './actions';
import AddCategories from './components/addCategories/addCategory';
import Switches from './components/switch/switch';
import ProgressBar from './components/progressBar/progressBar';
import { v4 as uuidv4 } from 'uuid';
import Modal from './components/modal/modal';
import { Scrollbars } from 'react-custom-scrollbars';
import './styles.css';


const Tasks = () => {
 
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.categories);
  const progress = useSelector((state) => {
    const tasks = state.tasks;
    const doneTasks = state.tasks.filter(item => item.done === true);
    const answer = doneTasks.length / tasks.length * 100
    return answer
  });
  
  const todos = useSelector((state) => {
     if (state.searchText === '') {
       if(state.activeCategory !== '') {
        const categoryChildren = state.categories.filter(item => item.parentId ===  state.activeCategory)
        if(categoryChildren && categoryChildren.length > 0) {
          const newChildren = []
          categoryChildren.forEach(subcategory => {
            const subcategoryTasks = state.tasks.filter(item => item.category === subcategory.id)
            newChildren.push(...subcategoryTasks)
          });
          return newChildren
        } else {
          const getCategoriesOne = state.tasks.filter(item => item.category === state.activeCategory)
          return getCategoriesOne
        }
       }
       return state.tasks
     } else {
       if(state.showDone) {
        const newDoneTasks = state.tasks.filter(item => item.done).filter(item => item.text.toLowerCase().includes(state.searchText.toLowerCase()))
        return newDoneTasks
       } else {
        return state.tasks.filter(item => item.text.toLowerCase().includes(state.searchText.toLowerCase()))
       }
       
     }});
  const activeCategory = useSelector((state) => state.activeCategory);
  const showDone = useSelector((state) => state.showDone);
  const search = useSelector((state) => state.searchText);
  const [open, setOpen] = useState(false);
  const [activeTodo, setActiveTodo] = useState('');

  useEffect(() => {
    dispatch(getCategories())
  }, [categories]);
  
  const searchTodo = data => {
    dispatch(getSearch(data))
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
    const newTask = { id: uuidv4(), category: activeCategory, text: data, done: false}
    dispatch(addTask(newTask))
    const parse = JSON.parse(localStorage.getItem('todos'));
    const newItems = [...parse, newTask];
    localStorage.setItem('todos', JSON.stringify(newItems));
  };
  
  return (
    // <Scrollbars 
    //   style={{ width: '100%', height: 750, }}
    //   renderTrackVertical={props => <div {...props} className="track-vertical"/>}
    //   renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
    //   >
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
          handleShowDone={() => dispatch(setShowDone())}
          search={search}   
          saveTodo={todoText => {
            const addText = todoText.trim();
              searchTodo(addText);}}
        />
       </div>
         <ProgressBar
          progress={progress}
           />
          <div className="item-form">
            <div className = "category">
              <AddCategories
                saveTodo={cateText => {
                  const trimmedText = cateText.trim();
                if (trimmedText.length > 0) {
                  addNewCategory(trimmedText);}}}
               /> 
                <Scrollbars 
                  style={{ width: '100%', height: 440, }}
                  renderTrackVertical={props => <div {...props} className="track-vertical"/>}
                  renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
                  >
                  <CategoryList
                    categories={categories}
                    parentId={null}  
                    className='category' 
                    activeCategory={activeCategory}
                  /> 
                </Scrollbars>
            </div>
               <div className="task">
                <div className="taskForm">
                  <TodoForm
                    saveTodo={todoText => {
                      const trimmedText = todoText.trim();
                      if (trimmedText.length > 0) {
                      addTodo(trimmedText);}}}
                  />
               </div>
                <Scrollbars 
                  style={{ width: '100%', height: 440, }}
                  renderTrackVertical={props => <div {...props} className="track-vertical"/>}
                  renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
                  >
                  <TodoList 
                    todos={todos} 
                    handleCheckbox={handleCheckbox} 
                    handleEd={handleEd}
                  />
                </Scrollbars>
            <Modal 
              open={open} 
              handleClose={() => handleClose()} 
              todo={activeTodo} 
            />
         </div>
        </div>  
      </div>
    // </Scrollbars>
  );
};

export default Tasks;
