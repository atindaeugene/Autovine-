
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Edge from './components/Edge';
import ServiceVisualizer from './components/ServiceVisualizer';
import Services from './components/Services';
import EcoSection from './components/EcoSection';
import Testimonials from './components/Testimonials';
import LoyaltyProgram from './components/LoyaltyProgram';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#000814] text-white selection:bg-orange-600 selection:text-white overflow-x-hidden">
      <Header scrolled={scrolled} />
      
      <main>
        <Hero />
        
        <section id="edge">
          <Edge />
        </section>

        <section id="visualizer">
          <ServiceVisualizer />
        </section>

        <section id="services">
          <Services />
        </section>

        <section id="eco">
          <EcoSection />
        </section>

        <section id="loyalty">
          <LoyaltyProgram />
        </section>

        <section id="testimonials">
          <Testimonials />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
