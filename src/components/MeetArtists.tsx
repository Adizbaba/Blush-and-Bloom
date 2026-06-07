/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { STUDIO_ARTISTS } from '../data';
import { Star, Award, Heart, ShieldCheck } from 'lucide-react';

export default function MeetArtists() {
  return (
    <section id="artists-section" className="py-16 md:py-24 bg-cream scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft/25 text-dark font-sans text-[11px] font-bold uppercase tracking-wider mb-3">
            <Award size={12} className="text-primary animate-bounce" />
            The Creative Collective
          </span>
          <h2 className="font-serif text-4xl md:text-5.5xl font-light text-dark leading-tight mb-4">
            Meet Our Senior <span className="italic font-normal text-secondary">Aesthetic</span> Stylists
          </h2>
          <p className="font-sans text-sm text-gray-600 leading-relaxed">
            Our multi-award winning team is composed of industry leaders, runway beauty directors, and certified health-safe hair practitioners.
          </p>
        </div>

        {/* ARTISTS PROFILE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STUDIO_ARTISTS.map((artist) => (
            <div
              key={artist.id}
              id={`artist-bio-${artist.id}`}
              className="glass rounded-[16px] shadow-sm overflow-hidden hover-card-trigger flex flex-col justify-between"
            >
              {/* PHOTO WRAPPER */}
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-gray-100">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover object-top hover:scale-104 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual badge layering - 5.0 Star score */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm select-none">
                  <Star size={12} className="text-secondary fill-secondary" />
                  <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-dark">
                    {artist.rating.toFixed(1)} Artist Rating
                  </span>
                </div>
              </div>

              {/* DETAILS CARD BODY */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between text-left">
                <div>
                  <div className="mb-4">
                    <h3 className="font-serif text-2xl font-light text-dark leading-none mb-1">
                      {artist.name}
                    </h3>
                    <span className="font-sans text-[11px] text-gray-400 font-bold uppercase tracking-widest block mt-1.5">
                      {artist.role}
                    </span>
                  </div>

                  <p className="font-sans text-xs md:text-sm text-gray-600 leading-relaxed mb-6">
                    {artist.bio}
                  </p>
                </div>

                <div>
                  {/* Specialties tag stack */}
                  <div className="border-t border-gray-100 pt-4">
                    <span className="block font-sans text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">
                      Masteries:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {artist.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="px-2.5 py-1 text-[9px] font-sans uppercase font-bold tracking-wider text-dark bg-accent rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* METROPOLITAN ASSURANCE DETAIL */}
        <div className="mt-12 max-w-xl mx-auto text-center flex items-center justify-center gap-2 text-xs text-gray-400 font-sans">
          <ShieldCheck size={14} className="text-secondary shrink-0" />
          <span>All personnel are certified color-mixologists and operate clean, sanitary beauty brushes.</span>
        </div>

      </div>
    </section>
  );
}
