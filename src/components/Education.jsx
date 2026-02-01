import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBook } from 'react-icons/fa';
import '../styles/theme.css';

const EDUCATION_DATA = [
  {
    id: 1,
    degree: 'B.E. Computer Science and Engineering',
    school: 'Chennai Institute of Technology, Chennai, India',
    year: '2024 - 2028',
    icon: FaGraduationCap,
    description: 'Pursuing a degree in Computer Science with focus on cybersecurity, app development, and web development'
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

const EDU_STYLES = {
  iconContainer: { fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--secondary)' },
  school: { color: 'var(--text-secondary)', marginBottom: '0.5rem' },
  year: { color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem' },
  description: { color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }
};

const Education = () => {
  const education = useMemo(() => EDUCATION_DATA, []);
  const containerVariants = useMemo(() => ANIMATION_VARIANTS.container, []);
  const itemVariants = useMemo(() => ANIMATION_VARIANTS.item, []);

  return (
    <section className="section education" id="education" aria-labelledby="education-title">
      <div className="container">
        <motion.h2 
          id="education-title"
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Education
        </motion.h2>

        <motion.div 
          className="education-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {education.map((edu) => {
            const IconComponent = edu.icon;
            return (
              <motion.div 
                key={edu.id}
                className="education-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div style={EDU_STYLES.iconContainer} aria-label={edu.degree}>
                  <IconComponent />
                </div>
                <h3>{edu.degree}</h3>
                <p style={EDU_STYLES.school}>
                  {edu.school}
                </p>
                <p style={EDU_STYLES.year}>
                  {edu.year}
                </p>
                <p style={EDU_STYLES.description}>
                  {edu.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Education);
