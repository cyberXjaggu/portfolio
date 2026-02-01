import { useRef, useCallback, useState, memo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BootLoader from './components/BootLoader';
import CyberBackground from './components/CyberBackground';
import './styles/global.css';
import './styles/theme.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const skillsRef = useRef(null);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleExploreSkills = useCallback(() => {
    if (skillsRef.current) {
      skillsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleNavClick = useCallback((section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {/* Boot Loader - shows on initial load */}
      {isLoading && <BootLoader onLoadComplete={handleLoadComplete} />}

      {/* Cyber Background - persistent animated network */}
      <CyberBackground />

      {/* Main App Content */}
      <div className={`App ${isLoading ? 'app-loading' : 'app-loaded'}`}>
        <Navbar onNavClick={handleNavClick} />
        <Hero onExploreClick={handleExploreSkills} />
        <About />
        <div ref={skillsRef}>
          <Skills />
        </div>
        <Projects />
        <Certifications />
        <Education />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default memo(App);

