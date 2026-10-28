import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { skillsData } from '../../data/content';

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...skillsData.map((s) => s.category)];

  const filteredCategories =
    selectedCategory === 'All'
      ? skillsData
      : skillsData.filter((c) => c.category === selectedCategory);

  return (
    <section id="skills" className="relative py-28 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-mono text-xs mb-3"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>CAPABILITY MATRIX // 02</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4"
        >
          Technical Arsenal
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-cosmos-400 text-sm max-w-xl"
        >
          Curated domain competencies across machine learning, software engineering, and systems.
        </motion.p>
      </div>

      {/* Category Filter Pills */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-2 mb-12"
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-mono text-xs transition-all duration-300 relative ${
                isSelected
                  ? 'text-white border border-neon-cyan/50 shadow-neon-blue bg-neon-blue/15'
                  : 'text-cosmos-400 glass-card border border-white/5 hover:text-white hover:border-white/20'
              }`}
              data-interactive="true"
            >
              {isSelected && (
                <motion.div
                  layoutId="skillsTab"
                  className="absolute inset-0 rounded-xl bg-neon-blue/10 border border-neon-cyan/40"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCategories.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: groupIdx * 0.1 }}
              className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between group hover:border-neon-cyan/30 transition-all duration-300"
            >
              <div>
                {/* Category Title */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-semibold text-lg text-white group-hover:text-neon-cyan transition-colors">
                    {group.category}
                  </h3>
                  <Layers className="w-4 h-4 text-cosmos-400 group-hover:text-neon-cyan transition-colors" />
                </div>
                <p className="text-cosmos-400 text-xs mb-6 font-mono">
                  {group.description}
                </p>

                {/* Skill Pills */}
                <div className="space-y-3.5">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-cosmos-900/60 border border-white/5 hover:border-neon-cyan/30 transition-all duration-200 group/pill"
                    >
                      <div className="flex justify-between items-center mb-1.5 text-xs">
                        <span className="font-mono text-white flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neon-cyan border border-white/10">
                          {skill.tag}
                        </span>
                      </div>

                      {/* Animated Proficiency Bar */}
                      <div className="w-full h-1.5 bg-cosmos-950 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_8px_#00D4FF]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Status */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-cosmos-400">
                <span>Active Stack</span>
                <span className="text-neon-cyan flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
