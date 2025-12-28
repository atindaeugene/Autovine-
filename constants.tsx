
import React from 'react';
import { Shield, Zap, Droplets, Sparkles, Clock, Leaf } from 'lucide-react';
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
    id: 'quick-exterior',
    title: 'Quick Exterior',
    description: 'Fast, eco-friendly, and sparkling. Perfect for the professional on the move.',
    price: 'From $25',
    imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800',
    features: [
      'High-pressure pre-wash',
      'pH-balanced foam wash',
      'Wheel & rim cleaning',
      'Spot-free rinse',
      'Express hand dry'
    ]
  },
  {
    id: 'comprehensive-detail',
    title: 'Comprehensive Detail',
    description: 'Full interior and exterior restoration. The ultimate royal treatment for your vehicle.',
    price: 'From $150',
    imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=800',
    features: [
      'Clay bar treatment',
      'Machine paint correction',
      'Premium Carnauba wax',
      'Deep interior steam cleaning',
      'Leather conditioning',
      'Engine bay detailing'
    ]
  }
];

export const EDGES = [
  {
    title: 'State-of-the-art Tech',
    description: 'We use the latest high-pressure systems and touchless technology for efficient cleaning.',
    icon: <Zap className="w-8 h-8 text-orange-500" />
  },
  {
    title: 'Meticulous Detailing',
    description: 'Every corner is attended to by our expert technicians with surgical precision.',
    icon: <Shield className="w-8 h-8 text-orange-500" />
  },
  {
    title: 'Water Recovery',
    description: 'Our advanced systems recycle up to 85% of water used, protecting the environment.',
    icon: <Droplets className="w-8 h-8 text-orange-500" />
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
