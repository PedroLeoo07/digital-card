"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { translations } from "./translations";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("pt");
  const [visitorCount, setVisitorCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error

  const t = translations[language];

  useEffect(() => {
    setMounted(true);
    
    // Verifica se há preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Usa a preferência do sistema
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    // Carrega idioma salvo
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    // Sistema de contador de visitas
    const VISITOR_KEY = 'digital_card_visitor_count';
    const LAST_VISIT_KEY = 'digital_card_last_visit';
    const currentTime = new Date().getTime();
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    
    // Considera uma nova visita se passou mais de 1 hora desde a última
    const ONE_HOUR = 60 * 60 * 1000;
    
    if (!lastVisit || (currentTime - parseInt(lastVisit)) > ONE_HOUR) {
      const currentCount = parseInt(localStorage.getItem(VISITOR_KEY) || '0');
      const newCount = currentCount + 1;
      localStorage.setItem(VISITOR_KEY, newCount.toString());
      localStorage.setItem(LAST_VISIT_KEY, currentTime.toString());
      setVisitorCount(newCount);
    } else {
      setVisitorCount(parseInt(localStorage.getItem(VISITOR_KEY) || '0'));
    }
  }, []);

  // Intersection Observer para animações ao scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(`.${styles.fadeInSection}`);
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [mounted]);

  useEffect(() => {
    // Aplica o tema ao document
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'pt' ? 'en' : 'pt';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulando envio (você pode integrar com um backend ou serviço de email)
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  if (!mounted) {
    return null; // Evita flash de conteúdo não hidratado
  }
  
  return (
    <div className={styles.page}>
      {/* Contador de Visitas */}
      <div className={styles.visitorCounter}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>{visitorCount.toLocaleString(language === 'pt' ? 'pt-BR' : 'en-US')}</span>
      </div>

      {/* Toggle de idioma */}
      <button 
        className={styles.languageToggle}
        onClick={toggleLanguage}
        aria-label={t.aria.switchLanguage}
      >
        {language === 'pt' ? '🇺🇸 EN' : '🇧🇷 PT'}
      </button>

      {/* Toggle de modo claro/escuro */}
      <button 
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label={isDarkMode ? t.aria.lightMode : t.aria.darkMode}
      >
        {isDarkMode ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3V5M12 19V21M5.64 5.64L7.05 7.05M16.95 16.95L18.36 18.36M1 12H3M21 12H23M5.64 18.36L7.05 16.95M16.95 7.05L18.36 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      <main className={styles.main}>
        {/* Foto de perfil */}
        <div className={styles.profileContainer}>
          <div className={styles.profileImageWrapper}>
            <Image
              src="/image/landingPage.jpg"
              alt="Foto profissional de Leonardo Oliveira, desenvolvedor Full Stack especializado em React, Next.js e Node.js"
              width={150}
              height={150}
              className={styles.profileImage}
              priority
              loading="eager"
              quality={90}
            />
          </div>
        </div>

        {/* Header com nome e título */}
        <div className={styles.header}>
          <h1 className={styles.name}>Leonardo Oliveira</h1>
          <h2 className={styles.title}>{t.title}</h2>
        </div>

        {/* Mini bio */}
        <div className={styles.bio}>
          <p>
            {t.bio.part1 && <>{t.bio.part1} </>}
            <strong>{t.bio.highlight1}</strong> {t.bio.part2} <strong>{t.bio.highlight2}</strong> {t.bio.part3} <strong>{t.bio.highlight3}</strong>
            {t.bio.part4} <strong>{t.bio.highlight4}</strong> {t.bio.part5}
          </p>
        </div>

        {/* CTA Principal */}
        <div className={styles.ctaSection}>
          <a 
            href="https://dev-leonardo-portfolio.vercel.app/" 
            className={styles.ctaPrimary}
            aria-label={t.aria.viewProjects}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.27002 6.96L12 12.01L20.73 6.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.buttons.viewProjects}
          </a>
          <a 
            href="mailto:leonardo.dev@email.com" 
            className={styles.ctaSecondary}
            aria-label={t.aria.sendEmail}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.buttons.contact}
          </a>
        </div>

        {/* Skills */}
        <div className={styles.skills}>
          <span className={styles.skill}>JavaScript</span>
          <span className={styles.skill}>TypeScript</span>
          <span className={styles.skill}>React</span>
          <span className={styles.skill}>Next.js</span>
          <span className={styles.skill}>React Native</span>
          <span className={styles.skill}>Node.js</span>
          <span className={styles.skill}>Express</span>
          <span className={styles.skill}>MongoDB</span>
          <span className={styles.skill}>PostgreSQL</span>
          <span className={styles.skill}>Git</span>
          <span className={styles.skill}>Docker</span>
          <span className={styles.skill}>REST API</span>
          <span className={styles.skill}>HTML/CSS</span>
          <span className={styles.skill}>Tailwind CSS</span>
        </div>

        {/* Disponibilidade */}
        <div className={`${styles.availabilitySection} ${styles.fadeInSection}`}>
          <h3 className={styles.sectionTitle}>{t.availability.title}</h3>
          <div className={styles.availabilityCard}>
            <div className={styles.availabilityStatus}>
              <span className={styles.statusDot}></span>
              {t.availability.status}
            </div>
            <p className={styles.availabilityTypes}>{t.availability.types}</p>
            <div className={styles.workPreferences}>
              <span className={styles.workBadge}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t.availability.remote}
              </span>
            </div>
          </div>
        </div>

        {/* Localização */}
        <div className={`${styles.locationSection} ${styles.fadeInSection}`}>
          <h3 className={styles.sectionTitle}>{t.sections.location}</h3>
          <div className={styles.locationCard}>
            <div className={styles.locationItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{t.location.city}</span>
            </div>
            <div className={styles.locationItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>{t.location.timezone}</span>
            </div>
          </div>
        </div>

        {/* Certificações */}
        <div className={`${styles.certificationsSection} ${styles.fadeInSection}`}>
          <h3 className={styles.sectionTitle}>{t.sections.certifications}</h3>
          <div className={styles.certificationsList}>
            <div className={styles.certBadge}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t.certifications.cert1}
            </div>
            <div className={styles.certBadge}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t.certifications.cert2}
            </div>
            <div className={styles.certBadge}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t.certifications.cert3}
            </div>
          </div>
        </div>

        {/* Formulário de Contato */}
        <div className={`${styles.contactFormSection} ${styles.fadeInSection}`}>
          <h3 className={styles.sectionTitle}>{t.sections.contactForm}</h3>
          <form onSubmit={handleFormSubmit} className={styles.contactForm}>
            <div className={styles.formRow}>
              <input
                type="text"
                name="name"
                placeholder={t.form.name}
                value={formData.name}
                onChange={handleFormChange}
                required
                className={styles.formInput}
              />
              <input
                type="email"
                name="email"
                placeholder={t.form.email}
                value={formData.email}
                onChange={handleFormChange}
                required
                className={styles.formInput}
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder={t.form.subject}
              value={formData.subject}
              onChange={handleFormChange}
              required
              className={styles.formInput}
            />
            <textarea
              name="message"
              placeholder={t.form.message}
              value={formData.message}
              onChange={handleFormChange}
              required
              rows="5"
              className={styles.formTextarea}
            />
            <button 
              type="submit" 
              className={styles.formButton}
              disabled={formStatus === 'sending'}
            >
              {formStatus === 'sending' ? t.form.sending : t.form.send}
            </button>
            {formStatus === 'success' && (
              <div className={styles.formSuccess}>{t.form.success}</div>
            )}
            {formStatus === 'error' && (
              <div className={styles.formError}>{t.form.error}</div>
            )}
          </form>
        </div>

        {/* Seção de Contato */}
        <div className={styles.contactSection}>
          <h3 className={styles.sectionTitle}>{t.sections.contact}</h3>
          <div className={styles.contactInfo}>
            <a 
              href="mailto:leonardo.dev@email.com" 
              className={styles.contactItem}
              aria-label={t.aria.sendEmail}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              leonardo.p.oliveira12@aluno.senai.br
            </a>
            <a 
              href="https://curriculo-online-three.vercel.app/" 
              className={styles.contactItem}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.aria.viewResume}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t.buttons.resume}
            </a>
          </div>
        </div>

        {/* Links principais */}
        <div className={styles.links}>
          <a 
            href="https://dev-leonardo-portfolio.vercel.app/" 
            className={styles.linkButton}
            aria-label={t.aria.viewPortfolio}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6H16L14 4H10L8 6H4C2.9 6 2 6.9 2 8V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.buttons.portfolio}
          </a>

          <a 
            href="https://www.linkedin.com/in/leonardo-oliveira-38aab7321/" 
            className={styles.linkButton}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.aria.connectLinkedIn}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            LinkedIn
          </a>

          <a 
            href="https://github.com/PedroLeoo07" 
            className={styles.linkButton}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.aria.viewGitHub}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 19C4 20.5 4 16.5 2 16M22 16V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H16C15.4696 21 14.9609 20.7893 14.5858 20.4142C14.2107 20.0391 14 19.5304 14 19V16.13C14.0375 15.6532 13.9731 15.1738 13.811 14.7238C13.6489 14.2738 13.3929 13.8634 13.06 13.52C16.2 13.17 19.5 11.93 19.5 6.52C19.4997 5.12383 18.9627 3.7812 18 2.77C18.4559 1.54851 18.4236 0.196583 17.91 -0.999996C17.91 -0.999996 16.73 -1.35 14 0.599996C11.708 0.0499965 9.292 0.0499965 7 0.599996C4.27 -1.35 3.09 -0.999996 3.09 -0.999996C2.57638 0.196583 2.54414 1.54851 3 2.77C2.03013 3.78866 1.49252 5.14087 1.5 6.55C1.5 11.92 4.8 13.16 7.94 13.51C7.611 13.851 7.35726 14.2608 7.19531 14.7104C7.03335 15.1601 6.96681 15.6393 7 16.12V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            GitHub
          </a>

      
        </div>
      </main>

      {/* Botão WhatsApp Flutuante */}
      <a 
        href="https://wa.me/5511999999999" 
        className={styles.whatsappButton}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.aria.whatsapp}
      >
        <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.164 0 0 7.163 0 16c0 2.83.744 5.488 2.044 7.787L0 32l8.385-2.012A15.935 15.935 0 0016 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm0 29.333c-2.455 0-4.8-.67-6.827-1.94l-.49-.29-5.076 1.219 1.25-4.96-.32-.51A13.243 13.243 0 012.667 16c0-7.364 5.97-13.333 13.333-13.333S29.333 8.636 29.333 16 23.364 29.333 16 29.333z"/>
          <path d="M23.19 19.642c-.372-.186-2.195-1.083-2.537-1.206-.342-.124-.591-.186-.84.186-.248.372-.962 1.206-1.18 1.454-.217.248-.434.279-.806.093-.372-.186-1.571-.58-2.991-1.848-1.105-.987-1.851-2.206-2.068-2.578-.217-.372-.023-.573.163-.758.167-.166.372-.434.558-.651.186-.217.248-.372.372-.62.124-.249.062-.466-.031-.652-.093-.186-.84-2.024-1.15-2.77-.303-.726-.611-.627-.84-.639-.217-.01-.466-.012-.714-.012s-.651.093-1.053.466c-.403.372-1.538 1.504-1.538 3.665s1.575 4.25 1.794 4.541c.217.291 3.093 4.723 7.496 6.625 1.046.452 1.865.722 2.503.925.1.03 1.146.376 1.643.232.604-.18 2.195-.899 2.506-1.766.31-.867.31-1.61.217-1.766-.093-.155-.341-.248-.713-.434z"/>
        </svg>
      </a>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2026 Leonardo Oliveira. {t.footer.rights}.</p>
          <p className={styles.footerMade}>
            {t.footer.madeWith} <span className={styles.heart}>❤️</span> {t.footer.by} Leonardo
          </p>
        </div>
      </footer>
    </div>
  );
}
