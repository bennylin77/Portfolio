import React from 'react';
import Home from  'components/home/Home.js';
import Project from 'components/project/Entry.js';
import Article from 'components/article/Entry.js';
import { Switch, Route } from 'react-router-dom'
import './styles/main.css';

function Main(props) {
  return (
    <main className="main_holder" >
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/project' component={Project}/>
        <Route path='/article' component={Article}/>
      </Switch>
    </main>
  );
}

export default Main;
