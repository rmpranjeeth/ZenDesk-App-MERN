import React from "react";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

function TopBar() {
  let navigate = useNavigate();
  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand><AccountBalanceIcon/> ZenDesk</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate("/user-dashboard")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/track-issue")}>Track</Nav.Link>
            <Nav.Link onClick={()=>navigate('/login')} href="javascript(void)">Logout</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;
