import React from 'react';
import All from 'containers/project/All.js';
import Show from 'containers/project/Show.js';
import New from 'containers/project/New.js';
import Edit from 'containers/project/Edit.js';
import { Switch, Route } from 'react-router-dom'

function Entry(props) {
  return (
    <Switch>
      <Route exact path='/project' component={All}/>
      <Route exact path='/project/new' component={New}/>
      <Route exact path='/project/:id' component={Show}/>
      <Route exact path='/project/:id/edit' component={Edit}/>
    </Switch>
  );
}
export default Entry;
