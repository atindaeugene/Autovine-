
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Gift, Zap, Star, ArrowRight, Check, Car, Loader2, Calendar, TrendingUp, Share2, Droplets, Phone, Coins, History } from 'lucide-react';

const LoyaltyProgram: React.FC = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [mode, setMode] = useState<'join' | 'check'>('join');
  
  // Logic states
  const [points, setPoints] = useState(0);
  const [currentWashes, setCurrentWashes] = useState(0);
  const totalWashes = 5;
  const POINTS_PER_KES_100 = 1;
  const REDEMPTION_COST = 500; // Cost for a "Premium Wax" reward

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappNumber) return;

    if (mode === 'join') {
      setIsSignedUp(true);
      setPoints(50); // Welcome points
      setCurrentWashes(0);
    } else {
      setIsSearching(true);
      // Simulate API lookup
      setTimeout(() => {
        setIsSearching(false);
        setShowProgress(true);
        // Mock data for a returning user
        setPoints(380); 
        setCurrentWashes(3);
      }, 1500);
    }
  };

  const simulateWash = (kesAmount: number) => {
    const earned = Math.floor(kesAmount / 100) * POINTS_PER_KES_100;
    setPoints(prev => prev + earned);
    if (currentWashes < totalWashes) {
      setCurrentWashes(prev => prev + 1);
    }
  };

  const handleRedeem = () => {
    if (points >= REDEMPTION_COST) {
      setPoints(prev => prev - REDEMPTION_COST);
      alert('Reward Redeemed! 500 Points deducted. Show this to the attendant.');
    } else {
      alert(`You need ${REDEMPTION_COST - points} more points to redeem this reward.`);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Autovine Wash - Royal Circle',
      text: showProgress 
        ? `I have ${points} Crown Points at Autovine Wash! Join the Royal Circle today via WhatsApp!`
        : `I just joined the Royal Circle at Autovine Wash! Get the royal treatment for your car and earn rewards with every wash.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Offer details copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const resetView = () => {
    setIsSignedUp(false);
    setShowProgress(false);
    setMode('join');
    setWhatsappNumber('');
    setPoints(0);
    setCurrentWashes(0);
  };

  return (
    <div id="loyalty" className="py-32 bg-[#000814] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-orange-950/10 rounded-full blur-[160px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Crown className="text-orange-500 w-6 h-6" />
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-orange-500">The Royal Circle</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif silver-text mb-8 leading-tight">
              Elite Status <br /> 
              Via WhatsApp
            </h2>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
              {mode === 'join' 
                ? 'Join our exclusive loyalty program using your WhatsApp number. Earn 1 Crown Point for every KES 100 spent and unlock premium rewards.' 
                : 'Enter your registered WhatsApp number to view your current points balance and reward progress.'}
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {[
                { title: `Earn 1pt / KES 100`, icon: <Coins className="w-5 h-5" /> },
                { title: 'Free Wax @ 500pts', icon: <Gift className="w-5 h-5" /> },
                { title: 'Priority Scheduling', icon: <Zap className="w-5 h-5" /> },
                { title: 'WhatsApp Alerts', icon: <Phone className="w-5 h-5" /> }
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl glossy-black border border-zinc-800 hover:border-zinc-700 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-orange-950/20 flex items-center justify-center text-orange-500">
                    {benefit.icon}
                  </div>
                  <span className="text-sm font-bold text-zinc-300">{benefit.title}</span>
                </div>
              ))}
            </div>

            <div className="min-h-[140px]">
              <AnimatePresence mode="wait">
                {!isSignedUp && !showProgress ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <form onSubmit={handleAction} className="flex flex-col sm:flex-row gap-4 max-w-md mb-4">
                      <div className="relative flex-grow">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <input
                          type="tel"
                          placeholder={mode === 'join' ? "WhatsApp Number" : "Enter number"}
                          className="w-full pl-12 pr-6 py-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-white focus:outline-none focus:border-orange-500 transition-colors"
                          value={whatsappNumber}
                          onChange={(e) => setWhatsappNumber(e.target.value)}
                          required
                        />
                      </div>
                      <button 
                        type="submit"
                        disabled={isSearching}
                        className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-orange-900/30 flex items-center justify-center gap-2"
                      >
                        {isSearching ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          mode === 'join' ? 'Join Circle' : 'Check Status'
                        )}
                      </button>
                    </form>
                    <button 
                      onClick={() => setMode(mode === 'join' ? 'check' : 'join')}
                      className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-orange-500 transition-colors"
                    >
                      {mode === 'join' ? 'Already a member? Check Status' : 'New here? Join with WhatsApp'}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold flex items-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black shadow-lg">
                        <Check className="w-4 h-4" />
                      </div>
                      {isSignedUp ? 'Welcome to the Royal Circle!' : 'Welcome back, Royal Member!'}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <a 
                        href={`https://wa.me/254700654068?text=Hello%20Autovine!%20My%20number%20is%20${whatsappNumber}.%20I%20have%20${points}%20points%20and%20I'd%20like%20to%20book%20my%20next%20session.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-600 to-orange-500 text-white text-sm font-bold uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] hover:-translate-y-1 active:scale-95 group relative overflow-hidden"
                      >
                        <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        Book Your Next Appointment
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                      </a>
                      <button 
                        onClick={resetView}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-5 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 text-xs font-bold uppercase tracking-widest rounded-2xl transition-all"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Visual Reward Card */}
            <div className={`relative z-10 p-10 rounded-[2.5rem] bg-gradient-to-br from-[#001F3F] via-[#000814] to-[#000814] border transition-all duration-700 ${(showProgress || isSignedUp) ? 'border-orange-500 shadow-[0_40px_100px_rgba(249,115,22,0.2)] scale-105' : 'border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]'}`}>
              
              {(showProgress || isSignedUp) && (
                <div className="absolute -top-4 -right-4 bg-orange-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-tighter animate-bounce shadow-lg">
                  {points > 500 ? 'Gold Status' : 'Silver Member'}
                </div>
              )}

              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                  <Car className="text-white w-8 h-8" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500 mb-1">Crown Points</div>
                  <div className="text-3xl font-serif silver-text font-black">
                    {points.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Points Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                  <span>Next Reward: Premium Wax</span>
                  <span>{points} / {REDEMPTION_COST} pts</span>
                </div>
                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((points / REDEMPTION_COST) * 100, 100)}%` }}
                    className="h-full bg-gradient-to-r from-orange-600 to-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                  />
                </div>
                {points >= REDEMPTION_COST && (
                  <button 
                    onClick={handleRedeem}
                    className="mt-4 w-full py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    Redeem Reward Now
                  </button>
                )}
              </div>

              {/* Wash Stamp Progress */}
              <div className="mb-10">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">
                  <span>Visit Loyalty Stamped</span>
                  <span className="text-white">{currentWashes} / {totalWashes}</span>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {[...Array(totalWashes)].map((_, i) => {
                    const isActive = i < currentWashes;
                    return (
                      <div key={i} className={`aspect-square rounded-2xl border flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-orange-600/20 border-orange-500 shadow-[inset_0_0_10px_rgba(249,115,22,0.2)]' : 'bg-zinc-900/50 border-zinc-800 opacity-30'}`}>
                        {isActive ? (
                          <Droplets className="w-5 h-5 text-orange-500" />
                        ) : (
                          <span className="text-zinc-800 font-black text-sm">{i + 1}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions for simulation (In a real app, these would happen after a purchase) */}
              {(isSignedUp || showProgress) && (
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => simulateWash(1000)}
                    className="py-4 rounded-2xl glossy-black border border-zinc-800 flex flex-col items-center justify-center gap-1 group hover:border-orange-500/50 transition-all"
                  >
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-orange-500 transition-colors">Record Wash</span>
                    <span className="text-[10px] font-bold text-white uppercase">+10 pts</span>
                  </button>
                  <button 
                    onClick={handleShare}
                    className="py-4 rounded-2xl glossy-black border border-zinc-800 flex flex-col items-center justify-center gap-1 group hover:border-orange-500/50 transition-all"
                  >
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-orange-500 transition-colors">Share Rewards</span>
                    <Share2 className="w-3 h-3 text-white" />
                  </button>
                </div>
              )}
            </div>

            {/* Accent Elements */}
            <div className={`absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl transition-opacity duration-1000 ${(showProgress || isSignedUp) ? 'opacity-100 animate-pulse' : 'opacity-20'}`}></div>
          </motion.div>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LoyaltyProgram;
