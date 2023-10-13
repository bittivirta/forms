"use client";
import { Button, Navbar } from "flowbite-react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock } from "@fortawesome/pro-solid-svg-icons";

export default function Header() {
  return (
    <Navbar>
      <Navbar.Brand href="https://bittivirta.fi/forms">
        <Image
          alt="Bittivirta Logo"
          src="https://cdn.bittivirta.fi/graphics/logo/2023/bittivirta/svg/icon.svg"
          className="mr-3"
          width={50}
          height={50}
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Bittivirta Forms
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button href="./admin">
          {" "}
          <FontAwesomeIcon icon={faUserLock} fixedWidth className="mr-2" />
          Login
        </Button>
      </div>
    </Navbar>
  );
}
