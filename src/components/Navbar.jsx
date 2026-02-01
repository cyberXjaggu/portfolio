import { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { FaBars, FaTimes, FaUserSecret } from 'react-icons/fa';
import '../styles/theme.css';

const Navbar = ({ onNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleNavClick = useCallback((section) => {
    setActiveSection(section);
    setIsOpen(false);
    onNavClick(section);
  }, [onNavClick]);

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = useMemo(() => [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Education', id: 'education' },
    { label: 'Contact', id: 'contact' }
  ], []);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <div className="nav-circle">
            <FaUserSecret size={22} />
          </div>
          <div className="nav-text">
            <h3>Jagarnath</h3>
            <p>Cybersecurity</p>
          </div>
        </div>

        <button
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`} role="menubar">
          {navItems.map((item) => (
            <li key={item.id} role="none">
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                onClick={() => handleNavClick(item.id)}
                role="menuitem"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default memo(Navbar);
