import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import githubIcon from '@iconify-icons/simple-icons/github';
import linkedinIcon from '@iconify-icons/simple-icons/linkedin';
import instagramIcon from '@iconify-icons/simple-icons/instagram';
import './App.css';
import myImage from './assets/images/zohair.jpg';

const SocialLinks = () => (
  <div className="flex justify-center space-x-10 mt-6">
    <a 
      href="https://github.com/zoasif-coder" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-[#004225] hover:text-[#004225]/80 transition-colors duration-300"
    >
      <Icon icon={githubIcon} width="36" height="36" />
    </a>
    <a 
      href="https://www.linkedin.com/in/zohair-asif-4b272593/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-[#004225] hover:text-[#004225]/80 transition-colors duration-300"
    >
      <Icon icon={linkedinIcon} width="36" height="36" />
    </a>
    <a 
      href="https://instagram.com/yoicanonlychillforabittho" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-[#004225] hover:text-[#004225]/80 transition-colors duration-300"
    >
      <Icon icon={instagramIcon} width="36" height="36" />
    </a>
  </div>
);

const FloatingBlob = ({ className }) => (
  <div className={`absolute rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-70 ${className}`} />
);

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMapClick = () => {
    // Handle navigation programmatically or through your preferred routing method
    window.location.href = '/map';
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FFFAF0] px-10">
      {/* Animated background blobs */}
      <FloatingBlob className="bg-[#004225]/20 w-96 h-96 top-0 -left-4" />
      <FloatingBlob className="bg-[#004225]/20 w-96 h-96 top-48 -right-4 animation-delay-2000" />
      <FloatingBlob className="bg-[#004225]/20 w-96 h-96 bottom-24 left-1/2 animation-delay-4000" />
      
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-start justify-between mb-12">
          <div className="md:w-1/2">
            <div className="text-left group">
              <h1 className="text-5xl md:text-7xl font-bold text-[#004225] drop-shadow-lg transition-transform duration-300 hover:-translate-y-2">
                Zohair
              </h1>
              <h1 className="text-5xl md:text-7xl font-bold text-[#004225] mt-2 drop-shadow-lg transition-transform duration-300 hover:-translate-y-2">
                Asif
              </h1>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
            <div className="flex flex-col items-center">
              <div className="relative w-64 h-64">
                <img
                  src={myImage}
                  alt="Your Profile"
                  className="rounded-lg shadow-lg object-cover w-full h-full transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                />
              </div>
              <SocialLinks /> {/* Added here */}
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl leading-relaxed text-[#004225]">
            Welcome to my share of the internet if, if you have made it here somehow you might as well reach out and say hi! hehe
          </p>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
