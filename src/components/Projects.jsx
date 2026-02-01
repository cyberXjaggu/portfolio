import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import '../styles/theme.css';

// Project Images
import climateLensImg from '../assets/climatelens.png';
import neuroApkImg from '../assets/neuro_apk.png';
import stegosphereImg from '../assets/stegosphere.png';

const PROJECTS_DATA = [
  {
    id: 1,
    title: 'ClimateLens: Voices from the Frontlines',
    description: 'A web-based platform for interactive storytelling of climate impacts and natural calamities using user-submitted local data. Summarizes stories using Gemini AI and presents them through interactive maps.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Mapbox', 'Gemini API', 'Node.js'],
    image: climateLensImg,
    github: 'https://github.com/cyberXjaggu/climatelens',
    demo: '#'
  },
  {
    id: 2,
    title: 'Neuro-APK Analyzer',
    description: 'A Python-based GUI tool for static analysis of Android APK files. Designed for security researchers and students to inspect APK permissions, malware signatures, and security vulnerabilities.',
    tech: ['Python', 'TKinter', 'Androguard', 'VirusTotal API'],
    image: neuroApkImg,
    github: 'https://github.com/cyberXjaggu/Neuro-APK',
    demo: '#'
  },
  {
    id: 3,
    title: 'Stego-Sphere',
    description: 'A steganography application that hides and reveals secret messages inside images using Least Significant Bit (LSB) technique. Features an intuitive GUI built with Python.',
    tech: ['Python', 'Tkinter', 'Pillow', 'Stegano'],
    image: stegosphereImg,
    github: 'https://github.com/cyberXjaggu/stegosphere',
    demo: '#'
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

const Projects = () => {
  const projects = useMemo(() => PROJECTS_DATA, []);
  const containerVariants = useMemo(() => ANIMATION_VARIANTS.container, []);
  const itemVariants = useMemo(() => ANIMATION_VARIANTS.item, []);

  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <motion.h2
          id="projects-title"
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Selected Projects
        </motion.h2>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-buttons">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-sm"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <FaGithub size={14} />
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-sm"
                    aria-label={`View ${project.title} demo`}
                  >
                    <FaExternalLinkAlt size={14} />
                    Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Projects);
