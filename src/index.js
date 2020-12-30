import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Tasks from './ToDo-List';
import configureStore from './configureStore';
import './styles.css';

const store = configureStore()

const App = () => {

  return (
    <Provider store={store}>
      <Tasks />
    </Provider>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(
    <App />
, rootElement);
