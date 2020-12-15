import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Tasks from './Tasks'
import './styles.css';
import configureStore from './configureStore'

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
