
import React from 'react';
import { Menu, X, Car } from 'lucide-react';

interface HeaderProps {
  scrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { name: 'The Edge', href: '#edge' },
    { name: 'Visualizer', href: '#visualizer' },
    { name: 'Services', href: '#services' },
    { name: 'Loyalty', href: '#loyalty' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-orange-600 flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.3)] group-hover:bg-orange-500 transition-colors">
            <Car className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tighter silver-text uppercase leading-none">Autovine</span>
            <span className="text-[10px] text-orange-500 font-bold tracking-[0.2em] uppercase leading-none mt-1">Wash</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-white hover:text-orange-400 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#footer"
            className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-widest rounded transition-all shadow-lg hover:shadow-orange-900/40"
          >
            Book Now
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-nav border-t border-zinc-800 p-6 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="w-full py-4 bg-orange-600 text-white font-bold uppercase tracking-widest rounded">
            Book Appointment
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
