
import React from 'react';
import { motion } from 'framer-motion';
import { EDGES } from '../constants';

const Edge: React.FC = () => {
  return (
    <div className="py-32 bg-[#000814] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-900/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-orange-500 mb-4">Technology + Touch</h2>
            <h3 className="text-4xl md:text-5xl font-serif silver-text mb-8 leading-tight">
              State-of-the-art equipment <br /> meets meticulous hand-detailing
            </h3>
            <p className="text-zinc-400 text-lg mb-12 leading-relaxed">
              At Autovine Wash, we don't believe in compromise. We use precision German 
              engineering to handle the heavy lifting, while our certified detailers provide 
              the final hand-finish that no machine can replicate.
            </p>

            <div className="grid gap-10">
              {EDGES.map((edge, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl glossy-black border border-zinc-800 flex items-center justify-center group-hover:border-orange-500/50 transition-colors">
                    {edge.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">{edge.title}</h4>
                    <p className="text-zinc-500 leading-relaxed">{edge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=1200"
                alt="Detailed foam washing"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000814]/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-10 left-10 right-10 p-8 glass-nav rounded-2xl border border-white/10">
                <div className="text-orange-500 font-bold uppercase tracking-widest text-[10px] mb-2">The Autovine Edge</div>
                <div className="text-xl font-bold">Unmatched Clean You Can Feel</div>
              </div>
            </div>
            
            {/* Floating Detail Image */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-2xl overflow-hidden border-8 border-[#000814] shadow-2xl hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=600"
                alt="Detailing"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Edge;
