import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import '../styles/NavBar.css';
import { useLocation, Link } from "react-router-dom";
import headerImg from "../assets/logo.png";

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand><img src={headerImg} alt="Header Img"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className={`navbar-link ${pathname === '/work' ? 'active' : ''}`} as={Link} to="/work">Work</Nav.Link>
            <Nav.Link className={`navbar-link ${pathname === '/about' ? 'active' : ''}`} as={Link} to="/about">About</Nav.Link>
            <Nav.Link className={`navbar-link ${pathname === '/services' ? 'active' : ''}`} as={Link} to="/services">Services</Nav.Link>
            <Nav.Link className={`navbar-link ${pathname === '/ideas' ? 'active' : ''}`} as={Link} to="/ideas">Ideas</Nav.Link>
            <Nav.Link className={`navbar-link ${pathname === '/careers' ? 'active' : ''}`} as={Link} to="/careers">Careers</Nav.Link>
            <Nav.Link className={`navbar-link ${pathname === '/contact' ? 'active' : ''}`} as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
