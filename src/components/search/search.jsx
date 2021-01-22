import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import './search.css';

const SearchTodo = ({ saveTodo, handleShowDone, showDone }) => {

    return (
     <form >
      <div className="text">
        <Checkbox
          tabIndex={-1}  
          checked={showDone}
          onChange={handleShowDone}
          size="small"
          inputProps={{ 'aria-label': 'checkbox with small size' }}
        />
          <span className="search">Show done</span>
        <TextField
          variant="outlined"
          placeholder="Search..."
          margin="normal" 
          onChange={(e) => saveTodo(e.target.value)}
        />
       </div>
     </form>
  );
};

export default SearchTodo;
