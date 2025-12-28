
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <div className="py-32 bg-[#000814]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-end mb-20">
          <div className="lg:w-2/3">
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-orange-500 mb-4">Social Proof</h2>
            <h3 className="text-4xl md:text-5xl font-serif silver-text leading-tight">
              A Superior Clean You <br /> Can See and Feel
            </h3>
          </div>
          <div className="lg:w-1/3 text-right">
            <div className="flex justify-end gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
              ))}
            </div>
            <div className="text-2xl font-bold uppercase silver-text">4.9/5 Average Rating</div>
            <div className="text-zinc-500 text-xs tracking-widest uppercase">Based on 500+ Verified Reviews</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-12 rounded-3xl glossy-black border border-zinc-800 hover:border-orange-500/20 transition-all"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-zinc-900" />
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                ))}
              </div>
              <p className="text-zinc-300 text-lg italic mb-10 leading-relaxed">
                "{t.content}"
              </p>
              <div>
                <div className="text-white font-bold text-xl">{t.name}</div>
                <div className="text-orange-500 text-xs uppercase tracking-widest font-bold mt-1">
                  {t.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
