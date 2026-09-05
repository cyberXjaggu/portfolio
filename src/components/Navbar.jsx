import { useState, useEffect, memo, useCallback } from 'react';
import { FaUserSecret } from 'react-icons/fa';
import '../styles/theme.css';

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' }
];

const SECTION_IDS = ['hero', ...NAV_ITEMS.map((item) => item.id)];

const Navbar = ({ onNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleNavClick = useCallback((event, section) => {
    event.preventDefault();
    setActiveSection(section);
    setIsOpen(false);
    window.history.replaceState(null, '', `#${section}`);
    onNavClick(section);
  }, [onNavClick]);

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen((open) => (open ? false : open));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 1]
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="nav-container">
        <a
          href="#hero"
          className="nav-logo"
          onClick={(event) => handleNavClick(event, 'hero')}
          aria-label="Go to top"
        >
          <div className="nav-circle">
            <FaUserSecret size={22} />
          </div>
          <div className="nav-text">
            <h3>Jagarnath</h3>
            <p>Cybersecurity</p>
          </div>
        </a>

        <button
          type="button"
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul id="primary-navigation" className={`nav-links ${isOpen ? 'active' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                onClick={(event) => handleNavClick(event, item.id)}
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
