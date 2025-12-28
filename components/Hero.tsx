
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1552933529-e359b2477262?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury car with water beads"
          className="w-full h-full object-cover grayscale-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000814] via-[#000814]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase text-orange-500 bg-orange-500/10 border border-orange-500/20 rounded-full">
              Premium Automotive Detailing
            </span>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] font-serif silver-text">
              Give Your Vehicle <br />
              <span className="italic">The Royal Treatment</span>
            </h1>
            <p className="text-xl text-zinc-300 mb-10 leading-relaxed max-w-2xl font-light">
              Experience the perfect fusion of cutting-edge technology and 
              meticulous hand-detailing. Luxury quality, delivered with modern speed.
            </p>

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

      {/* Stats Overlay */}
      <div className="absolute bottom-12 right-0 hidden lg:block pr-6">
        <div className="flex gap-16 border-l border-zinc-800 pl-12 py-4">
          {[
            { label: 'Wait Time', value: '15 Min' },
            { label: 'Satisfaction', value: '100%' },
            { label: 'Eco-Saved', value: '45k Liters' }
          ].map((stat, idx) => (
            <div key={idx}>
              <div className="text-3xl font-bold mb-1 silver-text">{stat.value}</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
