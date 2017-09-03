import React from 'react';
import { Link } from 'react-router-dom'
import { Navbar, NavItem,  Nav, Image  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './styles/menu.css';

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isShrink: false };
  }

  componentDidMount() {
      document.addEventListener('scroll', () => {
        this.setState({ isShrink: window.scrollY > 100 })
      });
  }


  render() {
    return (
      <Navbar fixedTop collapseOnSelect fluid className={this.state.isShrink ? 'navbar-shrink' : ''}>
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
              <NavItem eventKey={1}>Projects_</NavItem>
            </LinkContainer>
            <LinkContainer to="/article">
              <NavItem eventKey={3}>Articles_</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    );
  }
}

export default Menu;
/*
<LinkContainer to="/research">
  <NavItem eventKey={2}>Research_</NavItem>
</LinkContainer>
*/
