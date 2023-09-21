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
import React from "react";
const Navigation = () => {
  const loggedIn = false;
  const userName = "User";
  const AdminLinks = {
    "Create Form": "/create",
    "View Forms": "/view",
  };
  const NavLinks = {
    Home: "/",
    Information: "/info",
    [loggedIn ? userName : "Login"]: "/account",
  };
  if (loggedIn) {
    Object.assign(NavLinks, AdminLinks);
  }
  return (
    <Container>
      <Navbar
        expand="lg"
        className="navbar navbar-expand-lg navbar-light navbar-inverse"
      >
        <Nav className="navbar-nav ml-auto d-lg-flex align-items-center">
          {Object.entries(NavLinks).map((link) => {
            return (
              <Link href={link[1]} key={link[0]} className="nav-link">
                {link[0]}
              </Link>
            );
          })}
        </Nav>
      </Navbar>
    </Container>
  );
};

export default Navigation;
