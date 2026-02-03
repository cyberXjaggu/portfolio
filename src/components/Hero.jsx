import { memo, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaLinkedin, FaGithub, FaArrowRight } from 'react-icons/fa';
import '../styles/theme.css';
import profileImg from '../assets/profile.jpg';
import resumePdf from '../assets/resume.pdf';

const Hero = ({ onExploreClick }) => {
  const handleShowResume = useCallback(() => {
    window.open(resumePdf, '_blank');
  }, []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' }
    }
  }), []);

  return (
    <section className="hero" id="hero">
      {/* Animated Cyber Grid Background */}
      <div className="hero-grid-overlay"></div>
      <div className="hero-circuit-lines"></div>
      <div className="hero-glow-orb hero-glow-orb-1"></div>
      <div className="hero-glow-orb hero-glow-orb-2"></div>

      <motion.div
        className="hero-content container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Section with Glassmorphism */}
        <motion.div className="hero-image" variants={itemVariants}>
          <div className="profile-container">
            <div className="profile-ring"></div>
            <div className="profile-ring profile-ring-outer"></div>
            <img src={profileImg} alt="Jagarnath Mali" className="profile-img" />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div className="hero-text" variants={containerVariants}>
          <motion.div className="hero-badge" variants={itemVariants}>
            <span className="badge-dot"></span>
            Aspiring Cybersecurity Professional
          </motion.div>

          <motion.h1 variants={itemVariants}>
            Jagarnath Mali
          </motion.h1>

          <motion.div className="hero-divider" variants={itemVariants}></motion.div>

          <motion.p className="title" variants={itemVariants}>
            Computer Science Student (2nd Year)
          </motion.p>

          <motion.p className="hero-tagline" variants={itemVariants}>
            I'm a second-year Computer Science student with a strong interest in cybersecurity and
            ethical hacking. I'm currently building my skills in networking, security fundamentals,
            and web technologies through hands-on projects and continuous learning.
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <button
              className="hero-btn hero-btn-primary"
              onClick={onExploreClick}
              aria-label="Explore my skills"
            >
              <FaArrowRight size={14} />
              <span>Explore Skills</span>
            </button>
            <button
              className="hero-btn hero-btn-secondary"
              onClick={handleShowResume}
              aria-label="Show Resume"
            >
              <FaFileAlt size={14} />
              <span>View Resume</span>
            </button>
            <a
              href="https://linkedin.com/in/jagarnath-mali-b36a40328/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn hero-btn-ghost"
              aria-label="Visit LinkedIn profile"
            >
              <FaLinkedin size={14} />
            </a>
            <a
              href="https://github.com/cyberXjaggu"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn hero-btn-ghost"
              aria-label="Visit GitHub profile"
            >
              <FaGithub size={14} />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default memo(Hero);
