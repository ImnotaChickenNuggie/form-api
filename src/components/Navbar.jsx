"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from '../../public/logo.jpg'


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo section */}
          <div className="flex-shrink-0">
            <div className="h-8 w-44 items-center flex flex-row gap-x-3">
              <Image src={Logo} alt="Logo" className="w-12" width={44} height={32} />
              <span className="font-bold uppercase text-sm md:text-lg">Fake Store</span>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium"
            >
              Inicio
            </Link>
            <Link
              href="/carrito"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium"
            >
              Carrito
            </Link>
            <Link
              href="/perfil"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium"
            >
              Perfil
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
          >
            Inicio
          </Link>
          <Link
            href="/carrito"
            className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
          >
            Carrito
          </Link>
          <Link
            href="/perfil"
            className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
          >
            Perfil
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
