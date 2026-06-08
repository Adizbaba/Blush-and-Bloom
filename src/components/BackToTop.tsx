import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      // Scrollable height is total height minus viewport height.
      const maxScroll = scrollHeight - clientHeight;
      
      if (maxScroll <= 150) {
        setVisible(false);
        return;
      }

      // Past the middle of the page
      if (window.scrollY > maxScroll / 2) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case they are already scrolled
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <style>{`
        @keyframes bttFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes bttPulse {
          0% {
            opacity: 0.6;
            transform: scale(0.95);
          }
          50% {
            opacity: 0;
            transform: scale(1.4);
          }
          100% {
            opacity: 0;
            transform: scale(1.4);
          }
        }
        .btt-floating-wrap {
          animation: bttFloat 2.5s ease-in-out infinite;
        }
        .btt-pulse-ring {
          animation: bttPulse 3s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
      `}</style>

      <div
        id="back-to-top-wrapper"
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[999] transition-all duration-500 ease-in-out ${
          visible 
            ? 'opacity-100 pointer-events-auto scale-100 translate-y-0' 
            : 'opacity-0 pointer-events-none scale-75 translate-y-6'
        }`}
      >
        <div className="btt-floating-wrap relative group">
          {/* Pulsating ring radiating outward every 3s */}
          <div className="btt-pulse-ring absolute -inset-1 rounded-full border-2 border-[#FF4FA3]/50 pointer-events-none bg-[#FF4FA3]/10" />
          
          {/* Primary Action Button */}
          <button
            id="back-to-top-pill"
            onClick={scrollToTop}
            className="h-[52px] px-6 rounded-full bg-gradient-to-r from-[#FF4FA3] to-[#FF6B6B] text-white flex items-center justify-center gap-2 group-hover:-translate-y-1 group-hover:scale-103 shadow-[0_4px_20px_rgba(255,79,163,0.5)] group-hover:shadow-[0_8px_30px_rgba(255,79,163,0.85)] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#FF4FA3]/40 cursor-pointer select-none active:scale-95"
            aria-label="Scroll back to top"
          >
            <ChevronUp size={18} className="text-white animate-pulse" />
            <span className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-white">
              Back to Top
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
