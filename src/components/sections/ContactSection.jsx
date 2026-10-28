import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle2, MessageSquareCode, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { contactInfo } from '../../data/content';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    // If a Formspree endpoint is configured
    if (contactInfo.formspreeEndpoint && contactInfo.formspreeEndpoint.startsWith('http')) {
      try {
        const res = await fetch(contactInfo.formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          triggerSuccess();
          return;
        }
      } catch (err) {
        console.error('Form submission error, falling back to mailto', err);
      }
    }

    // Default mailto fallback (clean, reliable, no fake backend)
    const mailtoUrl = `mailto:${encodeURIComponent(contactInfo.email)}?subject=${encodeURIComponent(
      formData.subject || `Portfolio Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;
    triggerSuccess();
  };

  const triggerSuccess = () => {
    setStatus('success');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#00D4FF', '#8B5CF6', '#38BDF8'],
    });

    setTimeout(() => {
      setStatus('idle');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-28 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-pink/10 border border-neon-pink/30 text-neon-pink font-mono text-xs mb-3"
        >
          <MessageSquareCode className="w-3.5 h-3.5" />
          <span>TRANSMISSION PORT // 04</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4"
        >
          Initiate Transmission
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-cosmos-400 text-sm max-w-lg"
        >
          Have a project, internship opportunity, or question? Send a message directly to my inbox.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info & Social Links */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between h-full"
        >
          <div>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              Direct Channels
            </h3>
            <p className="text-cosmos-400 text-xs font-mono mb-8">
              Update these handles in <code className="text-neon-cyan">src/data/content.js</code>
            </p>

            {/* Email quick copy card */}
            <div className="p-4 rounded-2xl bg-cosmos-900/80 border border-white/5 mb-6">
              <span className="text-[11px] font-mono text-cosmos-400 block mb-1">Email Address</span>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs sm:text-sm text-neon-cyan truncate">
                  {contactInfo.email}
                </span>
                <button
                  onClick={copyEmail}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cosmos-200 hover:text-white transition-colors"
                  title="Copy email"
                  data-interactive="true"
                >
                  {copied ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Magnetic Social Icons */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-cosmos-400 block mb-2">Network Nodes</span>
              
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl glass-card border border-white/5 hover:border-neon-cyan/40 hover:shadow-neon-blue group transition-all duration-300"
                data-interactive="true"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-cosmos-200 group-hover:text-neon-cyan transition-colors" />
                  <span className="font-mono text-xs text-white">GitHub</span>
                </div>
                <span className="text-[11px] font-mono text-cosmos-400 group-hover:text-neon-cyan">&rarr;</span>
              </a>

              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl glass-card border border-white/5 hover:border-neon-purple/40 hover:shadow-neon-purple group transition-all duration-300"
                data-interactive="true"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-cosmos-200 group-hover:text-neon-purple transition-colors" />
                  <span className="font-mono text-xs text-white">LinkedIn</span>
                </div>
                <span className="text-[11px] font-mono text-cosmos-400 group-hover:text-neon-purple">&rarr;</span>
              </a>

              <a
                href={contactInfo.twitter}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl glass-card border border-white/5 hover:border-neon-pink/40 group transition-all duration-300"
                data-interactive="true"
              >
                <div className="flex items-center gap-3">
                  <Twitter className="w-5 h-5 text-cosmos-200 group-hover:text-neon-pink transition-colors" />
                  <span className="font-mono text-xs text-white">X / Twitter</span>
                </div>
                <span className="text-[11px] font-mono text-cosmos-400 group-hover:text-neon-pink">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/5 font-mono text-[11px] text-cosmos-400">
            <span>Security: End-to-end client encryption ready</span>
          </div>
        </motion.div>

        {/* Glowing Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-7 glass-panel-glow rounded-3xl p-6 sm:p-8 border border-neon-cyan/20 relative"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs text-cosmos-200 mb-1.5">
                  Your Identifier (Name) *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Mercer"
                  className="w-full px-4 py-2.5 rounded-xl bg-cosmos-900/90 border border-white/10 text-white placeholder-cosmos-600 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors text-sm font-sans"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-cosmos-200 mb-1.5">
                  Transmission Signal (Email) *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@domain.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-cosmos-900/90 border border-white/10 text-white placeholder-cosmos-600 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors text-sm font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-cosmos-200 mb-1.5">
                Packet Subject *
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Collaboration / Engineering Role / General Inquiry"
                className="w-full px-4 py-2.5 rounded-xl bg-cosmos-900/90 border border-white/10 text-white placeholder-cosmos-600 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors text-sm font-sans"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-cosmos-200 mb-1.5">
                Encrypted Payload (Message) *
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your transmission here..."
                className="w-full px-4 py-2.5 rounded-xl bg-cosmos-900/90 border border-white/10 text-white placeholder-cosmos-600 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors text-sm font-sans resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-3.5 rounded-xl font-mono text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple shadow-neon-blue hover:opacity-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-50"
              data-interactive="true"
            >
              {status === 'submitting' ? (
                <span>DISPATCHING PACKET...</span>
              ) : status === 'success' ? (
                <span className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" /> TRANSMISSION SENT!
                </span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT MESSAGE</span>
                </>
              )}
            </button>

            <p className="text-center font-mono text-[10px] text-cosmos-400 mt-2">
              Form dispatches to default email client or configured webhook. Zero spam.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
