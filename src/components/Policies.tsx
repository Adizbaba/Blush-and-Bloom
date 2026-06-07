/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Clock, AlertTriangle, HelpCircle, DollarSign, RefreshCw } from 'lucide-react';

export default function Policies() {
  const policiesList = [
    {
      icon: <Clock size={20} className="text-primary animate-pulse" />,
      title: 'Cancellation & Re-scheduling',
      description: 'We kindly request a minimum of 48 hours notice for cancellations or rescheduling. This allows us opportunity to offer this custom session slot to other clients on our waitlist.',
      details: 'Cancellations made within 48 hours of the scheduled treatment will incur a fee equal to 50% of the selected service rate. Same-day cancellations or "no-shows" will be charged 100% of the reserved service cost.'
    },
    {
      icon: <DollarSign size={20} className="text-primary" />,
      title: 'Securing Deposits',
      description: 'A credit-card guarantee or a deposit of 25% is required for all high-end colourings, Balayage treatments, and group bridal party bookings.',
      details: 'All bridal packages require a secured standard contract and a 25% non-refundable retainer deposit to guarantee artists on selective peak wedding dates.'
    },
    {
      icon: <AlertTriangle size={20} className="text-secondary" />,
      title: 'Late Arrivals Grace Period',
      description: 'Please arrive 5 to 10 minutes prior to your booking to indulge in complimentary organic artisan tea or champagne prep.',
      details: 'If you are late up to 15 minutes, we will accommodate your session, but we may need to shorten treatments slightly to respect subsequent bookings. Arrivals later than 15 minutes may be deemed cancellations.'
    },
    {
      icon: <RefreshCw size={20} className="text-primary" />,
      title: 'Refunds & Adjustments',
      description: 'Blush & Bloom strives for pure perfection. We do not offer direct cash refunds on completed artistic hair/makeup services.',
      details: 'Should your hair colour or cut require minor adjustment, please notify us within 7 days. We are happy to invite you back for a complimentary refinement session with your original stylist.'
    }
  ];

  return (
    <section id="policies-section" className="py-20 bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-[680px] mx-auto mb-16 select-text">
          <span className="badge mb-3">Studio Standards</span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-dark leading-tight tracking-tight">
            Our Studio <span className="italic">Policies</span>
          </h2>
          <div className="w-16 h-[2px] bg-primary mx-auto my-5" />
          <p className="font-sans text-xs md:text-sm text-gray-600 leading-relaxed font-light">
            Designed to ensure the ultimate luxury salon experience and protect the time of our elite artists. Please review our guidelines before securing bookings.
          </p>
        </div>

        {/* POLICIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {policiesList.map((item, idx) => (
            <div
              key={idx}
              className="glass p-6 md:p-8 rounded-[24px] hover:shadow-lg transition-all duration-300 flex items-start gap-4"
            >
              <div className="p-3 bg-white/60 rounded-full shrink-0 shadow-sm">
                {item.icon}
              </div>
              <div className="space-y-2 select-text">
                <h3 className="font-serif text-xl font-medium text-dark">{item.title}</h3>
                <p className="font-sans text-xs text-gray-700 leading-relaxed font-medium">{item.description}</p>
                <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">{item.details}</p>
              </div>
            </div>
          ))}
        </div>

        {/* LEGAL COMPLIANCE FOOTNOTE */}
        <div className="glass p-6 rounded-2xl max-w-4xl mx-auto flex items-center gap-3.5 border-l-4 border-l-primary text-left">
          <Shield size={20} className="text-primary shrink-0" />
          <p className="font-sans text-[11px] text-gray-600 font-light leading-relaxed">
            Blush &amp; Bloom operate strictly in accordance with the <strong>Commonwealth Australian Consumer Law (ACL)</strong> and the <strong>New Zealand Consumer Guarantees Act (CGA)</strong>. All values, treatments, and rights stated herein apply directly to Australian and New Zealand high-end bookings. For queries or contract updates, feel free to contact management.
          </p>
        </div>

      </div>
    </section>
  );
}
