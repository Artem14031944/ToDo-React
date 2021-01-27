import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Tasks from './ToDo-List';
import configureStore from './configureStore';
import './styles.css';
import Layout from './components/switch/layout';

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
  <Layout>
    <App />
  </Layout>
, rootElement);
