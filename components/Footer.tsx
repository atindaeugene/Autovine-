
import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Car, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const mapsUrl = "https://maps.app.goo.gl/M9tskqD97hY4d9yt8";

  return (
    <footer id="footer" className="bg-[#00050a] pt-24 pb-12 border-t border-zinc-900">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center space-x-2 mb-8">
              <div className="w-10 h-10 bg-orange-600 flex items-center justify-center rounded-lg shadow-lg">
                <Car className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tighter text-white uppercase leading-none">Autovine</span>
                <span className="text-[10px] text-orange-500 font-bold tracking-[0.2em] uppercase leading-none mt-1">Wash</span>
              </div>
            </a>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8">
              Redefining automotive care through high-tech precision and 
              the expert human touch. Experience the royal treatment today.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-orange-500 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:col-span-2 gap-12">
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#edge" className="text-zinc-500 text-sm hover:text-orange-400 transition-colors">The Edge</a></li>
                <li><a href="#visualizer" className="text-zinc-500 text-sm hover:text-orange-400 transition-colors">Visualizer</a></li>
                <li><a href="#services" className="text-zinc-500 text-sm hover:text-orange-400 transition-colors">Services</a></li>
                <li><a href="#loyalty" className="text-zinc-500 text-sm hover:text-orange-400 transition-colors">Loyalty</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Our Services</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-500 text-sm hover:text-orange-400 transition-colors">Quick Exterior</a></li>
                <li><a href="#" className="text-zinc-500 text-sm hover:text-orange-400 transition-colors">Interior Detail</a></li>
                <li><a href="#" className="text-zinc-500 text-sm hover:text-orange-400 transition-colors">Ceramic Coating</a></li>
                <li><a href="#" className="text-zinc-500 text-sm hover:text-orange-400 transition-colors">Fleet Solutions</a></li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Contact Us</h4>
            <div className="space-y-6">
              <a href="mailto:autovinewash@gmail.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl glossy-black border border-zinc-800 flex items-center justify-center group-hover:border-orange-500 transition-colors">
                  <Mail className="w-4 h-4 text-orange-500" />
                </div>
                <div className="text-sm text-zinc-400 group-hover:text-white transition-colors">autovinewash@gmail.com</div>
              </a>
              <a href="tel:0700654068" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl glossy-black border border-zinc-800 flex items-center justify-center group-hover:border-orange-500 transition-colors">
                  <Phone className="w-4 h-4 text-orange-500" />
                </div>
                <div className="text-sm text-zinc-400 group-hover:text-white transition-colors">0700 654068</div>
              </a>
              <a 
                href={mapsUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl glossy-black border border-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:border-orange-500 transition-colors">
                  <MapPin className="w-4 h-4 text-orange-500" />
                </div>
                <div className="text-sm text-zinc-400 leading-relaxed group-hover:text-white transition-colors">
                  Autovine Wash, Utawala Road <br />
                  Opposite Komarock Modern Hospital <br />
                  Nairobi, Kenya
                  <span className="flex items-center gap-1 text-[10px] text-orange-500 font-bold uppercase mt-1 tracking-widest group-hover:underline">
                    View on Maps <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold">
            © {currentYear} Autovine Wash. All Rights Reserved.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold hover:text-orange-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold hover:text-orange-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
