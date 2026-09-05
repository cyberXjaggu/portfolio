import { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaCopy, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import '../styles/theme.css';

// EmailJS Configuration — loaded from environment variables (see .env.example)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MY_EMAIL = 'jmail3553@gmail.com';
const MY_PHONE = '+91-9216951330';

// Input validation limits
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;

// Rate limiting: minimum seconds between submissions
const SUBMISSION_COOLDOWN_MS = 30_000;

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
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const statusTimeoutRef = useRef(null);
  const copyTimeoutRef = useRef(null);
  const cooldownTimerRef = useRef(null);
  const lastSubmitTimeRef = useRef(0);

  useEffect(() => {
    return () => {
      clearTimeout(statusTimeoutRef.current);
      clearTimeout(copyTimeoutRef.current);
      clearInterval(cooldownTimerRef.current);
    };
  }, []);

  const startCooldown = useCallback(() => {
    lastSubmitTimeRef.current = Date.now();
    setCooldownRemaining(Math.ceil(SUBMISSION_COOLDOWN_MS / 1000));
    clearInterval(cooldownTimerRef.current);
    cooldownTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - lastSubmitTimeRef.current;
      const remaining = Math.ceil((SUBMISSION_COOLDOWN_MS - elapsed) / 1000);
      if (remaining <= 0) {
        setCooldownRemaining(0);
        clearInterval(cooldownTimerRef.current);
      } else {
        setCooldownRemaining(remaining);
      }
    }, 1000);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (formStatus.type === 'error') setFormStatus({ type: '', message: '' });
  }, [formStatus.type]);

  const validateForm = useCallback(() => {
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      setFormStatus({ type: 'error', message: 'Name is required' });
      return false;
    }
    if (trimmedName.length > MAX_NAME_LENGTH) {
      setFormStatus({ type: 'error', message: `Name must be ${MAX_NAME_LENGTH} characters or fewer` });
      return false;
    }
    if (!trimmedEmail) {
      setFormStatus({ type: 'error', message: 'Email is required' });
      return false;
    }
    if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
      setFormStatus({ type: 'error', message: 'Email address is too long' });
      return false;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setFormStatus({ type: 'error', message: 'Invalid email format' });
      return false;
    }
    if (!trimmedMessage) {
      setFormStatus({ type: 'error', message: 'Message cannot be empty' });
      return false;
    }
    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      setFormStatus({ type: 'error', message: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer` });
      return false;
    }
    return true;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    // Rate limiting check
    if (cooldownRemaining > 0) {
      setFormStatus({ type: 'error', message: `Please wait ${cooldownRemaining}s before sending another message.` });
      return;
    }

    if (!validateForm()) return;

    // Check that EmailJS is configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setFormStatus({ type: 'error', message: 'Contact form is not configured. Please email me directly.' });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: 'info', message: 'Sending message...' });

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        },
        EMAILJS_PUBLIC_KEY
      );
      setFormStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
      setFormData({ name: '', email: '', message: '' });
      startCooldown();
    } catch {
      setFormStatus({ type: 'error', message: 'Failed to send message. Please try again or email me directly.' });
    } finally {
      setIsSubmitting(false);
      clearTimeout(statusTimeoutRef.current);
      statusTimeoutRef.current = setTimeout(() => setFormStatus({ type: '', message: '' }), 5000);
    }
  }, [formData, validateForm, cooldownRemaining, startCooldown]);

  const handleCopy = useCallback((text, type) => {
    if (!navigator.clipboard) {
      setFormStatus({ type: 'error', message: 'Copy is not available in this browser.' });
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopiedType(''), 2000);
    }).catch(() => {
      setFormStatus({ type: 'error', message: 'Could not copy. Please copy the text manually.' });
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

            <motion.button
              type="button"
              className="contact-item"
              variants={itemVariants}
              onClick={() => handleCopy(MY_PHONE, 'phone')}
              aria-label={`Copy phone number ${MY_PHONE}`}
            >
              <div className="contact-icon-box">
                <FaPhone aria-hidden="true" />
              </div>
              <div className="contact-item-text">
                <p>Phone</p>
                <span className="contact-link">{MY_PHONE}</span>
                {copiedType === 'phone' && <span className="copy-indicator">Copied!</span>}
              </div>
            </motion.button>

            <motion.button
              type="button"
              className="contact-item"
              variants={itemVariants}
              onClick={() => handleCopy(MY_EMAIL, 'email')}
              aria-label={`Copy email ${MY_EMAIL}`}
            >
              <div className="contact-icon-box">
                <FaEnvelope aria-hidden="true" />
              </div>
              <div className="contact-item-text">
                <p>Email</p>
                <span className="contact-link">{MY_EMAIL}</span>
                {copiedType === 'email' && <span className="copy-indicator">Copied!</span>}
              </div>
            </motion.button>

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
                  maxLength={MAX_NAME_LENGTH}
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
                  maxLength={MAX_EMAIL_LENGTH}
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
                  maxLength={MAX_MESSAGE_LENGTH}
                  aria-label="Your Message"
                  required
                ></textarea>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className={`btn-send ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting || cooldownRemaining > 0}
                >
                  <FaPaperPlane className={isSubmitting ? 'spinning' : ''} />
                  {isSubmitting ? 'Sending...' : cooldownRemaining > 0 ? `Wait ${cooldownRemaining}s` : 'Send Message'}
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
