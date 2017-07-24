import React from 'react';
import Home from '../Home.js';
import Article from '../article/Entry.js';
import { Switch, Route } from 'react-router-dom'

function Main(props) {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/article' component={Article}/>
      </Switch>
    </main>
  );
}

export default Main;
