import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function Dropdown({ label, showDropdown, setShowDropdown, items, refElement }) {
  return (
    <li
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={(e) => {
        const relatedNode = e.relatedTarget;
        const currentNode = refElement.current;

        if (currentNode && relatedNode instanceof Node && !currentNode.contains(relatedNode)) {
          setShowDropdown(false);
        }
      }}
    >
      <a
        href={`#${label.toLowerCase().replace(/ /g, '-')}`}
        onClick={(e) => {
          e.preventDefault();
          setShowDropdown((prev) => !prev);
        }}
      >
        {label}
        <span className={`arrow ${showDropdown ? 'up' : ''}`}>&#9660;</span>
      </a>
      {showDropdown && (
        <ul className="dropdown" ref={refElement}>
          {items.map((item, index) => (
            <li key={index}>
              <a href={`#${item.toLowerCase().replace(/ /g, '-')}`}>{item}</a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function App() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showUseCases, setShowUseCases] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownRefs = {
    howItWorks: useRef(null),
    services: useRef(null),
    useCases: useRef(null),
    help: useRef(null),
  };

  const toggleHowItWorks = () => {
    setShowHowItWorks((prev) => !prev);
  };

 
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, []);

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="logo">PixelCraft</div>
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`} >
          <ul className="nav-links">
            <li><a href="#catalog">Catalog</a></li>
            <Dropdown
              label="How it works"
              showDropdown={showHowItWorks}
              setShowDropdown={setShowHowItWorks}
              items={['Print On Demand', 'PixelCraft Quality Promise', 'What to Sell?']}
              refElement={dropdownRefs.howItWorks}
            />
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#blog">Blog</a></li>
            <Dropdown
              label="Services"
              showDropdown={showServices}
              setShowDropdown={setShowServices}
              items={['PixelCraft Studio', 'PixelCraft Express Delivery', 'Transfer Products']}
              refElement={dropdownRefs.services}
            />
            <Dropdown
              label="Use Cases"
              showDropdown={showUseCases}
              setShowDropdown={setShowUseCases}
              items={['Custom Prints', 'Dropshipping', 'E-commerce']}
              refElement={dropdownRefs.useCases}
            />
            <Dropdown
              label="Help"
              showDropdown={showHelp}
              setShowDropdown={setShowHelp}
              items={['Contact Us', 'FAQ', 'Support']}
              refElement={dropdownRefs.help}
            />
          </ul>
        </nav>
        <div className="auth-buttons">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-section">
        <div className="content">
          <h1 className="main-title">Welcome to PixelCraft</h1>
          <p className="sub-title">Your one-stop solution for printing needs.</p>
          <ul className="features">
            <li>High-quality prints</li>
            <li>Fast delivery</li>
            <li>Wide range of products</li>
          </ul>
          <button className="get-started-btn animated">Get Started</button>
          <div className="ratings">
            {Array(4).fill('★').map((star, index) => (
              <span key={index} className="star">★</span>
            ))}
            <span className="inactive-star">☆</span>
          </div>
          <div className="tshirt-section">
            <h2 className="tshirt-title">Design your own T-shirts and earn profits!</h2>
            <div className="tshirt-animation">
              <div className="animation-container">
                <video
                  ref={videoRef}
                  width="400"
                  height="400"
                  autoPlay
                  loop
                  muted
                  className="tshirt-video"
                >
                  <source src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/f0ofxddf3u1wuhunjuny" />
                  Your browser does not support the video tag.
                </video>
                <div className="animation-overlay">
                  <p>Start Selling Now!</p>
                </div>
              </div>
            </div>
            <div className="tshirt-buttons">
              <button className="design-btn">Design Yours</button>
              <button className="learn-more-btn">Learn More</button>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="video-section">
          <h2 className="video-title">Watch Our Animation</h2>
          <div className="video-animation">
            <div className="video-container">
              <video
                autoPlay
                loop
                muted
                className="video-animated"
              >
                <source src="https://placeit.net/uploads/stage/122241/preview.mp4?timestamp=1726859929013" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
