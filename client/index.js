
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux'
import Menu from './components/layouts/Menu.js';
import Main from './components/layouts/Main.js';
import store, { history } from './store.js';


const router = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Menu />
        <Main />
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
