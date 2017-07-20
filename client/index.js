
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux'
import Nav from './components/Nav.js';
//import Main from '../components/Main.jsx';
import store, { history } from './store.js';


const router = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Nav />
      </div>
    </ConnectedRouter>
  </Provider>
)

ReactDOM.render(router, document.getElementById('root'));

/*
<Provider store={store}>
  <ConnectedRouter history={history}>
    <div>
      <Nav />
      Main
    </div>
  </ConnectedRouter>
</Provider>
*/
