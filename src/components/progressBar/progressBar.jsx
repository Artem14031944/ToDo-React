import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';


export default function ProgressBar({ progress }) {
  return (
    <div styles={{width: '100%'}}>
      <LinearProgress variant="determinate"  value={progress} />
    </div>
  );
};
