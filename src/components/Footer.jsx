import { memo } from 'react';
import '../styles/theme.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <p>
          &copy; {currentYear} <a href="#hero">Jagarnath</a>. All rights reserved.
        </p>
        <p style={{ fontSize: '0.9rem' }}>
          Designed & Built with ❤️ using React & Vite
        </p>
      </div>
    </footer>
  );
};

export default memo(Footer);
