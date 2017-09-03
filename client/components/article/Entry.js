import React from 'react';
import All from 'containers/article/All.js';
import Show from 'containers/article/Show.js';
import New from 'containers/article/New.js';
import Edit from 'containers/article/Edit.js';
import { Switch, Route } from 'react-router-dom'

function Entry(props) {
  return (
    <Switch>
      <Route exact path='/article' component={All}/>
      <Route exact path='/article/new' component={New}/>
      <Route exact path='/article/:id' component={Show}/>
      <Route exact path='/article/:id/edit' component={Edit}/>
    </Switch>
  );
}
export default Entry;
