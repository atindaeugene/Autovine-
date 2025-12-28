
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <div className="py-32 bg-[#000814]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-orange-500 mb-4">Choose Your Treatment</h2>
            <h3 className="text-4xl md:text-5xl font-serif silver-text mb-6">World-Class Service Menu</h3>
            <p className="text-zinc-500 text-lg">
              From a quick refresh to a complete restoration, we provide a seamless 
              experience tailored to your schedule and vehicle's needs.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group relative h-full flex flex-col glossy-black rounded-3xl border border-zinc-800 overflow-hidden hover:border-orange-500/30 transition-all shadow-xl"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent"></div>
                <div className="absolute top-6 right-6 px-4 py-2 glass-nav rounded-full text-sm font-bold silver-text border border-white/5">
                  {service.price}
                </div>
              </div>

              <div className="p-10 flex-grow flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  <h4 className="text-2xl font-bold">{service.title}</h4>
                </div>
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-4 mb-10">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-zinc-300">
                      <div className="w-5 h-5 rounded-full bg-orange-950/30 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-orange-500" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="mt-auto w-full py-5 border border-zinc-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-orange-600 hover:border-orange-600 transition-all shadow-lg hover:shadow-orange-900/20">
                  Book This Service
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-zinc-500 text-sm">
            Need something custom? <a href="#" className="text-orange-500 underline font-bold underline-offset-4 ml-1">Contact our specialists</a> for bespoke detailing packages.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
