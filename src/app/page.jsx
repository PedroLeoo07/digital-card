"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Verifica se há preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Usa a preferência do sistema
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };
  return (
    <div className={`${styles.page} ${isDarkMode ? styles.dark : styles.light}`}>
      {/* Toggle de modo claro/escuro */}
      <button 
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
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
              alt="Leonardo Oliveira - Full Stack Developer"
              width={150}
              height={150}
              className={styles.profileImage}
              priority
            />
          </div>
        </div>

        {/* Header com nome e título */}
        <div className={styles.header}>
          <h1 className={styles.name}>Leonardo Oliveira</h1>
          <h2 className={styles.title}>Full Stack Developer</h2>
        </div>

        {/* Mini bio */}
        <div className={styles.bio}>
          <p>
            Desenvolvedor apaixonado por criar soluções inovadoras e eficientes.<br/>
            Especializado em JavaScript, React, Node.js e tecnologias modernas.
          </p>
        </div>

        {/* Frase de impacto */}
        <div className={styles.quote}>
          <p>"Construindo soluções criativas em código"</p>
        </div>

        {/* Links principais */}
        <div className={styles.links}>
          <a 
            href="https://dev-leonardo-portfolio.vercel.app/" 
            className={styles.linkButton}
            aria-label="Ver meu portfólio"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6H16L14 4H10L8 6H4C2.9 6 2 6.9 2 8V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Portfólio
          </a>

          <a 
            href="https://www.linkedin.com/in/leonardo-oliveira-38aab7321/" 
            className={styles.linkButton}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conectar no LinkedIn"
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
            aria-label="Ver meus projetos no GitHub"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 19C4 20.5 4 16.5 2 16M22 16V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H16C15.4696 21 14.9609 20.7893 14.5858 20.4142C14.2107 20.0391 14 19.5304 14 19V16.13C14.0375 15.6532 13.9731 15.1738 13.811 14.7238C13.6489 14.2738 13.3929 13.8634 13.06 13.52C16.2 13.17 19.5 11.93 19.5 6.52C19.4997 5.12383 18.9627 3.7812 18 2.77C18.4559 1.54851 18.4236 0.196583 17.91 -0.999996C17.91 -0.999996 16.73 -1.35 14 0.599996C11.708 0.0499965 9.292 0.0499965 7 0.599996C4.27 -1.35 3.09 -0.999996 3.09 -0.999996C2.57638 0.196583 2.54414 1.54851 3 2.77C2.03013 3.78866 1.49252 5.14087 1.5 6.55C1.5 11.92 4.8 13.16 7.94 13.51C7.611 13.851 7.35726 14.2608 7.19531 14.7104C7.03335 15.1601 6.96681 15.6393 7 16.12V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            GitHub
          </a>

      
        </div>
      </main>
    </div>
  );
}
