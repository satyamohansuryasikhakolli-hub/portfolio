import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, FolderGit2, Sparkles, Terminal } from 'lucide-react';
import TiltCard from '../ui/TiltCard';
import { projectsData } from '../../data/content';

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-28 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-cyan font-mono text-xs mb-3"
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>DEPLOYED BUILDS // 03</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4"
        >
          Featured Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-cosmos-400 text-sm max-w-xl"
        >
          Intelligent systems, scalable applications, and research prototypes. Fill in your real repositories in <code className="text-neon-cyan font-mono text-xs bg-white/5 px-2 py-0.5 rounded">src/data/content.js</code>.
        </motion.p>
      </div>

      {/* Responsive Grid of 3D Tilt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.12 }}
          >
            <TiltCard
              glowColor={project.accentColor}
              className="p-7 flex flex-col justify-between h-full group"
            >
              <div>
                {/* Header Status & Placeholder Notice */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span className="font-mono text-[11px] text-cosmos-400 uppercase tracking-widest">
                      SYSTEM NODE // 0{idx + 1}
                    </span>
                  </div>

                  {project.isPlaceholder && (
                    <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple">
                      Customizable Placeholder
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3 group-hover:text-neon-cyan transition-colors">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-cosmos-200 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2.5 py-1 rounded-lg bg-cosmos-900/80 text-cosmos-200 border border-white/5 group-hover:border-neon-cyan/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons (GitHub & Live Link) */}
              <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cosmos-950/70 border border-white/10 text-cosmos-200 hover:text-white hover:border-neon-cyan/40 hover:shadow-neon-blue font-mono text-xs transition-all duration-300"
                    data-interactive="true"
                    aria-label={`GitHub code for ${project.title}`}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neon-blue/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-blue/20 hover:border-neon-cyan font-mono text-xs transition-all duration-300 hover:shadow-neon-blue"
                    data-interactive="true"
                    aria-label={`Live demo for ${project.title}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                </div>

                <span className="font-mono text-[11px] text-cosmos-400 group-hover:text-neon-cyan transition-colors">
                  EXPLORE &rarr;
                </span>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
