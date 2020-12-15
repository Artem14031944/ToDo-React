import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './search.css';

const SearchTodo = ({ saveTodo }) => {
   const [value, setValue] = useState('');
    return (
    <form >
      <div className="text">
      <input type="checkbox" />
      <span className="search">Show done</span>
      <TextField
        variant="outlined"
        placeholder="Search..."
        margin="normal" 
        onChange={value}
        onKeyPress={setValue}
        />
      </div>
    </form>
  );
};
export default SearchTodo;
