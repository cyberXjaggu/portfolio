import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FaNetworkWired,
  FaShieldAlt,
  FaSearchPlus,
  FaLinux,
  FaCode,
  FaMobileAlt
} from 'react-icons/fa';
import { SiCisco } from 'react-icons/si';
import '../styles/theme.css';

const SKILL_CATEGORIES = [
  {
    title: 'Routing & Switching',
    icon: FaNetworkWired,
    iconColor: '#00aaff',
    skills: ['IP Addressing (Basic)', 'Subnetting (Basic)', 'VLAN (Basic)', 'Routing Fundamentals (Basic)']
  },
  {
    title: 'Cisco / Networking',
    icon: SiCisco,
    iconColor: '#00ff41',
    skills: ['Packet Tracer Labs (Basic)', 'Router Configuration (Basic)', 'Switch Configuration (Basic)']
  },
  {
    title: 'Cybersecurity Fundamentals',
    icon: FaShieldAlt,
    iconColor: '#00ff41',
    skills: ['Network Security Basics', 'Ethical Hacking Fundamentals', 'OSINT Basics', 'Firewall Concepts', 'IDS / IPS Concepts']
  },
  {
    title: 'Vulnerability Scanning',
    icon: FaSearchPlus,
    iconColor: '#00ff41',
    skills: ['Nmap Scanning', 'CVSS Understanding (Basic)']
  },
  {
    title: 'Linux',
    icon: FaLinux,
    iconColor: '#ffcc00',
    skills: ['Linux CLI Usage', 'File Permissions (Basic)', 'Networking Commands (Basic)', 'Basic Troubleshooting']
  },
  {
    title: 'Web Development',
    icon: FaCode,
    iconColor: '#00aaff',
    skills: ['HTML, CSS, JavaScript', 'React (Learning)', 'Backend Basics', 'Full-Stack Learning Project']
  },
  {
    title: 'Mobile App Development',
    icon: FaMobileAlt,
    iconColor: '#ffcc00',
    skills: ['Beginner Mobile App Development', 'Android Studio (Beginner)', 'Simple Private Chat Application', 'Basic Authentication', 'Basic Real-Time Messaging']
  }
];

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }
};

const Skills = () => {
  const skillCategories = useMemo(() => SKILL_CATEGORIES, []);
  const containerVariants = useMemo(() => ANIMATION_VARIANTS.container, []);
  const itemVariants = useMemo(() => ANIMATION_VARIANTS.item, []);

  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <motion.h2
          id="skills-title"
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Technical Skills
        </motion.h2>

        <motion.div
          className="skills-grid-new"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={index}
                className="skill-card-new"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div
                  className="skill-icon-wrapper"
                  style={{ color: category.iconColor }}
                >
                  <IconComponent size={40} aria-hidden="true" />
                </div>
                <h3 className="skill-title">{category.title}</h3>
                <p className="skill-list">
                  {category.skills.join(' · ')}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Skills);
