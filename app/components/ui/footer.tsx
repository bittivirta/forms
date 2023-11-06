"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800">
      <div className="lg:-10 mx-auto max-w-screen-xl p-4 py-6 md:p-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          <div className="col-span-3">
            <a
              href="#"
              className="mb-2 flex items-center text-2xl font-semibold text-gray-900 dark:text-white sm:mb-0"
            >
              <Image
                alt="Bittivirta Logo"
                src="https://cdn.bittivirta.fi/graphics/logo/2023/bittivirta/svg/icon.svg"
                className="mr-3"
                width={50}
                height={50}
              />
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Bittivirta
              </span>
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
          <div className="lg:mx-auto">
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
              Company
            </h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className=" hover:underline">
                  About
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Brand Center
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:mx-auto">
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
              Help center
            </h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Discord Server
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:mx-auto">
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
              Legal
            </h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Licensing
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-center text-sm text-gray-500 dark:text-gray-400">
          Copyright ©{" "}
          <a href="#" className="hover:underline">
            Bittivirta
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
