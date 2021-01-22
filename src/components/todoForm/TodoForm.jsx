import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button  from '@material-ui/core/Button';
import { setActiveCategory } from '../../actions';
import './style.css';

const TodoForm = ({ saveTodo }) => {

   const dispatch = useDispatch();
   const [value, setValue] = useState('');
 
   const onClickBtnAll = () => {  
    dispatch(setActiveCategory(0))
  };
   
    return (
    <form 
      onSubmit={event => {
        event.preventDefault();
        saveTodo(value);
        setValue('');
      }}
    >
      <div className="text">
        <div className="blockBtn">
          <Button 
           variant="contained" 
           color="secondary" 
           className='btnAll'
           onClick={onClickBtnAll}
           >
            All Tasks
          </Button>
        </div>
         <TextField
           variant="outlined"
           placeholder="Task Add"
           margin="normal" 
           onChange={event => {
             setValue(event.target.value);
           }}
           value={value}
        />
       </div>
    </form>
  );
};

export default TodoForm;
