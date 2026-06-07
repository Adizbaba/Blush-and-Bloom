/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onBookClick, onExploreClick }: HeroProps) {
  return (
    <section
      id="hero-section"
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-dark pt-16"
    >
      {/* Background with beautiful slow zoom (Ken Burns 8s loop) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1920"
          alt="Luxury Cosmetics"
          className="w-full h-full object-cover opacity-45 select-none pointer-events-none scale-100 animate-hero-zoom"
          referrerPolicy="no-referrer"
        />
        {/* Soft elegant vignette overlay to pop text content */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/65 via-transparent to-dark/45" />
      </div>

      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-primary/20 blur-[100px] pointer-events-none select-none" />
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 rounded-full bg-soft/20 blur-[100px] pointer-events-none select-none" />

      {/* Content wrapper with slide up animations */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-8 text-center text-white select-text">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 md:mb-8 animate-[fadeIn_0.5s_ease-out_forwards]">
          <Sparkles size={14} className="text-primary animate-pulse" />
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-dark">
            Luxury Hair &amp; Makeup styling
          </span>
        </div>

        {/* Hero headline - editorial Cormorant font */}
        <h1
          id="hero-header-text"
          className="font-serif text-5xl sm:text-6xl md:text-7.5xl font-light tracking-tight max-w-4xl mx-auto leading-[1.08] mb-6 animate-[revealUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.1s_forwards] opacity-0"
        >
          Amplify your unique, <br className="hidden md:inline" />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#FFADF0] to-primary">
            magnetic glow.
          </span>
        </h1>

        {/* Sub-tagline Plus Jakarta Sans */}
        <p
          id="hero-tagline-text"
          className="font-sans text-base sm:text-lg md:text-xl text-gray-200/90 max-w-2xl mx-auto leading-relaxed mb-10 animate-[revealUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.25s_forwards] opacity-0 font-light"
        >
          A high-end Australian and New Zealand beauty sanctuary curated for women seeking haute couture colour, dimensional balayage, editorial makeup, and exquisite bridal experiences.
        </p>

        {/* CTA Button Block */}
        <div
          id="hero-cta-buttons"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-[revealUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.4s_forwards] opacity-0"
        >
          {/* Button Primary: hot pink --color-primary, 48px height, 20px radius, uppercase, letter-spacing 0.08em */}
          <button
            id="hero-book-now-btn"
            onClick={onBookClick}
            className="w-full sm:w-auto h-12 px-8 rounded-[20px] bg-primary text-white font-sans text-xs font-bold tracking-[0.08em] uppercase hover-btn-trigger shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            Book Appointment
            <ArrowRight size={14} />
          </button>

          {/* Button Secondary: transparent, border & text matching primary hot pink styles */}
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto h-12 px-8 rounded-[20px] border-2 border-primary bg-transparent text-primary font-sans text-xs font-bold tracking-[0.08em] uppercase hover-btn-trigger flex items-center justify-center gap-2 cursor-pointer hover:bg-primary/5"
          >
            Explore Services &amp; Rates
          </button>
        </div>

        {/* Subtle Feature Badges below CTAs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto mt-16 pt-8 border-t border-white/10 text-left animate-[fadeIn_1s_ease-out_0.6s_forwards] opacity-0">
          <div>
            <span className="block font-serif text-2xl font-light text-accent">99.8%</span>
            <span className="block font-sans text-[11px] uppercase tracking-wider text-gray-400 mt-1">Client Satisfaction</span>
          </div>
          <div>
            <span className="block font-serif text-2xl font-light text-accent">AU &amp; NZ</span>
            <span className="block font-sans text-[11px] uppercase tracking-wider text-gray-400 mt-1">Australia &amp; New Zealand</span>
          </div>
          <div>
            <span className="block font-serif text-2xl font-light text-accent">Luxe Only</span>
            <span className="block font-sans text-[11px] uppercase tracking-wider text-gray-400 mt-1">Olaplex &amp; Chanel Brands</span>
          </div>
          <div>
            <span className="block font-serif text-2xl font-light text-accent">Vogue Featured</span>
            <span className="block font-sans text-[11px] uppercase tracking-wider text-gray-400 mt-1">Certified Editorial Artists</span>
          </div>
        </div>
      </div>

      {/* Luxury soft curved divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-8 md:h-12 text-cream fill-current"
        >
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1130.5,123.6,1051.8,110.3,985.66,92.83Z" />
        </svg>
      </div>
    </section>
  );
}
