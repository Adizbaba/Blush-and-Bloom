/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, ExternalLink, Instagram } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitted(false);
  };

  return (
    <section id="contact-section" className="py-20 bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-[680px] mx-auto mb-16 select-text">
          <span className="badge mb-3">Connect With Us</span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-dark leading-tight tracking-tight">
            Our Boutique <span className="italic">Sanctuaries</span>
          </h2>
          <div className="w-16 h-[2px] bg-primary mx-auto my-5" />
          <p className="font-sans text-xs md:text-sm text-gray-555 leading-relaxed font-light">
            Conveniently serving clients across our boutique spaces in Australia and New Zealand. Drop in, call us, or send an enquiry below.
          </p>
        </div>

        {/* TWO COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          
          {/* CONTACT INFO / MAP COLUMN */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="glass p-6 md:p-8 rounded-[24px] space-y-6">
              <h3 className="font-serif text-2xl font-light text-dark">Get in Touch</h3>
              
              <div className="space-y-6 pt-2">
                {/* Australia Studio */}
                <div className="space-y-2 border-b border-gray-150/50 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🇦🇺</span>
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-primary">Australia Sanctuary</span>
                  </div>
                  <div className="flex items-start gap-3 text-left">
                    <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                      <Phone size={14} />
                    </div>
                    <div>
                      <span className="block font-sans text-xs text-gray-500 select-all">+61 3 9418 0000</span>
                    </div>
                  </div>
                </div>

                {/* New Zealand Studio */}
                <div className="space-y-2 border-b border-gray-150/50 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🇳🇿</span>
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-primary">New Zealand Sanctuary</span>
                  </div>
                  <div className="flex items-start gap-3 text-left">
                    <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                      <Phone size={14} />
                    </div>
                    <div>
                      <span className="block font-sans text-xs text-gray-500 select-all">+64 9 307 0000</span>
                    </div>
                  </div>
                </div>

                {/* General Enquiries */}
                <div className="flex items-start gap-3 text-left pt-2">
                  <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="block font-sans text-xs font-semibold text-dark">Enquiries</span>
                    <span className="block font-sans text-xs text-gray-500 select-all">hello@blushandbloom.com.au</span>
                  </div>
                </div>
              </div>

              {/* INSTAGRAM LINK CTA */}
              <div className="pt-4 border-t border-gray-150 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Instagram size={18} className="text-primary" />
                  <span className="font-sans text-xs font-medium text-dark">@blushandbloom</span>
                </div>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[10px] uppercase tracking-wider font-bold text-primary flex items-center gap-1 hover:underline"
                >
                  Follow Reel Stories <ExternalLink size={10} />
                </a>
              </div>
            </div>

            {/* TRANS-TASMAN STATEMENT REPRESENTATION */}
            <div className="glass p-6 rounded-[24px] flex-1 flex flex-col justify-between overflow-hidden relative min-h-[220px]">
              <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
              <div className="relative z-5 text-left h-full flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <span className="text-primary font-bold block uppercase tracking-widest text-[9px]">Trans-Tasman Sanctuary</span>
                  <p className="font-serif text-xl font-light text-dark leading-snug">
                    Bespoke bridal, dimensional hair, and couture makeup services across <span className="italic">Australia &amp; New Zealand</span>.
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-150/50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-dark/80">
                      <span>🇦🇺</span> <span className="font-semibold">AU</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1.5 text-xs text-dark/80">
                      <span>🇳🇿</span> <span className="font-semibold">NZ</span>
                    </div>
                  </div>
                  <span className="font-sans text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                    Pure Luxury Hold
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* CONTACT INQUIRY FORM COLUMN */}
          <div className="lg:col-span-7">
            <div className="glass p-6 md:p-8 rounded-[24px] h-full flex flex-col justify-between">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 text-left">
                  <div>
                    <h3 className="font-serif text-2xl font-light text-dark mb-1">Enquire Online</h3>
                    <p className="font-sans text-xs text-gray-500 font-light">We will respond of service within 2 hours on business days.</p>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 font-medium">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="contact-name" className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="e.g. Charlotte Rose"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white/50 text-xs font-sans text-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-email" className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="e.g. charlotte@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white/50 text-xs font-sans text-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-phone" className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Mobile Number (Optional)
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="e.g. +61 412 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white/50 text-xs font-sans text-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-message" className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Your Message or Consultation Brief *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell us about your wedding timeline, styled hair goals, or makeup queries..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full p-4 rounded-xl border border-gray-200 bg-white/50 text-xs font-sans text-dark focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"
                      required
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full h-12 rounded-[20px] bg-primary text-white font-sans text-xs font-bold uppercase tracking-[0.1em] hover:opacity-90 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Send size={14} /> Send Sanctuary Inquiry
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <CheckCircle size={48} className="text-primary animate-bounce" />
                  <h3 className="font-serif text-2xl font-light text-dark">Enquiry Received</h3>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed font-light max-w-sm">
                    Thank you, <strong>{formData.name}</strong>. A Blush &amp; Bloom senior artist has been assigned to review your inquiry. We will contact you or email <strong>{formData.email}</strong> shortly.
                  </p>
                  <button
                    onClick={handleReset}
                    className="h-10 px-5 text-primary text-[10px] uppercase tracking-wider font-bold bg-primary/10 rounded-[16px] hover:bg-primary/20 transition-all cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
