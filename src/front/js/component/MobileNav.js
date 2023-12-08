import React from "react";
import { useMediaQuery } from 'react-responsive';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

export const MobileNav = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return isMobile && (
    
    <Navbar bg="body-tertiary" expand="d-md-none ">
      <Container>
        <Navbar.Brand href="#">
          {/*  */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link active" style={{ color: 'black' }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/signupUser" className="nav-link" style={{ color: 'black' }}>Sign up</Nav.Link>
            <Nav.Link as={Link} to="/account" className="nav-link" style={{ color: 'black' }}>Account</Nav.Link>
            <Nav.Link as={Link} to="/payment" className="nav-link" style={{ color: 'black' }}>Payment</Nav.Link>
            <Nav.Link as={Link} to="/insurance" className="nav-link" aria-disabled="true" style={{ color: 'black' }}>Insurance</Nav.Link>
            <Nav.Link as={Link} to="/services" className="nav-link" aria-disabled="true" style={{ color: 'black' }}>Services</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
