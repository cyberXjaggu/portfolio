import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaNetworkWired, FaBug, FaServer, FaLock, FaTerminal } from 'react-icons/fa';
import '../styles/theme.css';
import aboutImg from '../assets/about.jpg';

const CORE_COMPETENCIES = [
  { icon: FaShieldAlt, label: 'Vulnerability Assessment' },
  { icon: FaNetworkWired, label: 'Network Security' },
  { icon: FaBug, label: 'Penetration Testing' },
  { icon: FaServer, label: 'SIEM Operations' },
  { icon: FaLock, label: 'Security Hardening' },
  { icon: FaTerminal, label: 'Linux Administration' }
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
              Cybersecurity professional with hands-on expertise in network security,
              vulnerability assessment, and incident response. Certified in Cisco networking
              with practical experience in security operations and threat detection.
            </motion.p>

            <motion.p className="about-text" variants={itemVariants}>
              Proficient in industry-standard security tools including <strong>Nmap</strong>,
              <strong> Burp Suite</strong>, <strong>Metasploit</strong>, and SIEM platforms
              like Splunk. Experienced in conducting security audits, implementing hardening
              measures, and developing incident response protocols.
            </motion.p>

            <motion.p className="about-text" variants={itemVariants}>
              Currently focused on expanding expertise in cloud security, threat intelligence,
              and advanced penetration testing methodologies. Committed to continuous learning
              and contributing to enterprise security initiatives.
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
                alt="Jagarnath Mali - Cybersecurity Professional"
                className="about-headshot"
              />
              <div className="about-image-details">
                <span className="detail-name">Jagarnath Mali</span>
                <span className="detail-role">Security Engineer</span>
              </div>
            </div>

            {/* Stats/Credentials */}
            <div className="about-credentials">
              <div className="credential-item">
                <span className="credential-value">CCNA</span>
                <span className="credential-label">Certified</span>
              </div>
              <div className="credential-divider"></div>
              <div className="credential-item">
                <span className="credential-value">CCNP</span>
                <span className="credential-label">In Progress</span>
              </div>
              <div className="credential-divider"></div>
              <div className="credential-item">
                <span className="credential-value">SOC</span>
                <span className="credential-label">Operations</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(About);
