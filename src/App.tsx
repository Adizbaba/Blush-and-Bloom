/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ServiceItem } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesMenu from './components/ServicesMenu';
import ConsultQuiz from './components/ConsultQuiz';
import Portfolio from './components/Portfolio';
import MeetArtists from './components/MeetArtists';
import Reviews from './components/Reviews';
import Policies from './components/Policies';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import FloatingCTA from './components/FloatingCTA';
import CookieConsent from './components/CookieConsent';
import BookingForm from './components/BookingForm';
import ScrollReveal from './components/ScrollReveal';

import { MapPin, Phone, Mail, Instagram, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Page load fade-in hook
    setPageLoaded(true);
  }, []);

  const handleToggleService = (service: ServiceItem) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  // Connect navigation link clicks to scroll smoothly down
  const handleNavNavigation = (id: string) => {
    setCurrentTab(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    let targetId = '';
    if (id === 'services') targetId = 'services-section';
    else if (id === 'consultation') targetId = 'consultation-section';
    else if (id === 'artists') targetId = 'artists-section';
    else if (id === 'testimonials') targetId = 'testimonials-section';
    else if (id === 'policies') targetId = 'policies-section';
    else if (id === 'faq') targetId = 'faq-section';
    else if (id === 'contact') targetId = 'contact-section';

    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      id="app-root-container"
      className={`min-h-screen flex flex-col justify-between bg-cream transition-opacity duration-400 ease-in-out ${
        pageLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* STICKY TOP NAVIGATION ELEMENT */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleNavNavigation}
        openBookingModal={() => setIsBookingOpen(true)}
      />

      <main className="flex-grow">
        {/* HERO HEADER */}
        <Hero
          onBookClick={() => setIsBookingOpen(true)}
          onExploreClick={() => handleNavNavigation('services')}
        />

        {/* INTRODUCTORY SIGNATURE BIO BANNER */}
        <ScrollReveal delay={100} className="w-full">
          <section id="brand-story" className="py-20 md:py-28 bg-white border-b border-gray-100 text-center">
            <div className="max-w-[720px] mx-auto px-6 md:px-8">
              <div className="w-9 h-9 rounded-full bg-accent/60 mx-auto flex items-center justify-center text-primary mb-6 animate-pulse">
                <Heart size={16} className="fill-current text-primary" />
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-dark leading-tight tracking-tight mb-6">
                Redefining prestige beauty inside <span className="italic font-normal text-primary">Australia &amp; New Zealand</span>.
              </h2>
              <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed font-light mb-8">
                Blush &amp; Bloom Studio is not just a standard salon. We are a sanctuary for high-society weddings, fashion-forward coloring, and red-carpet experiences. Inspired by high-end Australian &amp; New Zealand beauty motifs, our senior artists formulate custom-tailored glazes and photogenic base glows using strictly non-toxic, certified clean formulations.
              </p>
              <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-primary font-bold">
                <Sparkles size={14} className="text-secondary animate-pulse" />
                <span>The Bloom Guarantee: Luminous hold. Pure luxury.</span>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* SERVICES MENU SECTION */}
        <ScrollReveal delay={150} className="w-full">
          <ServicesMenu
            selectedServices={selectedServices}
            onToggleService={handleToggleService}
            openBookingWithSelected={() => setIsBookingOpen(true)}
          />
        </ScrollReveal>

        {/* INTERACTIVE STYLE DIAGNOSTIC CONSULTATION QUIZ */}
        <ScrollReveal delay={150} className="w-full">
          <ConsultQuiz
            selectedServices={selectedServices}
            onAddService={handleToggleService}
            openBooking={() => setIsBookingOpen(true)}
          />
        </ScrollReveal>

        {/* BRIDAL & WEDDING PORTFOLIO GALLERY */}
        <ScrollReveal delay={150} className="w-full">
          <Portfolio />
        </ScrollReveal>

        {/* ARTISTS DOSSIER PROFILE TILES */}
        <ScrollReveal delay={150} className="w-full">
          <MeetArtists />
        </ScrollReveal>

        {/* CLIENT REVIEWS TESTIMONIAL BOARD */}
        <ScrollReveal delay={150} className="w-full">
          <Reviews />
        </ScrollReveal>

        {/* POLICIES SECTION */}
        <ScrollReveal delay={150} className="w-full">
          <Policies />
        </ScrollReveal>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <ScrollReveal delay={150} className="w-full">
          <FAQ />
        </ScrollReveal>

        {/* CONTACT & DISCOVERY MAP */}
        <ScrollReveal delay={150} className="w-full">
          <Contact />
        </ScrollReveal>
      </main>

      {/* FOOTER SECTION */}
      <footer id="studio-footer" className="bg-dark text-white pt-16 pb-24 border-t border-white/5 select-text">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/10 text-left">
            {/* BRAND LOGO COL */}
            <div className="md:col-span-4 space-y-4">
              <span className="font-serif text-3xl font-light tracking-tight block">
                Blush <span className="text-primary font-normal font-serif">&amp;</span> Bloom
              </span>
              <p className="font-sans text-xs text-gray-400 max-w-sm leading-relaxed mt-2 font-light">
                High-end Australian &amp; New Zealand hair styling, bespoke Balayage colouring, photographic party makeup, and face lifting therapies. Experience pure aesthetic luxury.
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors text-white"
                  aria-label="Instagram profile"
                >
                  <Instagram size={16} />
                </a>
              </div>
            </div>

            {/* OPENING HOUR DETAILS COL */}
            <div className="md:col-span-4 space-y-3">
              <span className="block font-sans text-xs font-bold uppercase tracking-widest text-primary">Opening Hours</span>
              <div className="space-y-1.5 font-sans text-xs text-gray-300 font-light pt-1.5">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Mon — Fri</span>
                  <span className="font-medium text-white">9:00 AM — 7:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Saturday</span>
                  <span className="font-medium text-white">8:00 AM — 6:00 PM</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span>Sunday</span>
                  <span className="font-medium text-secondary text-right">Closed (By bridal booking only)</span>
                </div>
              </div>
            </div>

            {/* CONTACTS COL */}
            <div className="md:col-span-4 space-y-3">
              <span className="block font-sans text-xs font-bold uppercase tracking-widest text-primary">Our Sanctuaries</span>
              <div className="space-y-3 pt-1.5">
                <div className="flex items-start gap-2.5 font-sans text-xs text-gray-300">
                  <MapPin size={15} className="text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-white">Australia</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 font-sans text-xs text-gray-300 border-b border-white/5 pb-2">
                  <Phone size={15} className="text-secondary shrink-0 mt-0.5" />
                  <span>+61 3 9418 0000</span>
                </div>
                <div className="flex items-start gap-2.5 font-sans text-xs text-gray-300">
                  <MapPin size={15} className="text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-white">New Zealand</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 font-sans text-xs text-gray-300">
                  <Phone size={15} className="text-secondary shrink-0 mt-0.5" />
                  <span>+64 9 307 0000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 font-sans font-light text-left gap-4">
            <span>© 2026 Blush &amp; Bloom Studio. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <span>ABN 87 123 456 789</span>
              <span>•</span>
              <span>Committed to Australian &amp; New Zealand Privacy Principles</span>
            </div>
          </div>

        </div>
      </footer>

      {/* FLOATING GENERAL ACTIONS (Calendar widget desk link) */}
      <FloatingCTA openBookingModal={() => setIsBookingOpen(true)} />

      {/* REGULATORY PRIVACY COOKIE CONSENT BANNER */}
      <CookieConsent />

      {/* MODAL RESERVATION CALENDAR FORM CONTAINER */}
      {isBookingOpen && (
        <BookingForm
          initialSelectedServices={selectedServices}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
}
