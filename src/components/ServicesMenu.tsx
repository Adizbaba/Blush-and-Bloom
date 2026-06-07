/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { STUDIO_SERVICES } from '../data';
import { ServiceItem, ServiceCategory } from '../types';
import { Clock, DollarSign, Check, Plus, Minus, Info, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface ServicesMenuProps {
  selectedServices: ServiceItem[];
  onToggleService: (service: ServiceItem) => void;
  openBookingWithSelected: () => void;
}

export default function ServicesMenu({ selectedServices, onToggleService, openBookingWithSelected }: ServicesMenuProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('Hair Styling');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>('hs-1');

  const categories: ServiceCategory[] = [
    'Hair Styling',
    'Colouring',
    'Bridal',
    'Event Makeup',
    'Beauty Treatments'
  ];

  const filteredServices = STUDIO_SERVICES.filter(
    (service) => service.category === activeCategory
  );

  const toggleAccordion = (id: string) => {
    if (expandedServiceId === id) {
      setExpandedServiceId(null);
    } else {
      setExpandedServiceId(id);
    }
  };

  const isSelected = (id: string) => selectedServices.some((s) => s.id === id);

  return (
    <section id="services-section" className="py-16 md:py-24 bg-cream scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/60 text-dark font-sans text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles size={12} className="text-primary animate-pulse" />
            Signature Treatments &amp; Pricing
          </span>
          <h2 className="font-serif text-4xl md:text-5.5xl font-light text-dark leading-tight mb-4">
            Our Luxuriously Curated <span className="italic font-normal text-secondary">Experiences</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed">
            Choose from our bespoke hair design, modern colouring, prestige makeup, and beauty therapies. Tap a service to view specialized inclusions and check its features.
          </p>
        </div>

        {/* CATEGORY SELECTOR TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              id={`cat-tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                setActiveCategory(category);
                // Auto expand first service in new tab
                const firstSvc = STUDIO_SERVICES.find(s => s.category === category);
                setExpandedServiceId(firstSvc ? firstSvc.id : null);
              }}
              className={`px-5 py-3 rounded-full text-xs font-bold uppercase tracking-[0.06em] transition-all cursor-pointer ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-md scale-102'
                  : 'glass text-dark/80 hover:bg-white hover:text-primary shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SERVICES ACCORDION LIST COLUMN */}
          <div className="lg:col-span-8 space-y-4">
            {filteredServices.map((service) => {
              const open = expandedServiceId === service.id;
              const selected = isSelected(service.id);

              return (
                <div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  className={`glass rounded-[16px] shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${
                    selected ? 'ring-2 ring-primary/40' : ''
                  }`}
                >
                  {/* Accordion header */}
                  <div
                    id={`service-header-${service.id}`}
                    onClick={() => toggleAccordion(service.id)}
                    className="p-5 md:p-6 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-serif text-lg md:text-xl font-medium text-dark">
                          {service.title}
                        </span>
                        {service.badge && (
                          <span className="px-2.5 py-0.5 rounded-[12px] bg-accent text-dark font-sans text-[9px] uppercase tracking-wider font-bold">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1.5">
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-gray-400" />
                          {service.duration}
                        </span>
                        <span className="flex items-center font-medium text-dark bg-cream/80 px-2 py-0.5 rounded-md">
                          <DollarSign size={12} className="text-secondary" />
                          {service.price.replace('$', '')} AUD
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Booking checklist toggle action */}
                      <button
                        id={`add-btn-${service.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleService(service);
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                          selected
                            ? 'bg-primary text-white scale-110'
                            : 'bg-cream text-dark hover:bg-accent/40'
                        }`}
                        aria-label={selected ? "Remove from book list" : "Add to book list"}
                      >
                        {selected ? <Check size={18} /> : <Plus size={18} />}
                      </button>

                      {/* Accordion indicator */}
                      <div className="text-gray-400 p-1">
                        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                  </div>

                  {/* Accordion content with max-height transition */}
                  <div
                    id={`service-content-${service.id}`}
                    className={`transition-all duration-350 ease-in-out overflow-hidden ${
                      open ? 'max-h-[350px] opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="p-6 bg-cream/30">
                      <p className="font-sans text-sm text-gray-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="mb-4">
                        <span className="block font-sans text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-2">
                          Treatment Inclusions:
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-dark/90">
                              <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-end border-t border-gray-100 pt-4 mt-2">
                        <button
                          id={`select-cta-${service.id}`}
                          onClick={() => onToggleService(service)}
                          className={`px-4 py-2 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                            selected
                              ? 'bg-red-50 text-red-500 hover:bg-red-100'
                              : 'bg-primary text-white hover-btn-trigger'
                          }`}
                        >
                          {selected ? 'Remove Service' : 'Select Treatment'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BOOKING SUMMARY PANEL Column (Conversion-focused CTA card) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div
              id="booking-summary-card"
              className="glass p-6 rounded-[16px] shadow-md"
            >
              <h3 className="font-serif text-2xl font-light text-dark mb-4">
                Your Beauty <span className="italic">Selection</span>
              </h3>
              
              {selectedServices.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center mx-auto mb-3">
                    <Info size={20} className="text-gray-400" />
                  </div>
                  <p className="font-sans text-xs text-gray-400 px-4 leading-relaxed">
                    No treatments highlighted yet. Select services to craft your customized appointment bundle.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="space-y-3 mb-6 max-h-[180px] overflow-y-auto pr-1">
                    {selectedServices.map((svc) => (
                      <div
                        key={svc.id}
                        id={`summary-item-${svc.id}`}
                        className="flex items-center justify-between text-xs py-2 border-b border-gray-100 last:border-0"
                      >
                        <div className="pr-2">
                          <span className="block font-semibold text-dark">{svc.title}</span>
                          <span className="block text-[10px] text-gray-400 uppercase tracking-widest">{svc.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-dark">{svc.price}</span>
                          <button
                            id={`remove-summary-${svc.id}`}
                            onClick={() => onToggleService(svc)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove"
                          >
                            <Minus size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-2 border-t border-gray-200/50 pt-4 mb-6">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Treatments highlighted:</span>
                      <span>{selectedServices.length}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Total Time:</span>
                      <span>
                        {selectedServices.reduce((acc, current) => {
                          const mins = parseInt(current.duration.replace('mins', '').trim());
                          return acc + (isNaN(mins) ? 0 : mins);
                        }, 0)}{' '}
                        mins
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-serif text-dark border-t border-dashed border-gray-100 pt-2 font-medium">
                      <span>Estimated Total:</span>
                      <span className="text-primary">
                        $
                        {selectedServices.reduce((acc, current) => {
                          const val = parseInt(current.price.replace('$', '').trim());
                          return acc + (isNaN(val) ? 0 : val);
                        }, 0)}{' '}
                        AUD
                      </span>
                    </div>
                  </div>

                  {/* Button Primary: hot pink bg, white text, 48px height, 20px radius, uppercase, letter-spacing 0.08em */}
                  <button
                    id="summary-book-now-btn"
                    onClick={openBookingWithSelected}
                    className="w-full h-12 rounded-[20px] bg-primary text-white font-sans text-xs font-bold tracking-[0.08em] uppercase hover-btn-trigger shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Confirm &amp; Pick Slot
                  </button>
                </div>
              )}

              {/* Secure guarantee text */}
              <div className="flex items-center gap-2 mt-4 text-[10px] text-gray-400 select-none">
                <Check size={12} className="text-secondary shrink-0" />
                <span>Compliant with standard Salon Reservation Guidelines.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
