
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Recycle, ShieldCheck } from 'lucide-react';

const EcoSection: React.FC = () => {
  return (
    <div className="py-32 bg-[#000814] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-950/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Leaf className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-emerald-500 mb-4">Sustainability First</h2>
            <h3 className="text-4xl md:text-5xl font-serif silver-text mb-8">A Superior Clean <br /> That Respects Our Planet</h3>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Luxury doesn't have to cost the earth. We've invested in closed-loop water 
              systems and biodegradable cleaning agents that deliver a deeper clean 
              without harsh environmental impacts.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Biodegradable Chemicals',
              desc: 'pH-neutral shampoos and dressings that are tough on dirt but safe for the environment.',
              icon: <Recycle className="w-6 h-6 text-emerald-500" />
            },
            {
              title: 'Water Recovery System',
              desc: 'Our filtration technology recycles 85% of water used in every wash cycle.',
              icon: <Droplets className="w-6 h-6 text-emerald-500" />
            },
            {
              title: 'Non-Toxic Protection',
              desc: 'Premium ceramic and wax protections free from volatile organic compounds.',
              icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 rounded-3xl bg-zinc-900/20 border border-zinc-800 hover:border-emerald-500/30 transition-all group"
            >
              <div className="mb-6">{item.icon}</div>
              <h4 className="text-xl font-bold mb-4 text-white group-hover:text-emerald-400 transition-colors">{item.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcoSection;
