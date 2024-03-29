// react index file

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'

// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose, } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
const store = createStore(reducers, compose(applyMiddleware(thunk)));


ReactDOM.render(
  <Provider store={store}>
    {/* <BrowserRouter> */}
    <App />
    {/* </BrowserRouter> */}
  </Provider>,

  document.getElementById('root')
);