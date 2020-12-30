import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


export default function ProgressBar({todos}) {
  let progress = 0
  let counter = 0
   for(let i = 0; i < todos.length; i++){
    if(todos[i].done === true) {
      counter++;
    }}
   progress = counter / todos.length * 100;

  return (
    <div styles={{width: '100%'}}>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
}
