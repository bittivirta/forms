"use client";
import { Button, Navbar } from "flowbite-react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown, faEnvelope, faEuro, faHome, faQuestionCircle } from "@fortawesome/pro-solid-svg-icons";

export default function Header() {
  return (
    <Navbar>
      <Navbar.Brand href="https://bittivirta.fi/forms">
        <Image alt="Bittivirta Logo" src="https://cdn.bittivirta.fi/graphics/logo/2023/bittivirta/svg/logo-light.svg" className="mr-3" width={130} height={50} />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Forms</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button>Get started now!</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active href="#"><FontAwesomeIcon icon={faHome} fixedWidth className="mr-2" /> Home</Navbar.Link>
        <Navbar.Link href="#"><FontAwesomeIcon icon={faQuestionCircle} fixedWidth className="mr-2" />About</Navbar.Link>
        <Navbar.Link href="#"><FontAwesomeIcon icon={faCartArrowDown} fixedWidth className="mr-2" />Services</Navbar.Link>
        <Navbar.Link href="#"><FontAwesomeIcon icon={faEuro} fixedWidth className="mr-2" />Pricing</Navbar.Link>
        <Navbar.Link href="#"><FontAwesomeIcon icon={faEnvelope} fixedWidth className="mr-2" />Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
