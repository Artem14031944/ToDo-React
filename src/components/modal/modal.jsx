import React,{ useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import { editTask } from '../../actions';
import { useDispatch } from 'react-redux';

export default function Modal({ todo, open, handleClose }) {
 

  const [value, setValue] = useState('');
  const [done, setDone] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    if (todo.text) {
      setValue(todo.text);
    }
    if (todo.done) {
      setDone(todo.done);
    }
  }, [todo.text, todo.done]);

  const handleSave = () => {
    const newTodo ={ ...todo, done: done, text: value}
    dispatch(editTask(newTodo));
    handleClose()
  }

  const handleCheckbox = (e) => {
  
    setDone(e.target.checked)
  }

  const handleText = (e) => {
    setValue(e.target.value)
  }

  return (
    <Dialog 
      open={open}  
      onClose={handleClose} 
      aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Task</DialogTitle>
         <DialogContent>
           <DialogContentText> 
            Come on, lead what you want to change or leave. 
           </DialogContentText>
            <TextField
              margin="dense"
              type="text"
              value={value}
              onChange={handleText}
              // //defaultValue={todo.text}
              />
             <DialogContentText 
               color = 'black'>
                <Checkbox 
                  tabIndex={-1} 
                  checked={done} 
                  onChange={handleCheckbox}
                />
              Done
             </DialogContentText>
            </DialogContent>
          <DialogActions>
        <Button 
          onClick={handleClose} 
          color="primary">
          Cancel
        </Button>
      <Button 
        onClick={() => handleSave()} 
        color="primary">
        Save Changes
      </Button>
     </DialogActions>
    </Dialog>
  );
}

