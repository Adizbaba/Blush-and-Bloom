/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sparkles, Eye, X, BookOpen, Camera, Award } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface PortfolioItem {
  id: string;
  category: 'colouring' | 'styling' | 'bridal' | 'makeup';
  tag: string;
  title: string;
  artist: string;
  image: string;
  formula: string;
}

const GALLERY_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    category: 'colouring',
    tag: 'Sunkissed Balayage',
    title: 'The Bondi Honey Glow',
    artist: 'Chloe Mitchell',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800',
    formula: 'French clay face paint + customized sandy beige glaze gloss over organic moisturiser'
  },
  {
    id: 'port-2',
    category: 'bridal',
    tag: 'Bridal Glam',
    title: 'The Yarra Hydrating Elegant Bridal Look',
    artist: 'Sienna Montgomery',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800',
    formula: 'Luxe hydrating base contouring, individual silk lash structure, Chanel nude lip gloss'
  },
  {
    id: 'port-3',
    category: 'styling',
    tag: 'Signature Waves',
    title: 'Voluminous Editorial Waves',
    artist: 'Zara Jenkins',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800',
    formula: 'Deep ceramic-tong curling with hydration sealing spray for long-lasting bounce'
  },
  {
    id: 'port-4',
    category: 'makeup',
    tag: 'Red Carpet Event',
    title: 'Flawless Bare-Skin Glow',
    artist: 'Sienna Montgomery',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800',
    formula: 'Luminous liquid minerals, feather brow sculpture, organic Rose quartz peach blush'
  },
  {
    id: 'port-5',
    category: 'colouring',
    tag: 'Nordic Vanilla Blonde',
    title: 'Platin Gold dimensional foils',
    artist: 'Chloe Mitchell',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800',
    formula: 'Sub-root organic lightener foils paired with lilac cooling tone conditioner glaze'
  },
  {
    id: 'port-6',
    category: 'bridal',
    tag: 'Creative Up-do',
    title: 'Textured Whimsical Flower Bun',
    artist: 'Zara Jenkins',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800',
    formula: 'Intertwined loose curls structure, hair securing pins, dry lavender flora attachments'
  }
];

