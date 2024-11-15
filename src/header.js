import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const WebsiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed w-full top-0 z-50">
      <div className="w-full mx-auto px-4 py-2 bg-white/20 backdrop-blur-md backdrop-saturate-150 shadow-lg">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-[#004225]">ZOY</div>

          {/* Navigation (visible on medium/large screens) */}
          <nav className="hidden sm:flex items-center space-x-6">
            <a href="/" className="font-bold text-[#004225] hover:bg-[#004225]/90 hover:text-white px-4 py-2 rounded-md transition-all duration-300">Home</a>
            <a href="/map" className="font-bold text-[#004225] hover:bg-[#004225]/90 hover:text-white px-4 py-2 rounded-md transition-all duration-300">Airpods</a>
            <a href="#" className="font-bold text-[#004225] hover:bg-[#004225]/90 hover:text-white px-4 py-2 rounded-md transition-all duration-300">About</a>
            <a href="#" className="font-bold text-[#004225] hover:bg-[#004225]/90 hover:text-white px-4 py-2 rounded-md transition-all duration-300">Services</a>
            <a href="#" className="font-bold text-[#004225] hover:bg-[#004225]/90 hover:text-white px-4 py-2 rounded-md transition-all duration-300">Contact</a>
          </nav>

          {/* Mobile Menu */}
          <div className="sm:hidden relative">
            <button
              className="text-[#004225] hover:text-[#004225]/80 focus:outline-none transition-colors duration-300"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white/90 backdrop-blur-md rounded-md shadow-lg z-10">
                <a href="/" className="font-bold text-[#004225] hover:bg-[#004225]/90 hover:text-white px-4 py-2 rounded-md transition-all duration-300">Home</a>
                <a href="/map" className="font-bold text-[#004225] hover:bg-[#004225]/90 hover:text-white px-4 py-2 rounded-md transition-all duration-300">Airpods</a>
                <a href="#" className="font-bold text-[#004225] hover:bg-[#004225]/90 hover:text-white px-4 py-2 rounded-md transition-all duration-300">About</a>
                <a href="#" className="font-bold text-[#004225] hover:bg-[#004225]/90 hover:text-white px-4 py-2 rounded-md transition-all duration-300">Services</a>
                <a href="#" className="font-bold text-[#004225] hover:bg-[#004225]/90 hover:text-white px-4 py-2 rounded-md transition-all duration-300">Contact</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default WebsiteHeader;
