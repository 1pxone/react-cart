import React from 'react';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import ReactDOM from 'react-dom';
import './index.css';
import Cart from './containers/Cart';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore'

const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <Cart />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
