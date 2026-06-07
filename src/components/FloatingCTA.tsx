/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface FloatingCTAProps {
  openBookingModal: () => void;
}

export default function FloatingCTA({ openBookingModal }: FloatingCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="floating-cta-container"
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 transition-all duration-300 transform ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      }`}
    >
      <button
        id="floating-book-now-circle"
        onClick={openBookingModal}
        className="w-14 h-14 bg-primary text-cream rounded-full flex items-center justify-center shadow-xl hover-btn-trigger focus:outline-none focus:ring-4 focus:ring-primary/35 group relative"
        aria-label="Open booking portal"
      >
        <Calendar size={24} className="group-hover:rotate-12 transition-transform duration-300" />
        
        {/* Floating Tooltip detail */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 glass-dark text-white text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          Book Now
        </span>
      </button>
    </div>
  );
}
