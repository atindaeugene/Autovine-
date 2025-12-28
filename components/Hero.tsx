
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play, Sparkles, Clock, ShieldCheck, Hexagon } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1552933529-e359b2477262?auto=format&fit=crop&q=80&w=2000"
          alt="Foam wash detailing at Autovine"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000814] via-[#000814]/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-[0.3em] uppercase text-orange-500 bg-orange-500/10 border border-orange-500/20 rounded-full">
                Autovine Wash
              </span>
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest italic">Sparkle & Shine</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] font-serif silver-text">
              Give Your Vehicle <br />
              <span className="italic text-orange-500">The Royal Treatment</span>
            </h1>
            
            <p className="text-xl text-zinc-300 mb-10 leading-relaxed max-w-2xl font-light">
              Nairobi's premier destination for high-tech foam washing, 
              precision buffing, and meticulous interior vacuuming.
            </p>

            {/* Quick Stats Grid with Hexagon Icons */}
            <div className="flex flex-wrap gap-8 mb-12">
              {[
                { label: 'Best Services', icon: <Sparkles className="w-4 h-4" /> },
                { label: 'Save Time', icon: <Clock className="w-4 h-4" /> },
                { label: 'Body Wash', icon: <ShieldCheck className="w-4 h-4" /> }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <Hexagon className="absolute inset-0 text-orange-600 fill-orange-600/20 w-full h-full" />
                    <div className="relative z-10 text-white">{item.icon}</div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a
                href="#services"
                className="group relative flex items-center px-10 py-5 bg-orange-600 text-white font-bold uppercase tracking-widest rounded shadow-[0_0_30px_rgba(249,115,22,0.2)] hover:bg-orange-500 transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Our Services
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/10 transition-transform duration-300"></div>
              </a>

              <button className="flex items-center gap-4 text-white group">
                <div className="w-14 h-14 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-orange-500 transition-colors">
                  <Play className="fill-current w-4 h-4 ml-1" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest group-hover:text-orange-400 transition-colors">
                  Watch Our Process
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decor inspired by first image */}
      <div className="absolute top-1/4 right-0 opacity-10 pointer-events-none hidden lg:block">
        <Hexagon className="w-[600px] h-[600px] text-zinc-700" />
      </div>
    </div>
  );
};

export default Hero;
