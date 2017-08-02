import React from 'react';
import { Link } from 'react-router-dom'
import { Navbar, NavItem,  Nav, Image  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './styles/menu.css';

function Menu(props) {
  return (
    <Navbar fixedTop collapseOnSelect fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to='/'>
              <Image src="/favicon.ico" rounded alt="CHI LIN"/>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>
        <Nav pullRight>
          <LinkContainer to="/project">
            <NavItem eventKey={1}>Project_</NavItem>
          </LinkContainer>
          <LinkContainer to="/research">
            <NavItem eventKey={2}>Research_</NavItem>
          </LinkContainer>
          <LinkContainer to="/article">
            <NavItem eventKey={3}>Article_</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>

    </Navbar>
  );
}

export default Menu;


/*
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
*/
