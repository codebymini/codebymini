import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleImageClick = () => {
    if (isMobile) {
      setIsHovered(!isHovered);
    }
  };

  return (
    <header className="bg-terminal-header p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-4">
            <img
              src="/images/logo.svg"
              alt="CodeByMini Logo"
              className="h-8 w-auto"
            />
            <div
              className="relative"
              onMouseEnter={() => !isMobile && setIsHovered(true)}
              onMouseLeave={() => !isMobile && setIsHovered(false)}
              onClick={handleImageClick}
            >
              <img
                src="/images/profile-picture.png"
                alt="Profile"
                className="h-16 w-16 md:h-12 md:w-12 rounded-full border-2 border-terminal-accent object-cover cursor-pointer transition-transform duration-200 hover:scale-110"
              />
              {isHovered && (
                <div
                  className={`absolute z-50 ${
                    isMobile
                      ? 'top-full left-1/2 -translate-x-1/2 mt-4'
                      : 'top-0 left-0 -translate-y-2 translate-x-16'
                  }`}
                >
                  <div className="relative w-48 h-48 bg-terminal-header/30 backdrop-blur-md rounded-full p-2">
                    <img
                      src="/images/profile-picture.png"
                      alt="Profile Large"
                      className="w-full h-full rounded-full border-2 border-terminal-accent object-cover shadow-xl"
                    />
                    <div className="absolute inset-0 bg-terminal-header/10 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-terminal-accent text-2xl md:text-xl font-bold">
                Daniel Johansson
              </h1>
              <p className="text-terminal-text text-base md:text-sm">
                Full Stack Developer
              </p>
            </div>
          </div>
        </div>
        <nav className="w-full md:w-auto">
          <ul className="flex justify-center md:justify-start space-x-6">
            <li>
              <a
                href="https://github.com/codebymini"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-text hover:text-terminal-accent transition-colors flex items-center"
              >
                <img
                  src="/images/github.png"
                  alt="GitHub"
                  className="w-8 h-8 md:w-6 md:h-6 mr-2"
                />
                <span className="text-base md:text-sm">GitHub</span>
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/codebymini"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-text hover:text-terminal-accent transition-colors flex items-center"
              >
                <img
                  src="/images/linkedin.png"
                  alt="LinkedIn"
                  className="w-8 h-8 md:w-6 md:h-6 mr-2"
                />
                <span className="text-base md:text-sm">LinkedIn</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
