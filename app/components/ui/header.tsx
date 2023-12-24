"use client";
import { Button, Navbar } from "flowbite-react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock } from "@fortawesome/pro-solid-svg-icons";

export default function Header() {
  return (
    <Navbar>
      <Navbar.Brand href="/">
        <Image
          alt="Bittivirta Logo"
          src="https://cdn.bittivirta.fi/brand/logo/logo.svg"
          className="mr-3 dark:hidden"
          width={150}
          height={50}
        />
        <Image
          alt="Bittivirta Logo"
          src="https://cdn.bittivirta.fi/brand/logo/light/logo.svg"
          className="mr-3 hidden dark:block"
          width={150}
          height={50}
        />
      </Navbar.Brand>
      <div className="flex md:order-2"></div>
    </Navbar>
  );
}
