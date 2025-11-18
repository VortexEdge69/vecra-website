"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AnnouncementBanner() {
  const router = useRouter();

  const handleScrollToVps = () => {
    const el = document.getElementById('vps-hosting');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#vps-hosting');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 text-white py-2 px-4 md:py-3 md:px-6 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Minecraft block icon */}
          <div className="text-xl sm:text-2xl animate-pulse">🧱</div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-center sm:text-left">
            <span className="font-bold text-sm sm:text-lg">NEW!</span>
            <span className="text-xs sm:text-sm md:text-base">
              Check out our Updated VPS prices below
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={handleScrollToVps}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-105 flex items-center space-x-1 sm:space-x-2"
          >
            <span>View VPS Prices</span>
            <svg 
              className="w-3 h-3 sm:w-4 sm:h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7l5 5m0 0l-5 5m5-5H6" 
              />
            </svg>
          </button>
          
          {/* Close button */}
          <button className="text-white/70 hover:text-white transition-colors">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
