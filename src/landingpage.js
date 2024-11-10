import React from 'react';
import { Menu } from 'lucide-react';
import './App.css';
import myImage from './assets/images/zohair.jpg';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar remains the same */}
      <nav className="bg-white shadow-md">
        {/* ... previous nav code ... */}
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Name and Image Section */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-12">
          {/* Stacked Name */}
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

          {/* Profile Image */}
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

        {/* About Section */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl leading-relaxed about-text">
            Welcome to my personal website! I'm a [your profession/interest] passionate about
            [your interests/skills]. I love working on [specific areas/technologies]
            and am always excited to take on new challenges.
          </p>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
