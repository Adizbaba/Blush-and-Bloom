/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CLIENT_REVIEWS } from '../data';
import { Review } from '../types';
import { Star, MessageSquare, Quote, Check, AlertCircle } from 'lucide-react';

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState<Review[]>(CLIENT_REVIEWS);
  const [formOpen, setFormOpen] = useState(false);
  
  // Form submission state variables matching required input styles
  const [author, setAuthor] = useState('');
  const [service, setService] = useState('');
  const [stars, setStars] = useState(5);
  const [text, setText] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!author.trim() || !text.trim() || !service.trim()) {
      setErrorMsg('Please input your name, chosen service, and feedback comments.');
      return;
    }

    const newReview: Review = {
      id: `local-rev-${Date.now()}`,
      author: author.trim(),
      stars,
      date: 'Today',
      text: text.trim(),
      service: service.trim()
    };

    setReviewsList((prev) => [newReview, ...prev]);
    setSuccess(true);
    
    // Clear form
    setAuthor('');
    setService('');
    setStars(5);
    setText('');

    setTimeout(() => {
      setSuccess(false);
      setFormOpen(false);
    }, 2500);
  };

  return (
    <section id="testimonials-section" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/60 text-dark font-sans text-[11px] font-bold uppercase tracking-wider mb-3">
              <MessageSquare size={12} className="text-primary" />
              Prestige Endorsements
            </span>
            <h2 className="font-serif text-4xl md:text-5.5xl font-light text-dark leading-tight">
              Shared Melodies of <span className="italic font-normal text-secondary">Aesthetic Joy</span>
            </h2>
          </div>

          <button
            id="write-review-btn"
            onClick={() => setFormOpen(!formOpen)}
            className="h-12 px-6 rounded-[20px] bg-dark text-white font-sans text-xs font-bold tracking-[0.1em] uppercase hover-btn-trigger cursor-pointer self-start md:self-auto shrink-0 shadow-md"
          >
            {formOpen ? 'Close Form' : 'Write a Review'}
          </button>
        </div>

        {/* REVIEW CREATION DISPATCH FORM */}
        {formOpen && (
          <div
            id="review-submit-form"
            className="max-w-xl mx-auto glass p-6 md:p-8 rounded-[16px] shadow-md mb-12 animate-fadeIn"
          >
            <h3 className="font-serif text-2xl font-light text-dark mb-4">
              Share your <span className="italic">Bloom Experience</span>
            </h3>

            {success ? (
              <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-100 flex items-center gap-3">
                <Check size={18} className="text-emerald-600 h-5 w-5 bg-emerald-100 rounded-full p-0.5" />
                <span className="font-sans text-xs font-medium">Thank you! Your feedback has been published onto our studio feed instantly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-100 flex items-center gap-2 text-xs">
                    <AlertCircle size={14} className="text-rose-500" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1.5 label-required">
                      Your Name
                    </label>
                    <input
                      id="rev-input-author"
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Charlotte Rose"
                      className="w-full bg-white px-4 h-12 rounded-[12px] border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-dark text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1.5">
                      Treatment Received
                    </label>
                    <input
                      id="rev-input-service"
                      type="text"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      placeholder="e.g. Bondi Balayage"
                      className="w-full bg-white px-4 h-12 rounded-[12px] border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-dark text-sm"
                    />
                  </div>
                </div>

                {/* Stars selector with simple state list */}
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1.5">
                    Artist Star Rating
                  </label>
                  <div className="flex items-center space-x-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setStars(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          size={24}
                          className={`${
                            star <= stars ? 'text-secondary fill-secondary' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="font-sans text-xs text-gray-500 ml-2 font-medium">({stars}/5 Stars)</span>
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1.5">
                    Your Experience In Brief
                  </label>
                  <textarea
                    id="rev-input-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    placeholder="Tell us about the scalp massage, styling hold, pre-wedding consultation, etc..."
                    className="w-full bg-white p-4 rounded-[12px] border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-dark text-sm resize-none"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="h-11 px-6 rounded-[20px] bg-primary text-white font-sans text-xs font-bold tracking-[0.08em] uppercase hover-btn-trigger cursor-pointer shadow-sm"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* FEED GRID FOR REVIEWS USING COMPONENT TOKENS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              id={`review-item-${rev.id}`}
              className="glass p-5 rounded-[16px] flex flex-col justify-between text-left relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Decorative quotation background marks */}
              <Quote className="absolute -right-2 -bottom-2 text-primary/5 h-20 w-20 pointer-events-none select-none" />

              <div>
                <div className="flex items-center space-x-1 mb-3">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className={idx < rev.stars ? 'text-secondary fill-secondary' : 'text-gray-200'}
                    />
                  ))}
                </div>

                <p className="font-sans text-xs md:text-sm text-gray-600 italic leading-relaxed mb-6 font-light">
                  "{rev.text}"
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div>
                  <span className="block font-serif text-base font-semibold text-dark">
                    {rev.author}
                  </span>
                  <span className="block text-[10px] text-gray-400 font-sans uppercase tracking-[0.05em] mt-0.5">
                    {rev.service}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-sans font-medium">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
