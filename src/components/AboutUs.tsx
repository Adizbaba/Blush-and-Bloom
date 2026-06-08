import { Award, Star, Heart, ShieldCheck, CheckCircle, Leaf, Smile, ChevronRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { STUDIO_ARTISTS } from '../data';
// @ts-ignore
import founderPortrait from '../assets/images/regenerated_image_1780878944854.png';

interface AboutUsProps {
  onBookClick: () => void;
}

export default function AboutUs({ onBookClick }: AboutUsProps) {
  // Define Victoria Bloom as the Founder
  const founder = {
    name: 'Victoria Bloom',
    role: 'Founder & Principal Hair Designer',
    image: founderPortrait,
    bio: 'Victoria is the visionary force behind Blush & Bloom. With over 15 years of industry-defining prestige styling across London, Paris, and Sydney, Victoria curated Blush & Bloom as a sanctuary where editorial trends meet clean beauty. Having styled hair for royalty, high-fashion campaigns, and international runways, she brings an unmatched architectural precision to tailored colouring and bespoke hair artistry.',
    specialties: ['High-Fashion Cuts', 'Couture Balayage', 'Editorial Coiffure'],
    rating: 5.0,
    experience: '15+ Years'
  };

  const values = [
    {
      icon: <Leaf className="text-primary" size={24} />,
      title: 'Certified Clean Formulations',
      desc: 'We strictly formulate with non-toxic, vegan, ammonia-free, and pregnancy-safe glazes, lighteners, and styling materials. Pure wellness for hair and skin.'
    },
    {
      icon: <Star className="text-primary" size={24} />,
      title: 'Bespoke Tailoring',
      desc: 'No cookie-cutter templates. Every highlight placement and makeup shade is customized to amplify individual facial structure, skin undertones, and unique personal essence.'
    },
    {
      icon: <Heart className="text-primary" size={24} />,
      title: 'Trans-Tasman Authority',
      desc: 'Recognized across Australia and New Zealand as the pinnacle of elite aesthetic services for high-society weddings, red-carpet events, and editorial publishing.'
    }
  ];

  const highlights = [
    {
      title: 'Dermatologically Screened Products',
      desc: 'Every luxury scalp mist, finishing spray, and lash adhesive is curated to protect high-sensory skin.'
    },
    {
      title: 'Bridal Concierge Execution',
      desc: 'Multi-step pre-wedding trial simulations ensuring absolute visual and structural longevity under extreme flash bulbs or outdoor coastal winds.'
    },
    {
      title: 'Sustainable Salon Practices',
      desc: 'We recycle 95% of salon resources, minimizing our carbon and water footprints across all sanctuaries.'
    },
    {
      title: 'Honest, High-Sincerity Guidance',
      desc: 'We prioritize the raw structural integrity of your locks over short-term dramatic changes. Healthy hair is premium hair.'
    }
  ];

  return (
    <div id="about-us-page" className="bg-cream min-h-screen select-text">
      {/* HERO SECTION / HEADER */}
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
              <Award size={12} className="text-primary animate-bounce" />
              Our Legacy of Care
            </span>
            <h1 className="font-serif text-4xl md:text-6.5xl font-light text-white leading-tight tracking-tight mb-6 animate-none">
              Bespoke Prestige, <span className="italic block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#FFADF0] to-primary">Uncompromising Safety</span>
            </h1>
            <div className="w-20 h-[2px] bg-primary mx-auto my-6" />
            <p className="font-sans text-xs md:text-sm text-gray-200/90 leading-relaxed max-w-2xl mx-auto font-light">
              Blush & Bloom was founded as a quiet act of rebellion against aggressive chemical salons. Today, we stand as the ultimate multi-award winning Trans-Tasman network for high-society wedding coiffure and luminous hair wellness.
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

      {/* OUR STORY: OWNER'S PORTRAIT & BIO */}
      <section id="our-story" className="py-12 md:py-20 bg-white border-y border-gray-150/40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* OWNER PORTRAIT VIEW */}
            <div className="lg:col-span-5">
              <ScrollReveal delay={100} className="relative">
                <div className="aspect-[4/5] rounded-[32px] overflow-hidden shadow-md border border-gray-100 bg-gray-50">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover object-center scale-102 hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Vintage overlay credential tag */}
                <div className="absolute -bottom-6 -right-2 md:right-4 bg-dark text-white px-5 py-4 rounded-[20px] shadow-lg text-left max-w-[220px]">
                  <span className="block font-sans text-[9px] uppercase tracking-widest text-primary font-bold mb-1">Founder's Focus</span>
                  <p className="font-serif text-sm font-light leading-snug">
                    "Prestige beauty must never ask you to compromise your health."
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* STUDIO HISTORY & MISSION VALUES */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <ScrollReveal delay={150}>
                <span className="badge mb-3">Our Roots</span>
                <h2 className="font-serif text-3xl md:text-4.5xl font-light text-dark leading-tight mb-5">
                  The Story of <span className="italic">Blush & Bloom</span>
                </h2>
                <div className="space-y-4 font-sans text-xs md:text-sm text-gray-650 leading-relaxed font-light">
                  <p>
                    Established by master stylist Victoria Bloom, Blush & Bloom was born from a pivotal realization: the finest editorial outcomes can be accomplished entirely with non-toxic, clean botanical formulations. After a decade styling runways across Europe, Victoria envisioned a sanctuary that honored both high-fashion complexity and structural hair health.
                  </p>
                  <p>
                    From a single boutique studio, we have expanded our reach across Australia and New Zealand. Our signature formulation methodology fuses pure clay lighteners with biocompatible bond builders, allowing us to build spectacular, sun-drenched blonde dimensions and luminous, red-carpet glass finishes with zero ammonia, zero stress, and complete wellness.
                  </p>
                </div>
              </ScrollReveal>

              {/* MISSION / VALUES TILES */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                {values.map((v, idx) => (
                  <ScrollReveal key={idx} delay={200 + idx * 50} className="space-y-2">
                    <div className="p-2 rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mb-3">
                      {v.icon}
                    </div>
                    <h3 className="font-serif text-base font-light text-dark">{v.title}</h3>
                    <p className="font-sans text-[11px] text-gray-500 leading-relaxed font-light">{v.desc}</p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE TEAM: DETAILED DOSSIER */}
      <section id="meet-team" className="py-16 md:py-24 max-w-[1280px] mx-auto px-6 md:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal>
            <span className="badge mb-3">The Collective</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-dark leading-tight mb-4">
              Our Elite Crafted <span className="italic text-primary">Artists</span>
            </h2>
            <p className="font-sans text-xs md:text-sm text-gray-550 leading-relaxed font-light">
              A collaborative network of bridal directors, editorial designers, and clean-air makeup specialists dedicated to pure customer delight.
            </p>
          </ScrollReveal>
        </div>

        {/* TEAM GRID (Founder as First Lead Stylist + Other Artists) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Founder Profile Card */}
          <ScrollReveal delay={100} className="glass rounded-[24px] overflow-hidden flex flex-col justify-between text-left hover-btn-trigger">
            <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
              <img
                src={founder.image}
                alt={founder.name}
                className="w-full h-full object-cover object-center scale-102 hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-dark text-white text-[9px] font-sans uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                Lead Principal
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Star size={11} className="text-secondary fill-secondary" />
                <span className="font-sans text-[9px] uppercase tracking-wider font-bold text-dark">
                  {founder.rating.toFixed(1)} Rating
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-serif text-xl font-light text-dark leading-tight mb-1">{founder.name}</h3>
                <span className="font-sans text-[10px] text-primary font-bold uppercase tracking-widest block mb-3">{founder.role}</span>
                <p className="font-sans text-xs text-gray-550 leading-relaxed font-light">
                  Founder Victoria brings unprecedented architectural styling directly to our bridal and colour portfolios.
                </p>
              </div>
              <div className="border-t border-gray-100 pt-3 flex flex-wrap gap-1.5">
                {founder.specialties.map(spec => (
                  <span key={spec} className="px-2 py-0.5 text-[8px] font-sans uppercase font-bold tracking-wider text-dark bg-accent rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Iterate other artists from data */}
          {STUDIO_ARTISTS.map((artist, idx) => (
            <ScrollReveal key={artist.id} delay={150 + idx * 50} className="glass rounded-[24px] overflow-hidden flex flex-col justify-between text-left hover-btn-trigger">
              <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover object-top scale-102 hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star size={11} className="text-secondary fill-secondary" />
                  <span className="font-sans text-[9px] uppercase tracking-wider font-bold text-dark">
                    {artist.rating.toFixed(1)} Rating
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-light text-dark leading-tight mb-1">{artist.name}</h3>
                  <span className="font-sans text-[10px] text-primary font-bold uppercase tracking-widest block mb-3">{artist.role}</span>
                  <p className="font-sans text-xs text-gray-550 leading-relaxed font-light">
                    {artist.bio.slice(0, 115)}...
                  </p>
                </div>
                <div className="border-t border-gray-100 pt-3 flex flex-wrap gap-1.5">
                  {artist.specialties.map(spec => (
                    <span key={spec} className="px-2 py-0.5 text-[8px] font-sans uppercase font-bold tracking-wider text-dark bg-accent rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US: KEY BENEFITS, PREMIUM PRODUCTS */}
      <section id="why-choose-us" className="py-16 md:py-24 bg-white border-y border-gray-150/45 text-left">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* TEXT INFO COL */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal>
                <span className="badge mb-3">Prestige Standard</span>
                <h2 className="font-serif text-3xl md:text-5xl font-light text-dark leading-tight mb-4">
                  Why Discerning Clients <br />
                  <span className="italic">Choose Our Sanctuaries</span>
                </h2>
                <p className="font-sans text-xs md:text-sm text-gray-550 leading-relaxed font-light pb-4">
                  We formulate and treat every look with deep botanical understanding. No pungent vapours, no aggressive low-cost bleaching agents. Just healthy scalp luxury and bespoke tonal longevity.
                </p>
              </ScrollReveal>

              {/* HIGHLIGHT CHECK GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {highlights.map((item, idx) => (
                  <ScrollReveal key={idx} delay={100 + idx * 50} className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={15} className="text-primary shrink-0" />
                      <span className="font-sans text-xs font-semibold text-dark leading-none">{item.title}</span>
                    </div>
                    <p className="font-sans text-[11px] text-gray-500 leading-relaxed font-light pl-5">
                      {item.desc}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* ARTISTIC GRAPHIC LAYOUT */}
            <div className="lg:col-span-6">
              <ScrollReveal delay={200} className="glass p-6 md:p-8 rounded-[32px] space-y-6 relative overflow-hidden bg-cream/10 border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full pointer-events-none blur-xl" />
                <h3 className="font-serif text-2xl font-light text-dark">Our Pure Certifications</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/70 border border-gray-100">
                    <span className="text-xl shrink-0">🌿</span>
                    <div>
                      <span className="block font-sans text-xs font-bold uppercase tracking-wider text-primary">100% Ammonia-Free Color Systems</span>
                      <span className="block font-sans text-[11px] text-gray-500 leading-relaxed mt-1 font-light">We exclusively formulate our bespoke glows using clean botanical base carrier creams, removing aggressive vapours entirely.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/70 border border-gray-100">
                    <span className="text-xl shrink-0">🐰</span>
                    <div>
                      <span className="block font-sans text-xs font-bold uppercase tracking-wider text-primary">Cruelty-Free & PETA Approved</span>
                      <span className="block font-sans text-[11px] text-gray-500 leading-relaxed mt-1 font-light">Zero animal testing. All elixirs, glazes, hair treatments, and face mists are ethically sourced and certified clean.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/70 border border-gray-100">
                    <span className="text-xl shrink-0">🛡️</span>
                    <div>
                      <span className="block font-sans text-xs font-bold uppercase tracking-wider text-primary">Dermatologically Certified Safe</span>
                      <span className="block font-sans text-[11px] text-gray-500 leading-relaxed mt-1 font-light">Designed for high-sensitivity guests, eliminating synthetic dyes, harsh sulphates, and carcinogenic parabens.</span>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#FF4FA3]">
                    <ShieldCheck size={12} className="text-[#FF4FA3]" /> Eco-Luxe Hair Integrity Certified
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* DELUXE CALL-TO-ACTION */}
      <section className="py-16 md:py-24 max-w-[1280px] mx-auto px-6 md:px-8 text-center">
        <ScrollReveal className="glass-dark p-8 md:p-16 rounded-[40px] bg-dark/90 text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
          <div className="max-w-[640px] mx-auto relative z-5 space-y-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 font-sans text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
              The Sanctuary Invitation
            </span>
            <h2 className="font-serif text-3.5xl md:text-5.5xl font-light leading-tight tracking-tight text-white mb-4">
              Begin Your Pure <br />
              <span className="italic font-serif font-normal text-primary">Prestige Experience</span>
            </h2>
            <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed font-light mb-8 max-w-xl mx-auto">
              Our bespoke bridal trials and custom balayage booking desks fill weeks in advance. Tap below to secure your exquisite treatment today.
            </p>
            <button
              onClick={onBookClick}
              className="h-13 px-8 rounded-full bg-primary hover:bg-[#FF4FA3] active:scale-95 text-white font-sans text-xs font-bold tracking-[0.15em] uppercase shadow-lg transition-all duration-300 inline-flex items-center gap-2"
            >
              Book Your Appointment <ChevronRight size={14} />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
