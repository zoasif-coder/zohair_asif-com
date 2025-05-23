import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import './App.css';
import myImage from './assets/images/zohair.jpg';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        {/* ... previous nav code ... */}
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-start justify-between mb-12">
          <div className="md:w-1/2 float-animation">
            <div className="text-left">
              <h1 className="text-5xl md:text-7xl font-bold name-text">
                Zohair
              </h1>
              <h1 className="text-5xl md:text-7xl font-bold name-text mt-2">
                Asif
              </h1>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0 float-animation-slow">
            <div className="relative w-64 h-64 profile-image-container">
              <img
                src={myImage}
                alt="Your Profile"
                className="rounded-lg shadow-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl leading-relaxed about-text">
          Welcome to my personal website! The lock-in is about to be generational. Every "It is so over" shall be 
          be met with "We are so back".
          </p>
          <Link to="/map" className="App-link">
            Go to Map
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;