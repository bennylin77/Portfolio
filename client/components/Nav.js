import React from 'react';
import { Link } from 'react-router-dom'

function Nav(props) {
  return (
    <nav className="navbar navbar-default navbar-fixed-top menu">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to='/' className="navbar-brand">
            <img src="/favicon.ico" className="underline" alt="underline" />
          </Link>
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav navbar-right">
            <li><Link to='/research'>Research_</Link></li>
            <li><Link to='/project'>Projects_</Link></li>
            <li><Link to='/article'>Articles_</Link></li>
          </ul>
       </div>
      </div>
    </nav>
  );
}

export default Nav;
