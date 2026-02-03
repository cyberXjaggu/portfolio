import { useState, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaCopy, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import '../styles/theme.css';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_3qn9qqd';
const EMAILJS_TEMPLATE_ID = 'template_jh2bboe';
const EMAILJS_PUBLIC_KEY = '5kSLf7O0CVCCWZSAk';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MY_EMAIL = 'jmail3553@gmail.com';
const MY_PHONE = '+91-9216951330';

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [copiedType, setCopiedType] = useState(''); // 'email', 'phone', 'message', or ''

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (formStatus.type === 'error') setFormStatus({ type: '', message: '' });
  }, [formStatus.type]);

  const validateForm = useCallback(() => {
    if (!formData.name.trim()) {
      setFormStatus({ type: 'error', message: 'Name is required' });
      return false;
    }
    if (!formData.email.trim()) {
      setFormStatus({ type: 'error', message: 'Email is required' });
      return false;
    }
    if (!EMAIL_REGEX.test(formData.email)) {
      setFormStatus({ type: 'error', message: 'Invalid email format' });
      return false;
    }
    if (!formData.message.trim()) {
      setFormStatus({ type: 'error', message: 'Message cannot be empty' });
      return false;
    }
    return true;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormStatus({ type: 'info', message: 'Sending message...' });

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setFormStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus({ type: 'error', message: 'Failed to send message. Please try again or email me directly.' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus({ type: '', message: '' }), 5000);
    }
  }, [formData, validateForm]);

  const handleCopy = useCallback((text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(''), 2000);
    });
  }, []);

  const handleCopyFormMessage = useCallback(() => {
    if (!formData.message.trim()) {
      // If form is empty, copy email address as fallback
      handleCopy(MY_EMAIL, 'email');
      return;
    }
    const fullMessage = `From: ${formData.name} (${formData.email})\n\n${formData.message}`;
    handleCopy(fullMessage, 'message');
  }, [formData, handleCopy]);

  const containerVariants = useMemo(() => ANIMATION_VARIANTS.container, []);
  const itemVariants = useMemo(() => ANIMATION_VARIANTS.item, []);

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <motion.h2
          id="contact-title"
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>

        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Contact Details Column */}
          <motion.div className="contact-info" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <h3 className="contact-subtitle">Contact Information</h3>
            </motion.div>

            <motion.div className="contact-item" variants={itemVariants} onClick={() => handleCopy(MY_PHONE, 'phone')}>
              <div className="contact-icon-box">
                <FaPhone aria-hidden="true" />
              </div>
              <div className="contact-item-text">
                <p>Phone</p>
                <span className="contact-link">{MY_PHONE}</span>
                {copiedType === 'phone' && <span className="copy-indicator">Copied!</span>}
              </div>
            </motion.div>

            <motion.div className="contact-item" variants={itemVariants} onClick={() => handleCopy(MY_EMAIL, 'email')}>
              <div className="contact-icon-box">
                <FaEnvelope aria-hidden="true" />
              </div>
              <div className="contact-item-text">
                <p>Email</p>
                <span className="contact-link">{MY_EMAIL}</span>
                {copiedType === 'email' && <span className="copy-indicator">Copied!</span>}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="social-follow">
              <p>Follow Me</p>
              <div className="social-links">
                <a href="https://linkedin.com/in/jagarnath-mali-b36a40328/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin aria-hidden="true" />
                </a>
                <a href="https://github.com/cyberXjaggu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div className="contact-form-wrapper" variants={itemVariants}>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  aria-label="Your Name"
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  aria-label="Your Email"
                  required
                />
              </div>
              <div className="input-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  aria-label="Your Message"
                  required
                ></textarea>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className={`btn-send ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  <FaPaperPlane className={isSubmitting ? 'spinning' : ''} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                <button
                  type="button"
                  className="btn-copy"
                  onClick={handleCopyFormMessage}
                  title="Copy message or email"
                >
                  <FaCopy />
                  {copiedType === 'message' ? 'Copied Message!' : (copiedType === 'email' ? 'Copied Email!' : 'Copy')}
                </button>
              </div>

              <AnimatePresence>
                {formStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`status-alert ${formStatus.type}`}
                    role="alert"
                    aria-live="polite"
                  >
                    {formStatus.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                    {formStatus.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Contact);
