
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux'
import Layout from 'components/layouts/Layout.js';
import { store, history } from './store.js';
import { AppContainer } from 'react-hot-loader';

const router = (Component, s, h ) =>(
  <AppContainer>
    <Provider store={s}>
      <ConnectedRouter history={h}>
        <Component/>
      </ConnectedRouter>
    </Provider>
  </AppContainer>
)

ReactDOM.render( router(Layout, store, history), document.getElementById('root'));

//for react-hot-loader
if (module.hot) {
  module.hot.accept('components/layouts/Layout.js', () => {

    const NextLayout = require('components/layouts/Layout.js').default;
    const newConfigureStore = require('./store.js');
    const newStore = newConfigureStore.store;
    const newHistory = newConfigureStore.history;


    ReactDOM.render( router(NextLayout, newStore, newHistory), document.getElementById('root'));
  });
}
