import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const TodoList = ({ todos, handleCheckbox, handleEd }) => {
  const handleChange = (e, todo) => {
    const checked = e.target.checked
    handleCheckbox(checked, todo)
  };

  return(
   <List>
    {todos.map((todo, index) => (
      <ListItem key={index.toString()} dense button>
        <Checkbox 
          tabIndex={-1}  
          checked={todo.done}
          onChange={(e) => handleChange(e, todo)}
        />
         <ListItemText primary={todo.text} />
           <ListItemSecondaryAction>
            <IconButton
              aria-label="Edit" 
              onClick={() => handleEd(todo)} >
          <EditIcon />
        </IconButton>
       </ListItemSecondaryAction>
     </ListItem>
    ))}
  </List>
)};

export default TodoList;
