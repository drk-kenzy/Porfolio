
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import ChatBot from './components/ChatBot';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Process from './components/Process';
import Testimonials from './components/Testimonials';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'process', 'projects', 'skills', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 250;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-20');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-600 selection:text-white">
      <Navbar activeSection={activeSection} />
      
      <main>
        <section id="hero"><Hero /></section>
        <section id="about" className="py-32 reveal-on-scroll opacity-0 translate-y-20 transition-all duration-1000"><About /></section>
        <section id="process" className="py-24 bg-[#03081c] reveal-on-scroll opacity-0 translate-y-20 transition-all duration-1000"><Process /></section>
        <section id="projects" className="py-32 bg-[#050b1a]/50 reveal-on-scroll opacity-0 translate-y-20 transition-all duration-1000"><Projects /></section>
        <section id="skills" className="py-32 reveal-on-scroll opacity-0 translate-y-20 transition-all duration-1000"><Skills /></section>
        <section id="testimonials" className="py-24 bg-[#03081c] reveal-on-scroll opacity-0 translate-y-20 transition-all duration-1000"><Testimonials /></section>
        <section id="contact" className="py-32 bg-[#050b1a]/50 reveal-on-scroll opacity-0 translate-y-20 transition-all duration-1000"><Contact /></section>
      </main>

      <footer className="py-24 border-t border-slate-900/50 text-center space-y-6 bg-[#020617]">
        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mx-auto animate-pulse shadow-[0_0_10px_rgba(37,99,235,1)]"></div>
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.6em] font-medium">HOUNTON Fred Marc-Owen</p>
        <p className="text-slate-700 text-[8px] uppercase tracking-widest italic">Esthétique & Excellence Numérique • {new Date().getFullYear()}</p>
      </footer>

      <ChatBot />
    </div>
  );
};

export default App;
