
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux'
import Layout from 'components/layouts/Layout.js';
import store, { history } from './store.js';
import { AppContainer } from 'react-hot-loader';

const router = Component =>(
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component/>
      </ConnectedRouter>
    </Provider>
  </AppContainer>
)

ReactDOM.render( router(Layout), document.getElementById('root'));

//for react-hot-loader
if (module.hot) {
  module.hot.accept('components/layouts/Layout.js', () => {
    const NextLayout = require('components/layouts/Layout.js').default;
    ReactDOM.render( router(NextLayout), document.getElementById('root'));
  });
}
