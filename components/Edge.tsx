
import React from 'react';
import { motion } from 'framer-motion';
import { EDGES } from '../constants';
import { Hexagon } from 'lucide-react';

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
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-orange-500 mb-4">Autovine Sparkle & Shine</h2>
            <h3 className="text-4xl md:text-5xl font-serif silver-text mb-8 leading-tight">
              A Superior Detailing Bay <br /> on Utawala Road
            </h3>
            <p className="text-zinc-400 text-lg mb-12 leading-relaxed">
              Experience the power of our high-volume foam wash systems opposite Komarock Modern Hospital. 
              From a thorough body wash to professional machine buffing, we bring back that 
              showroom luster to every vehicle on Utawala Road.
            </p>

            <div className="grid gap-10">
              {EDGES.map((edge, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="relative flex-shrink-0 w-16 h-16 flex items-center justify-center">
                    <Hexagon className="absolute inset-0 text-zinc-800 group-hover:text-orange-500/50 transition-colors w-full h-full" />
                    <div className="relative z-10">{edge.icon}</div>
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
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative border border-zinc-800">
              {/* Image reflective of the foam-covered SUV in the bay */}
              <img
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1200"
                alt="Foam wash in the Autovine bay"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000814]/90 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-10 left-10 right-10 p-8 glass-nav rounded-3xl border border-white/5">
                <div className="text-orange-500 font-bold uppercase tracking-widest text-[10px] mb-2">The Autovine Edge</div>
                <div className="text-xl font-bold">Sparkle & Shine Guaranteed</div>
              </div>
            </div>
            
            {/* Hexagonal Floating Element */}
            <div className="absolute -top-10 -right-10 w-48 h-48 opacity-20 pointer-events-none">
              <Hexagon className="w-full h-full text-orange-500" />
            </div>

            {/* Floating Detail Image - Reflective of the Vacuum/Interior work */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-3xl overflow-hidden border-8 border-[#000814] shadow-2xl hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1618223672358-111117208362?auto=format&fit=crop&q=80&w=600"
                alt="Interior vacuuming detail"
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
