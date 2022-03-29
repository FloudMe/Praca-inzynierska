import React from "react";
import {Navbar, Container, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Bar = () =>{
    return (
      <Navbar bg="light" expand='lg'>
          <Container>
            <Navbar.Brand href="#home">Project name</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#home">Trainings</Nav.Link>
            </Nav>
            </Navbar.Collapse>
          </Container>
      </Navbar>
    );
}
  
export default Bar;