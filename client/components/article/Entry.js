
import React from 'react';
import All from '../../containers/article/All.js';
import { Switch, Route } from 'react-router-dom'

function Entry(props) {
  return (
    <Switch>
      <Route exact path='/article' component={All}/>
    </Switch>
  );
}
export default Entry;
