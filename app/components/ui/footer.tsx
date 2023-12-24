"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileSignature,
  faShieldCheck,
  faGamepad,
  faHotel,
  faServer,
  faDiceD6,
  faInfoCircle,
  faMegaphone,
} from "@fortawesome/pro-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto p-4 py-6 md:p-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6 md:col-span-3 sm:grid-cols-2">
          <div className="col-span-4 md:col-span-3 sm:col-span-2">
            <a
              href="https://bittivirta.fi/"
              className="mb-2 flex items-center text-2xl font-semibold text-gray-900 dark:text-white sm:mb-0"
            >
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
            </a>
            <p className="my-4 font-light text-gray-500 dark:text-gray-400">
              Bittivirta provides a variety of IT services, including
              maintenance, planning, repairs, and more. We offer exceptional
              quality customer service, affordable prices without sacrificing
              quality, and user-friendly services. Contact us today to find out
              how we can streamline your IT needs.
            </p>

            <p className="my-4 text-xs font-bold text-gray-500 dark:text-gray-400">
              CUSTOMER ORIENTATION - QUALITY - SIMPLICITY
            </p>
          </div>
          <div className="lg:mx-auto lg:col-start-5">
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
              Company
            </h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a
                  href="https://bittivirta.cloud/tietoa.php?language=english"
                  className="hover:underline"
                >
                  <FontAwesomeIcon icon={faInfoCircle} fixedWidth /> About
                </a>
              </li>

              <li className="mb-4">
                <a
                  href="https://bittivirta.cloud/announcements"
                  className="hover:underline"
                >
                  <FontAwesomeIcon icon={faMegaphone} fixedWidth />{" "}
                  Announcements
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:mx-auto">
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
              Services
            </h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a
                  href="https://bittivirta.cloud/pelipalvelimet.php?language=english"
                  className="hover:underline"
                >
                  <FontAwesomeIcon icon={faGamepad} fixedWidth /> Game servers
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://bittivirta.cloud/virtuaalipalvelimet.php?language=english"
                  className="hover:underline"
                >
                  <FontAwesomeIcon icon={faDiceD6} fixedWidth /> Virtual Servers
                  (VPS)
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://bittivirta.cloud/store/dedikoidut-palvelimet?language=english"
                  className="hover:underline"
                >
                  <FontAwesomeIcon icon={faServer} fixedWidth /> Dedicated
                  servers
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://bittivirta.cloud/webhotellit.php?language=english"
                  className="hover:underline"
                >
                  <FontAwesomeIcon icon={faHotel} fixedWidth /> Web hosting
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="grid items-center justify-between p-4 md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-5">
          <div className="items-center flex gap-8 col-span-1">
            <Image
              src="/icon/avainlippu_rgb.svg"
              width={50}
              height={50}
              alt="Code from finland"
            />
            <Image
              src="/icon/green-servers.svg"
              width={100}
              height={50}
              alt="Suomalaista Palvelua / Finnish Service"
            />
          </div>
          <div className="col-span-1 lg:col-start-2 lg:col-span-3">
            <ul className="text-lg flex justify-center items-center my-5 lg:my-0">
              <li className="mb-2">
                <Link
                  href="https://bittivirta.cloud/terms.php"
                  className="text-gray-500 dark:text-gray-400 transition-all duration-200 ease-in-out p-3 px-10 rounded-full block hover:text-primary-100 hover:bg-primary-600 text-md break-keep"
                >
                  <FontAwesomeIcon icon={faFileSignature} fixedWidth /> Terms of
                  Service
                </Link>
              </li>

              <li className="mb-2 px-2">
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 transition-all duration-200 ease-in-out p-3 px-10 rounded-full block hover:text-primary-100 hover:bg-primary-600 text-md"
                >
                  <FontAwesomeIcon icon={faShieldCheck} fixedWidth />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-gray-600 dark:text-white justify-self-end sm:text-center md:text-center lg:text-end">
            <p>&copy; Bittivirta</p>
            <p className="text-sm ">VAT ID: FI28842701</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
