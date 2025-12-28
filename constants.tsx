
import React from 'react';
import { Shield, Zap, Droplets, Sparkles, Clock, Leaf, Wind, Eraser } from 'lucide-react';
import { Service, Testimonial, CarType } from './types';

export const COLORS = {
  navy: '#000814',
  deepNavy: '#001F3F',
  orange: '#F97316',
  silver: '#C0C0C0',
  chrome: '#E8E8E8',
};

export const CAR_TYPES: CarType[] = [
  { id: 'sedan', name: 'Sport Sedan', icon: '🚗' },
  { id: 'suv', name: 'Family SUV', icon: '🚙' },
  { id: 'luxury', name: 'Luxury Exotic', icon: '🏎️' }
];

export const SERVICES: Service[] = [
  {
    id: 'body-wash',
    title: 'Premium Body Wash',
    description: 'The foundation of the Royal Treatment. High-pressure foam application that safely lifts road grime.',
    price: 'From KES 250',
    imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Saloon: KES 250 | SUV: KES 300',
      'Eco-friendly foam lance',
      'Microfiber hand wash',
      'Wheel & rim cleaning',
      'Streak-free window finish'
    ]
  },
  {
    id: 'vacuum-interior',
    title: 'Vacuum & Interior',
    description: 'Restore the inner sanctuary of your vehicle with our high-power extraction and sanitization.',
    price: 'From KES 200',
    imageUrl: 'https://images.unsplash.com/photo-1618223672358-111117208362?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Vacuum: From KES 200',
      'Seats Cleaning: KES 500',
      'Roof Detailing: KES 1000',
      'Crack & crevice cleaning',
      'Deodorizing treatment'
    ]
  },
  {
    id: 'buffing-detailing',
    title: 'Professional Buffing',
    description: 'Professional paint correction to remove swirl marks and restore that factory-fresh gloss.',
    price: 'From KES 3,000',
    imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Saloon: KES 3000 | SUV: KES 4000',
      'Dual-action machine polish',
      'Light scratch removal',
      'Gloss level enhancement',
      'Paint sealant'
    ]
  }
];

export const EDGES = [
  {
    title: 'Best Services',
    description: 'Award-winning detailing techniques tailored for every vehicle type.',
    icon: <Sparkles className="w-8 h-8 text-orange-500" />
  },
  {
    title: 'Save Time',
    description: 'Our efficient parallel-processing bays ensure your car is ready in record time.',
    icon: <Clock className="w-8 h-8 text-orange-500" />
  },
  {
    title: 'Sparkle & Shine',
    description: 'A finish so bright it acts as a mirror. The trademark Autovine glow.',
    icon: <Zap className="w-8 h-8 text-orange-500" />
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'James Mwangi',
    role: 'Luxury Car Collector',
    content: "The attention to detail at Autovine is unparalleled. My vintage Porsche hasn't looked this good since it left the showroom. Truly the royal treatment.",
    rating: 5
  },
  {
    id: '2',
    name: 'Sarah Ochieng',
    role: 'Corporate Executive',
    content: "Speed and quality usually don't go together, but Autovine delivers both. A seamless experience every single time.",
    rating: 5
  },
  {
    id: '3',
    name: 'David Kiptoo',
    role: 'Tech Entrepreneur',
    content: "Unmatched clean. I appreciate their eco-friendly approach and the professional attitude of the staff. Highly recommended.",
    rating: 5
  }
];
