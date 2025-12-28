
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAR_TYPES, SERVICES } from '../constants';
import { Check, Info } from 'lucide-react';

const VISUALIZER_IMAGES: Record<string, Record<string, string>> = {
  sedan: {
    before: 'https://images.unsplash.com/photo-1597404294360-fedede04a0c3?auto=format&fit=crop&q=60&w=1200',
    'quick-exterior': 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=1200',
    'comprehensive-detail': 'https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=1200'
  },
  suv: {
    before: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=60&w=1200',
    'quick-exterior': 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1200',
    'comprehensive-detail': 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?auto=format&fit=crop&q=80&w=1200'
  },
  luxury: {
    before: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=60&w=1200',
    'quick-exterior': 'https://images.unsplash.com/photo-1542362567-b052d966953a?auto=format&fit=crop&q=80&w=1200',
    'comprehensive-detail': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200'
  }
};

const ServiceVisualizer: React.FC = () => {
  const [activeCar, setActiveCar] = useState(CAR_TYPES[0].id);
  const [activeService, setActiveService] = useState('quick-exterior');

  return (
    <div className="py-32 bg-zinc-950/50 border-y border-zinc-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Controls */}
          <div className="lg:w-1/3">
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-orange-500 mb-4">Interactive Preview</h2>
            <h3 className="text-4xl font-serif silver-text mb-8">Visualize the Result</h3>
            <p className="text-zinc-500 mb-10 leading-relaxed">
              Select your vehicle type and package to see the "Autovine Transformation" before you even arrive.
            </p>

            <div className="space-y-8">
              {/* Car Selection */}
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 block mb-4">Select Vehicle Type</span>
                <div className="flex flex-wrap gap-3">
                  {CAR_TYPES.map((car) => (
                    <button
                      key={car.id}
                      onClick={() => setActiveCar(car.id)}
                      className={`px-6 py-3 rounded-xl border transition-all flex items-center gap-3 ${
                        activeCar === car.id
                          ? 'bg-orange-600/10 border-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.1)]'
                          : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-xl">{car.icon}</span>
                      <span className="text-xs font-bold uppercase tracking-wider">{car.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 block mb-4">Select Treatment</span>
                <div className="flex flex-col gap-3">
                  {['before', ...SERVICES.map(s => s.id)].map((id) => (
                    <button
                      key={id}
                      onClick={() => setActiveService(id)}
                      className={`px-6 py-4 rounded-xl border text-left transition-all relative overflow-hidden group ${
                        activeService === id
                          ? 'bg-orange-600 border-orange-500 text-white'
                          : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <span className="text-xs font-bold uppercase tracking-widest">
                          {id === 'before' ? 'Original State' : SERVICES.find(s => s.id === id)?.title}
                        </span>
                        {activeService === id && <Check className="w-4 h-4" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visual Display */}
          <div className="lg:w-2/3">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl glossy-black group border border-zinc-800">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${activeCar}-${activeService}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={VISUALIZER_IMAGES[activeCar][activeService]}
                  alt="Transformation visualization"
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Overlay Tags */}
              <div className="absolute top-6 left-6 flex gap-3">
                <div className="px-4 py-2 glass-nav rounded-lg text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                  {activeService === 'before' ? 'Initial Dirt & Grime' : 'Post-Treatment Finish'}
                </div>
              </div>

              {/* Detail Highlights (Simulated) */}
              {activeService !== 'before' && (
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="absolute top-1/4 right-1/4"
                  >
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500 rounded-full text-[10px] font-bold shadow-xl animate-bounce">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      High-Gloss Reflection
                    </div>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Feature Checklist Comparison */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Water Beading',
                'Rim Restoration',
                'Deep Interior',
                'Paint Correction'
              ].map((feature, i) => {
                const isIncluded = activeService === 'comprehensive-detail' || (activeService === 'quick-exterior' && i < 2);
                return (
                  <div key={feature} className={`p-4 rounded-xl border text-center transition-all ${isIncluded ? 'bg-orange-500/5 border-orange-500/20' : 'bg-zinc-900/40 border-zinc-800 opacity-40'}`}>
                    <div className={`w-6 h-6 mx-auto mb-2 rounded-full flex items-center justify-center ${isIncluded ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-600'}`}>
                      {isIncluded ? <Check className="w-3 h-3" /> : <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-tighter text-zinc-300">{feature}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceVisualizer;
