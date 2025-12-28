
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Gift, Zap, Star, Sparkle, ArrowRight, Check, Car, Search, Loader2, Calendar, TrendingUp, Share2, Droplets } from 'lucide-react';

const LoyaltyProgram: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [mode, setMode] = useState<'join' | 'check'>('join');

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (mode === 'join') {
      setIsSignedUp(true);
    } else {
      setIsSearching(true);
      // Simulate API lookup
      setTimeout(() => {
        setIsSearching(false);
        setShowProgress(true);
      }, 1500);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Autovine Wash - Royal Circle',
      text: showProgress 
        ? `I just checked my status at Autovine Wash! I'm a Silver Member with 3/5 washes completed toward my next reward. Join the Royal Circle today!`
        : `I just joined the Royal Circle at Autovine Wash! Get the royal treatment for your car and earn rewards with every wash.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
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
    setEmail('');
  };

  // Explicitly type currentWashes and totalWashes as number to avoid TypeScript errors when comparing with literal types.
  const currentWashes: number = showProgress ? 3 : 0;
  const totalWashes: number = 5;

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
              For Your Vehicle
            </h2>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
              {mode === 'join' 
                ? 'Join our exclusive loyalty program and earn "Crown Points" with every visit. Luxury car care is now an investment.' 
                : 'Enter your registered email to view your current progress, available rewards, and membership tier.'}
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {[
                { title: 'Points for Every $1', icon: <Star className="w-5 h-5" /> },
                { title: '5th Wash 50% Off', icon: <Gift className="w-5 h-5" /> },
                { title: 'Priority Scheduling', icon: <Zap className="w-5 h-5" /> },
                { title: 'Birthday Detail', icon: <Sparkle className="w-5 h-5" /> }
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl glossy-black border border-zinc-800">
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
                      <input
                        type="email"
                        placeholder={mode === 'join' ? "Enter email to join" : "Enter your email"}
                        className="flex-grow px-6 py-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-white focus:outline-none focus:border-orange-500 transition-colors"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
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
                      {mode === 'join' ? 'Already a member? Check Status' : 'New here? Join the Royal Circle'}
                    </button>
                  </motion.div>
                ) : isSignedUp ? (
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
                      Welcome to the Royal Circle! Your membership is active.
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <a 
                        href="#services"
                        className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-600 to-orange-500 text-white text-sm font-bold uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] hover:-translate-y-1 active:scale-95 group relative overflow-hidden"
                      >
                        <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        Book Your Next Treatment
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                      </a>
                      <button 
                        onClick={handleShare}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-5 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 text-xs font-bold uppercase tracking-widest rounded-2xl transition-all"
                      >
                        <Share2 className="w-4 h-4" />
                        Share Offer
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="checked"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-3 text-zinc-400 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,1)]"></div>
                        Showing results for <span className="text-white font-bold underline decoration-orange-500 underline-offset-4">{email}</span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <a 
                          href="#services"
                          className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-600 to-orange-500 text-white text-sm font-bold uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] hover:-translate-y-1 active:scale-95 group relative overflow-hidden"
                        >
                          <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                          Book Appointment Now
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        </a>
                        <button 
                          onClick={handleShare}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-5 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 text-xs font-bold uppercase tracking-widest rounded-2xl transition-all"
                        >
                          <Share2 className="w-4 h-4" />
                          Share My Status
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-orange-500/60">
                          <TrendingUp className="w-3 h-3" />
                          Exclusive Member Pricing Applied
                        </div>
                        <button 
                          onClick={resetView}
                          className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
                        >
                          Switch Account
                        </button>
                      </div>
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
            {/* Visual Reward Card Card */}
            <div className={`relative z-10 p-10 rounded-[2.5rem] bg-gradient-to-br from-[#001F3F] via-[#000814] to-[#000814] border transition-all duration-700 ${showProgress ? 'border-orange-500 shadow-[0_40px_100px_rgba(249,115,22,0.2)] scale-105' : 'border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]'}`}>
              
              {showProgress && (
                <div className="absolute -top-4 -right-4 bg-orange-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-tighter animate-bounce shadow-lg">
                  Verified Member
                </div>
              )}

              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                  <Car className="text-white w-8 h-8" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500 mb-1">Status</div>
                  <div className="text-2xl font-serif silver-text">
                    {showProgress ? 'Silver Member' : 'Tier Unlocked'}
                  </div>
                </div>
              </div>

              {/* Enhanced Progress Visualization */}
              <div className="mb-12">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">
                  <span>Wash Reward Progress</span>
                  <span className="text-white">{currentWashes} / {totalWashes} Washes</span>
                </div>
                
                <div className="flex justify-between items-center gap-2">
                  {[...Array(totalWashes)].map((_, i) => {
                    const isActive = i < currentWashes;
                    const isNext = i === currentWashes && showProgress;
                    return (
                      <div key={i} className="flex-1 relative group">
                        <motion.div
                          initial={false}
                          animate={{
                            backgroundColor: isActive ? 'rgba(249, 115, 22, 0.15)' : 'rgba(24, 24, 27, 0.4)',
                            borderColor: isActive ? 'rgba(249, 115, 22, 0.5)' : 'rgba(39, 39, 42, 1)',
                            scale: isActive ? 1.05 : 1
                          }}
                          className={`aspect-square rounded-2xl border flex flex-col items-center justify-center transition-all duration-500 relative overflow-hidden ${isNext ? 'border-dashed border-orange-500/50 animate-pulse' : ''}`}
                        >
                          {isActive ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', damping: 12 }}
                            >
                              <Droplets className="w-6 h-6 text-orange-500" />
                            </motion.div>
                          ) : (
                            <Droplets className="w-6 h-6 text-zinc-700" />
                          )}
                          
                          {/* Fill Indicator */}
                          {isActive && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 shadow-[0_-4px_10px_rgba(249,115,22,0.5)]" />
                          )}

                          {isNext && (
                            <div className="absolute top-1 right-1">
                              <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                            </div>
                          )}
                        </motion.div>
                        {/* Connecting Line */}
                        {i < totalWashes - 1 && (
                          <div className={`absolute top-1/2 -right-1 w-2 h-[1px] z-0 ${i < currentWashes - 1 ? 'bg-orange-500/50' : 'bg-zinc-800'}`} />
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Reward Icon */}
                  <div className="ml-2 flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${currentWashes === totalWashes ? 'bg-orange-500 border-orange-400' : 'bg-zinc-900 border-zinc-800'}`}>
                      <Gift className={`w-6 h-6 ${currentWashes === totalWashes ? 'text-white' : 'text-zinc-600'}`} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-3 mb-10">
                {[1, 2, 3, 4, 5].map((stamp) => {
                  const isActive = showProgress && stamp <= 3;
                  return (
                    <div key={stamp} className={`aspect-square rounded-2xl border flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-orange-600/20 border-orange-500 shadow-[inset_0_0_10px_rgba(249,115,22,0.2)]' : 'bg-zinc-900/50 border-zinc-800 opacity-30'}`}>
                      {isActive ? (
                        <Crown className="w-6 h-6 text-orange-400" />
                      ) : (
                        <span className="text-zinc-800 font-black text-xl">{stamp}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <button className="w-full py-5 rounded-2xl glossy-black border border-zinc-800 flex items-center justify-center gap-4 group hover:border-orange-500/50 transition-all">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white">Dashboard Login</span>
                <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Accent Elements */}
            <div className={`absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl transition-opacity duration-1000 ${showProgress ? 'opacity-100 animate-pulse' : 'opacity-20'}`}></div>
            <div className={`absolute -bottom-10 -left-10 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl transition-opacity duration-1000 ${showProgress ? 'opacity-100' : 'opacity-20'}`}></div>
          </motion.div>
        </div>
      </div>
      
      {/* CSS Animation for Shimmer */}
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
