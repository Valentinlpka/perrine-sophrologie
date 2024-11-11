"use client";
import logo from "@/assets/images/logo.png"; // Ajustez le chemin si nécessaire
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white p-4 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black font-medium flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="hidden sm:inline">
              Redevenez l'acteur de votre mieux être
            </span>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="#services" className="text-black hover:font-bold">
            Services
          </Link>
          <Link href="#seances" className="text-black hover:font-bold">
            Séances
          </Link>
          <Link href="#contact" className="text-black hover:font-bold">
            Contact
          </Link>
          <Link href="/blog" className="text-black hover:font-bold">
            Blog
          </Link>

          <Link
            target="_blank"
            href="https://www.resalib.fr/praticien/89121-perrine-dupriez-sophrologue-denain"
            className="bg-gradient-to-bl from-orange1 to-orange2 text-white px-4 py-2 rounded-md hover:bg-orange-500 transition duration-300"
          >
            Réserver
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <Link
            target="_blank"
            href="https://www.resalib.fr/praticien/89121-perrine-dupriez-sophrologue-denain"
            className="bg-gradient-to-bl from-orange1 to-orange2 text-white px-4 py-2 rounded-md hover:bg-orange-500 transition duration-300 mr-2"
          >
            Réserver
          </Link>
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2 border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#accueil"
              className="block text-black hover:bg-orange-200 px-3 py-2 rounded-md"
            >
              Accueil
            </Link>
            <Link
              href="#services"
              className="block text-black hover:bg-orange-200 px-3 py-2 rounded-md"
            >
              Services
            </Link>
            <Link
              href="#apropos"
              className="block text-black hover:bg-orange-200 px-3 py-2 rounded-md"
            >
              À propos
            </Link>
            <Link
              href="#contact"
              className="block text-black hover:bg-orange-200 px-3 py-2 rounded-md"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="block text-black hover:bg-orange-200 px-3 py-2 rounded-md"
            >
              Blog
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
