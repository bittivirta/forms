"use client";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavDropdown,
} from "@/app/components/bootstrap";
import Link from "next/link";

const Navigation = () => {
  return (
    <Container>
      <Navbar
        expand="lg"
        className="navbar navbar-expand-lg navbar-light navbar-inverse"
      >
        <Nav className="navbar-nav ml-auto d-lg-flex align-items-center">
          <Link href="#" className="nav-link">
            <i className="fas fa-home"></i> Biv Forms
          </Link>
          <Link href="#" className="nav-link">
            <i className="fas fa-info"></i> Information
          </Link>
          <Link href="#" className="nav-link">
            <i className="fas fa-sign-in-alt"></i> Login
          </Link>
        </Nav>
      </Navbar>
    </Container>
  );
};

export default Navigation;
