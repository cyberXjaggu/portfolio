import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaNetworkWired, FaBug, FaServer, FaLock, FaTerminal } from 'react-icons/fa';
import '../styles/theme.css';
import aboutImg from '../assets/about.jpg';

const CORE_COMPETENCIES = [
  { icon: FaShieldAlt, label: 'Cybersecurity Fundamentals' },
  { icon: FaNetworkWired, label: 'Networking Basics' },
  { icon: FaBug, label: 'Ethical Hacking (Beginner)' },
  { icon: FaServer, label: 'Web Development' },
  { icon: FaLock, label: 'OSINT & Recon' },
  { icon: FaTerminal, label: 'Linux Command Line' }
];

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }
};

const About = () => {
  const competencies = useMemo(() => CORE_COMPETENCIES, []);
  const containerVariants = useMemo(() => ANIMATION_VARIANTS.container, []);
  const itemVariants = useMemo(() => ANIMATION_VARIANTS.item, []);

  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-container">

        {/* Section Header */}
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="about-label">Background</span>
          <h2 id="about-title" className="about-title">About Me</h2>
          <div className="about-title-divider"></div>
        </motion.div>

        {/* Main Content - Two Column Layout */}
        <motion.div
          className="about-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left Column - Text Content */}
          <motion.div className="about-content" variants={containerVariants}>
            <motion.p className="about-intro" variants={itemVariants}>
              I am a 2nd year Computer Science student with a strong interest in
              cybersecurity, networking, and web development. I enjoy exploring how
              systems work and how to secure them, and I am actively building my
              skills through coursework, self-study, and hands-on practice.
            </motion.p>

            <motion.p className="about-text" variants={itemVariants}>
              I have hands-on experience with <strong>Cisco Packet Tracer</strong> for
              basic networking labs and use <strong>Linux</strong> regularly for
              command-line practice. At the beginner level, I have explored cybersecurity
              tools such as <strong>Nmap</strong>, <strong>Burp Suite</strong>,
              <strong> Metasploit</strong>, and <strong>Wireshark</strong>, and I
              practise on <strong>TryHackMe</strong> labs to reinforce my learning. I
              also have early exposure to OSINT techniques and ethical hacking fundamentals.
            </motion.p>

            <motion.p className="about-text" variants={itemVariants}>
              On the development side, I have built full-stack learning projects including
              a simple private chat application and completed a college mini project. I am
              also exploring beginner-level mobile app development. I have completed Cisco
              Networking Academy courses in <strong>Introduction to Cybersecurity</strong> and
              <strong> Introduction to Networks</strong>, and I continue to learn through
              platforms like WsCube Tech and CyberMind Space on YouTube.
            </motion.p>

            {/* Core Competencies Grid */}
            <motion.div className="competencies-section" variants={itemVariants}>
              <h3 className="competencies-title">Core Competencies</h3>
              <div className="competencies-grid">
                {competencies.map((comp, index) => (
                  <div key={index} className="competency-item">
                    <comp.icon className="competency-icon" />
                    <span className="competency-label">{comp.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Professional Headshot Card */}
          <motion.div className="about-image-wrapper" variants={itemVariants}>
            <div className="about-image-card">
              <div className="about-image-glow"></div>
              <img
                src={aboutImg}
                alt="Jagarnath Mali - Computer Science Student"
                className="about-headshot"
              />
              <div className="about-image-details">
                <span className="detail-name">Jagarnath Mali</span>
                <span className="detail-role">CS Student | Aspiring Security Analyst</span>
              </div>
            </div>

            {/* Stats/Credentials */}
            <div className="about-credentials">
              <div className="credential-item">
                <span className="credential-value">Cisco</span>
                <span className="credential-label">Intro to Cybersecurity</span>
              </div>
              <div className="credential-divider"></div>
              <div className="credential-item">
                <span className="credential-value">Cisco</span>
                <span className="credential-label">Intro to Networks</span>
              </div>
              <div className="credential-divider"></div>
              <div className="credential-item">
                <span className="credential-value">THM</span>
                <span className="credential-label">Practice Labs</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(About);
