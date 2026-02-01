import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FaNetworkWired,
  FaShieldAlt,
  FaChartLine,
  FaSearchPlus,
  FaLinux,
  FaCheckCircle
} from 'react-icons/fa';
import { SiCisco } from 'react-icons/si';
import '../styles/theme.css';

const SKILL_CATEGORIES = [
  {
    title: 'Routing & Switching',
    icon: FaNetworkWired,
    iconColor: '#00aaff',
    skills: ['OSPF', 'EIGRP', 'VLAN', 'STP', 'NAT']
  },
  {
    title: 'Cisco / Networking',
    icon: SiCisco,
    iconColor: '#00ff41',
    skills: ['Packet Tracer', 'Routers', 'Switches', 'VLAN', 'NAT', 'OSPF']
  },
  {
    title: 'Cyber Security',
    icon: FaShieldAlt,
    iconColor: '#00ff41',
    skills: ['Firewall', 'IDS/IPS', 'OWASP', 'Hardening']
  },
  {
    title: 'SIEM Tools',
    icon: FaCheckCircle,
    iconColor: '#00ff41',
    skills: ['Splunk', 'Azure Sentinel']
  },
  {
    title: 'Vulnerability Scanning',
    icon: FaSearchPlus,
    iconColor: '#00ff41',
    skills: ['Nessus', 'OpenVAS', 'CVSS Assessment', 'Remediation']
  },
  {
    title: 'Linux',
    icon: FaLinux,
    iconColor: '#ffcc00',
    skills: ['Shell', 'Scripts', 'Troubleshooting']
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
          Technical & Security Skills
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
