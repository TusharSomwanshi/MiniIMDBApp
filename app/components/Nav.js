import React from 'react';
 import { Navbar, NavItem, Nav } from 'react-bootstrap';
require("react-bootstrap/lib/NavbarHeader");

class Navigation extends React.Component{
  render(){
    return(
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <b>Mini IMDB App</b>
            </Navbar.Brand>
          </Navbar.Header>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Developed by: Tushar Somwanshi</NavItem>
            </Nav>
        </Navbar>
      </div>
    )
  }
}

export default Navigation;
