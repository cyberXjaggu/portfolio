import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaBriefcase } from 'react-icons/fa';
import '../styles/theme.css';

const CERTS_DATA = [
  {
    id: 1,
    title: 'Introduction to Cybersecurity',
    subtitle: 'CISCO Certified',
    organization: 'Cisco Networking Academy',
    type: 'certification',
    description: 'Comprehensive introduction to cybersecurity concepts, threats, and defense mechanisms'
  },
  {
    id: 2,
    title: 'Networking Basics',
    subtitle: 'CISCO Certified',
    organization: 'Cisco Networking Academy',
    type: 'certification',
    description: 'Foundational networking concepts covering TCP/IP, routing, switching, and network architecture'
  },
  {
    id: 3,
    title: 'Java Programming',
    subtitle: 'Professional Certificate',
    organization: 'Udemy',
    type: 'certification',
    description: 'Comprehensive Java programming course covering object-oriented concepts and applications'
  }
];

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }
};

const CERT_STYLES = {
  subtitle: { color: 'var(--secondary)', marginBottom: '0.5rem', fontSize: '0.95rem' },
  organization: { fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' },
  description: { fontSize: '0.9rem', lineHeight: '1.6' }
};

const Certifications = () => {
  const certs = useMemo(() => CERTS_DATA, []);
  const containerVariants = useMemo(() => ANIMATION_VARIANTS.container, []);
  const itemVariants = useMemo(() => ANIMATION_VARIANTS.item, []);

  return (
    <section className="section certifications" id="certifications" aria-labelledby="certs-title">
      <div className="container">
        <motion.h2 
          id="certs-title"
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Certifications & Internships
        </motion.h2>

        <motion.div 
          className="cert-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certs.map((cert) => {
            const IconComponent = cert.type === 'certification' ? FaCertificate : FaBriefcase;
            return (
              <motion.div 
                key={cert.id}
                className="cert-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="cert-icon">
                  <IconComponent aria-hidden="true" />
                </div>
                <h3>{cert.title}</h3>
                <p style={CERT_STYLES.subtitle}>
                  {cert.subtitle}
                </p>
                <p style={CERT_STYLES.organization}>
                  {cert.organization}
                </p>
                <p style={CERT_STYLES.description}>
                  {cert.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Certifications);
