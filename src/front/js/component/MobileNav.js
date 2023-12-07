import React from "react";
import { useMediaQuery } from 'react-responsive';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

export const MobileNav = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return isMobile && (
    <Navbar bg="body-tertiary" expand="lg">
      <Container>
        <Navbar.Brand href="#">
          <img className="logoImg" src="https://private-user-images.githubusercontent.com/134784015/288147616-1f0d3f25-a656-4faa-a301-092929dc6dc8.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDE3OTc5ODcsIm5iZiI6MTcwMTc5NzY4NywicGF0aCI6Ii8xMzQ3ODQwMTUvMjg4MTQ3NjE2LTFmMGQzZjI1LWE2NTYtNGZhYS1hMzAxLTA5MjkyOWRjNmRjOC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMxMjA1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMTIwNVQxNzM0NDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wMTcxNTVjMzU5MWZmYjBmOTU3MWY2NTM3MTFhNTYxYTc2MmI0NmMzYzNkYzdiMWE1YmU3N2I0NTI2NDFiYzFmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.yoJ2G1qkTkLDlc8xIND6HgkPYjj1qaQNdk8ITCr47CY" alt="Bootstrap" width="30" height="24" />
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
