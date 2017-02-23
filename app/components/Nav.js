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
              <NavItem eventKey={1} href="https://www.linkedin.com/in/tushar-somwanshi-6a96887b?trk=hp-identity-photo">
              <b>Developed by:
                Tushar Somwanshi</b></NavItem>
            </Nav>
        </Navbar>
      </div>
    )
  }
}

export default Navigation;
