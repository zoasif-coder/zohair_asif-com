import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const WebsiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#004225]">ZOY</div>

        {/* Navigation (visible on medium/large screens) */}
        <nav className="hidden sm:flex items-center space-x-6">
          <a href="/" className="font-bold text-[#004225] hover:bg-[#004225] hover:text-white px-4 py-2 rounded-md">Home</a>
          <a href="/map" className="font-bold text-[#004225] hover:bg-[#004225] hover:text-white px-4 py-2 rounded-md">Airpods</a>
          <a href="#" className="font-bold text-[#004225] hover:bg-[#004225] hover:text-white px-4 py-2 rounded-md">About</a>
          <a href="#" className="font-bold text-[#004225] hover:bg-[#004225] hover:text-white px-4 py-2 rounded-md">Services</a>
          <a href="#" className="font-bold text-[#004225] hover:bg-[#004225] hover:text-white px-4 py-2 rounded-md">Contact</a>
        </nav>

        {/* Mobile Menu */}
        <div className="sm:hidden relative">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10">
              <a href="#" className="block px-4 py-2 hover:bg-[#004225] hover:text-white">Home</a>
              <a href="#" className="block px-4 py-2 hover:bg-[#004225] hover:text-white">About</a>
              <a href="#" className="block px-4 py-2 hover:bg-[#004225] hover:text-white">Services</a>
              <a href="#" className="block px-4 py-2 hover:bg-[#004225] hover:text-white">Contact</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default WebsiteHeader;