export default function Portfolio({ standalone = false }: { standalone?: boolean }) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'colouring' | 'styling' | 'bridal' | 'makeup'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(item => 
    activeFilter === 'all' ? true : item.category === activeFilter
  );

  return (
    <div id="portfolio-page" className="bg-cream min-h-screen select-text">
      {standalone ? (
        /* HERO SECTION / HEADER FOR STANDALONE GALLERY */
        <section className="relative min-h-[50vh] sm:min-h-[55vh] flex items-center justify-center overflow-hidden bg-dark pt-28 pb-20">
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

          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-8 text-center text-white pb-8">
            <ScrollReveal>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass text-white font-sans text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                <Camera size={12} className="text-primary" />
                The Glow &amp; Glitz Feed
              </span>
              <h1 className="font-serif text-4xl md:text-6.5xl font-light text-white leading-tight tracking-tight mb-6">
                Bespoke Bridal <span className="italic block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#FFADF0] to-primary">&amp; Styling Gallery</span>
              </h1>
              <div className="w-20 h-[2px] bg-primary mx-auto my-6" />
              <p className="font-sans text-xs md:text-sm text-gray-200/90 leading-relaxed max-w-2xl mx-auto font-light">
                Explore our signature edit of sun-drenched colouring, bespoke haute coiffure, ultra-fine airbrush finishes, and timeless red carpet wedding captures.
              </p>
            </ScrollReveal>
          </div>

          {/* Luxury soft curved divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="relative block w-full h-8 md:h-12 text-white fill-current"
            >
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1130.5,123.6,1051.8,110.3,985.66,92.83Z" />
            </svg>
          </div>
        </section>
      ) : null}

      <section id="portfolio-section" className={`bg-white scroll-mt-20 ${standalone ? 'py-16 md:py-24' : 'py-16 md:py-24'}`}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          
          {/* SECTION HEADER (Only shown on homepage, since standalone has premium header above) */}
          {!standalone && (
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
              <div className="max-w-xl text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/60 text-dark font-sans text-[11px] font-bold uppercase tracking-wider mb-3">
                  <Camera size={12} className="text-primary" />
                  The Glow &amp; Glitz Feed
                </span>
                <h2 className="font-serif text-4xl md:text-5.5xl font-light text-dark leading-tight">
                  Bespoke Bridal <span className="italic font-normal text-secondary">&amp;</span> Styling Gallery
                </h2>
              </div>
              
              {/* HORIZONTAL FILTERS */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                {(['all', 'colouring', 'styling', 'bridal', 'makeup'] as const).map((filter) => (
                  <button
                    key={filter}
                    id={`filter-btn-${filter}`}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                      activeFilter === filter
                        ? 'bg-primary text-white scale-102'
                        : 'glass text-dark/80 hover:bg-cream/90'
                    }`}
                  >
                    {filter === 'all' ? 'All Works' : filter}
                  </button>
                ))}
              </div>
            </div>
          )}

          {standalone && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-gray-150/40">
              <span className="font-sans text-xs font-semibold text-gray-400 uppercase tracking-widest text-left w-full sm:w-auto">
                Showing {filteredItems.length} Curated Transformations
              </span>
              {/* HORIZONTAL FILTERS */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none max-w-full">
                {(['all', 'colouring', 'styling', 'bridal', 'makeup'] as const).map((filter) => (
                  <button
                    key={filter}
                    id={`filter-btn-${filter}`}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap ${
                      activeFilter === filter
                        ? 'bg-primary text-white scale-102'
                        : 'glass text-dark/80 hover:bg-cream/90'
                    }`}
                  >
                    {filter === 'all' ? 'All Works' : filter}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MASONRY/GRID OF HIGH VALUE SHOTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                id={`portfolio-item-${item.id}`}
                onClick={() => setSelectedPhoto(item)}
                className="group cursor-pointer glass rounded-2xl overflow-hidden shadow-sm hover-card-trigger relative"
              >
                {/* IMAGE WRAPPER */}
                <div className="aspect-[4/5] overflow-hidden relative bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Visual hover curtain detailing look */}
                  <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Eye size={20} />
                    </div>
                  </div>

                  {/* Left corner tag overlay */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-dark text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-sm">
                    {item.tag}
                  </span>
                </div>

                {/* CARD DETAILS */}
                <div className="p-5 text-left">
                  <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-sans mb-1">
                    Artist: {item.artist}
                  </span>
                  <h3 className="font-serif text-lg md:text-xl font-medium text-dark leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* DECORATIVE TRUST STAMP */}
          <div className="mt-16 text-center py-6 bg-cream/50 rounded-2xl border border-dashed border-gray-200">
            <p className="font-sans text-xs text-gray-500 flex items-center justify-center gap-2 flex-wrap">
              <Award size={14} className="text-secondary animate-pulse" />
              <span>Every single photograph showcases genuine transformations accomplished inside Blush &amp; Bloom Australian and New Zealand sanctuaries.</span>
            </p>
          </div>

        </div>

        {/* PORTFOLIO LIGHTBOX MODAL */}
        {selectedPhoto && (
          <div
            id="lightbox-overlay"
            className="fixed inset-0 z-55 bg-dark/95 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              id="lightbox-content-card"
              className="glass text-dark w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* PHOTO COLUMN */}
              <div className="md:w-1/2 max-h-[50vh] md:max-h-[80vh] bg-dark flex items-center justify-center relative">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="md:hidden absolute top-4 right-4 w-9 h-9 bg-dark/80 backdrop-blur rounded-full flex items-center justify-center text-white focus:outline-none"
                >
                  <X size={18} />
                </button>
              </div>

              {/* SPECS COLUMN */}
              <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-widest bg-accent text-dark rounded-full">
                      {selectedPhoto.tag}
                    </span>
                    
                    {/* CLOSE DESKTOP */}
                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="hidden md:flex items-center justify-center p-2 text-gray-400 hover:text-dark transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <h3 className="font-serif text-3xl md:text-4xl text-dark leading-tight mb-2">
                    {selectedPhoto.title}
                  </h3>
                  <span className="block font-sans text-xs text-gray-400 mb-6 font-medium">
                    Styled &amp; customized by Principal Artist:{' '}
                    <span className="text-secondary font-semibold">{selectedPhoto.artist}</span>
                  </span>

                  <div className="space-y-4 pt-4 border-t border-gray-200/50">
                    <div className="flex gap-3">
                      <div className="p-2 rounded-lg glass shrink-0 shadow-sm h-9 w-9 flex items-center justify-center text-primary">
                        <BookOpen size={16} />
                      </div>
                      <div>
                        <span className="block font-sans text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                          Style Formulation:
                        </span>
                        <p className="font-sans text-sm text-gray-600 leading-relaxed">
                          {selectedPhoto.formula}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="p-2 rounded-lg glass shrink-0 shadow-sm h-9 w-9 flex items-center justify-center text-secondary">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <span className="block font-sans text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                          Look Compatibility:
                        </span>
                        <p className="font-sans text-sm text-gray-600 leading-relaxed">
                          Optimized for women wanting glowing dimension under flash photofilm and natural light events.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200/50 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="w-full sm:w-auto h-11 px-5 rounded-[20px] glass text-dark font-sans text-[11px] uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    Return to Feed
                  </button>
                  <span className="text-[10px] text-gray-400 text-center sm:text-left leading-tight hidden lg:inline">
                    Loving this look? You can ask for this specific design during checkout!
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
