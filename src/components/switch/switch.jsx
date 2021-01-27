import React from 'react';
import Switch from '@material-ui/core/Switch';
import './switchStyle.css'

export default function Switches() {
  return (
    <div>
     <Switch
      className="switch"
      inputProps={{ 'aria-label': 'primary checkbox' }}
      checked={window.localStorage.getItem('theme') === 'dark'}
      onChange={()=> {
        if(window.localStorage.getItem('theme') === 'dark') {
            window.localStorage.setItem('theme', 'light')
            window.location.reload()
        } else {
            window.localStorage.setItem('theme', 'dark')
            window.location.reload()
        }
      }} />      
    </div>
  );
}



