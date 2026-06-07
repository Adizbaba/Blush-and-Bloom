/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'How should I prepare my skin and hair for an appointment?',
      answer: "For bespoke styling or cuts: Please wash your hair with deep clarify shampoo 24 hours prior. For bridal styling: Dry hair completely, avoiding heated flat irons. For custom event makeup: Arrive with a clean, makeup-free face, freshly moisturized if possible. We provide a full hyaluronic prep ritual."
    },
    {
      question: 'Do you offer mobile services for weddings across Australia and New Zealand?',
      answer: "Yes, our luxury Bridal Concierge team serves key regional locations across both Australia and New Zealand, including the Yarra Valley, Mornington Peninsula, Waiheke Island, and Queenstown. Extra travel fees apply per designer based on local transit averages."
    },
    {
      question: 'Which colour formulations do you use inside the sanctuary?',
      answer: "We strictly select certified ammonia-free, dynamic organic clay bases and low-damage lighteners. Our glazes provide highly reflective multidimensional hold while protecting hair health."
    },
    {
      question: 'Can I choose a specific artist for my hair or makeup?',
      answer: "Absolutely! You can select Chloe, Sienna, or Zara when filling in our digital reservation assistant. For general bookings, we assign senior stylists based on your diagnostic answers."
    },
    {
      question: 'What is your refund policy on salon deposit locks?',
      answer: "Deposits are strictly non-refundable but can be converted into a studio credit if booking changes are completed with at least 48 hours notice. Check our studio policy section for detailed metrics."
    }
  ];

  return (
    <section id="faq-section" className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-[680px] mx-auto mb-16 select-text">
          <span className="badge mb-3">Answers &amp; Advice</span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-dark leading-tight tracking-tight">
            Frequently Asked <span className="italic">Questions</span>
          </h2>
          <div className="w-16 h-[2px] bg-primary mx-auto my-5" />
          <p className="font-sans text-xs md:text-sm text-gray-500 leading-relaxed font-light">
            Everything you need to know about preparing for your luxury session at Blush &amp; Bloom.
          </p>
        </div>

        {/* ACCORDION HOUSING */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-serif text-lg md:text-xl font-medium text-dark hover:text-primary transition-colors focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle size={18} className="text-primary shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={18} className="text-primary shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-400 shrink-0" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 font-sans text-xs md:text-sm text-gray-600 leading-relaxed font-light select-text animate-slide-down">
                    <p className="bg-white/40 p-4 rounded-xl border border-white/50">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
