import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Cpu } from 'lucide-react';
import { personalInfo } from '../../data/content';

const NAV_ITEMS = [
  { label: 'Core', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Hardware-accelerated IntersectionObserver for smooth section spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-25% 0px -50% 0px' }
    );

    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 py-4 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`pointer-events-auto w-full max-w-5xl rounded-full px-5 py-3 transition-all duration-300 flex items-center justify-between ${
          isScrolled
            ? 'glass-panel border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl'
            : 'bg-cosmos-900/40 border border-white/5 backdrop-blur-md'
        }`}
      >
        {/* Logo / Brand */}
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, '#hero')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-blue to-neon-purple p-[1px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-cosmos-950 rounded-[7px] flex items-center justify-center">
              <Cpu className="w-4 h-4 text-neon-cyan transition-colors group-hover:text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-wider text-white group-hover:text-neon-cyan transition-colors">
              SATYA.AI
            </span>
            <span className="font-mono text-[9px] text-cosmos-400 tracking-widest uppercase">
              Neural Node
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 bg-cosmos-950/60 p-1 rounded-full border border-white/5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                className={`relative px-4 py-1.5 rounded-full font-mono text-xs transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-cosmos-400 hover:text-cosmos-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-cyan/40 shadow-[0_0_12px_rgba(0,212,255,0.25)]"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Status indicator / CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, '#contact')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-cyan font-mono text-xs transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]"
          >
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span>Connect</span>
          </a>
        </div>

        {/* Mobile menu hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/5 text-cosmos-200 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto absolute top-20 left-4 right-4 glass-panel rounded-2xl p-5 border border-white/10 shadow-2xl flex flex-col gap-3 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                className={`px-4 py-2.5 rounded-xl font-mono text-sm transition-colors ${
                  activeSection === item.href.slice(1)
                    ? 'bg-neon-blue/15 text-neon-cyan border border-neon-cyan/30'
                    : 'text-cosmos-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/5">
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, '#contact')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white text-center font-mono text-xs font-semibold block shadow-neon-blue"
              >
                Initiate Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
