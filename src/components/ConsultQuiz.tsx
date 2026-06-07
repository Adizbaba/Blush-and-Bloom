/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CONSULTATION_QUIZ, STUDIO_SERVICES } from '../data';
import { ServiceItem } from '../types';
import { Sparkles, Check, RefreshCw, ArrowRight, Heart } from 'lucide-react';

interface ConsultQuizProps {
  onAddService: (service: ServiceItem) => void;
  selectedServices: ServiceItem[];
  openBooking: () => void;
}

export default function ConsultQuiz({ onAddService, selectedServices, openBooking }: ConsultQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const handleSelectOption = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentStep < CONSULTATION_QUIZ.length - 1) {
      // Small premium delay so user feels the visual selection
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setQuizFinished(true);
      }, 400);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setQuizFinished(false);
  };

  // Diagnostic recommendation logic
  const getRecommendations = (): ServiceItem[] => {
    const mainWish = answers[1]; // 'colouring', 'styling', 'bridal', 'makeup'
    const styleVibe = answers[2]; // 'natural', 'bold', 'classic', 'romantic'
    const primaryGoal = answers[3]; // 'glow', 'volume', 'blend', 'durable'

    let recs: ServiceItem[] = [];

    if (mainWish === 'colouring') {
      recs.push(STUDIO_SERVICES.find(s => s.id === 'col-1') || STUDIO_SERVICES[3]);
      if (primaryGoal === 'glow') {
        recs.push(STUDIO_SERVICES.find(s => s.id === 'col-3') || STUDIO_SERVICES[5]);
      } else {
        recs.push(STUDIO_SERVICES.find(s => s.id === 'col-2') || STUDIO_SERVICES[4]);
      }
    } else if (mainWish === 'bridal') {
      recs.push(STUDIO_SERVICES.find(s => s.id === 'br-3') || STUDIO_SERVICES[8]); // package
      if (styleVibe === 'romantic') {
        recs.push(STUDIO_SERVICES.find(s => s.id === 'br-1') || STUDIO_SERVICES[6]);
      } else {
        recs.push(STUDIO_SERVICES.find(s => s.id === 'br-2') || STUDIO_SERVICES[7]);
      }
    } else if (mainWish === 'makeup') {
      recs.push(STUDIO_SERVICES.find(s => s.id === 'em-1') || STUDIO_SERVICES[9]);
      if (styleVibe === 'natural' || primaryGoal === 'glow') {
        recs.push(STUDIO_SERVICES.find(s => s.id === 'em-2') || STUDIO_SERVICES[10]);
      }
    } else {
      // styling default
      recs.push(STUDIO_SERVICES.find(s => s.id === 'hs-2') || STUDIO_SERVICES[1]);
      if (primaryGoal === 'volume') {
        recs.push(STUDIO_SERVICES.find(s => s.id === 'hs-1') || STUDIO_SERVICES[0]);
      } else {
        recs.push(STUDIO_SERVICES.find(s => s.id === 'hs-3') || STUDIO_SERVICES[2]);
      }
    }

    return recs.slice(0, 2); // Return top 2 matching services
  };

  const recommendedItems = quizFinished ? getRecommendations() : [];

  return (
    <section id="consultation-section" className="py-16 md:py-24 bg-cream scroll-mt-20">
      <div className="max-w-[800px] mx-auto px-6 md:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft/25 text-dark font-sans text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles size={12} className="text-primary animate-pulse" />
            Bespoke Diagnostic
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-dark leading-tight">
            Virtual Style <span className="italic font-normal text-secondary">Consultation</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-gray-500 max-w-xl mx-auto mt-3">
            Answer three quick, high-end questions curated by our celebrity artists. We'll instantly match you with ideal colours, volumes, and skin prepping plans.
          </p>
        </div>

        {/* QUIZ HOUSING */}
        <div className="glass rounded-2xl shadow-md overflow-hidden min-h-[380px] flex flex-col justify-between">
          {!quizFinished ? (
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                {/* STEP INDICATOR */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-6 pb-4 border-b border-gray-100 font-sans">
                  <span className="font-medium">
                    Question {currentStep + 1} of {CONSULTATION_QUIZ.length}
                  </span>
                  <div className="flex items-center gap-1">
                    {CONSULTATION_QUIZ.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-5 h-1 rounded-full transition-all duration-300 ${
                          idx === currentStep ? 'bg-primary w-8' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question */}
                <h3 className="font-serif text-2xl md:text-3xl text-dark font-light mb-6">
                  {CONSULTATION_QUIZ[currentStep].question}
                </h3>

                {/* Options list */}
                <div className="space-y-3">
                  {CONSULTATION_QUIZ[currentStep].options.map((option, idx) => {
                    const isSelectedVal = answers[CONSULTATION_QUIZ[currentStep].id] === option.value;
                    return (
                      <button
                        key={idx}
                        id={`quiz-option-${currentStep}-${idx}`}
                        onClick={() => handleSelectOption(CONSULTATION_QUIZ[currentStep].id, option.value)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 select-none cursor-pointer ${
                          isSelectedVal
                            ? 'bg-primary/5 border-primary shadow-sm'
                            : 'bg-cream/15 border-gray-200 hover:bg-cream/40 hover:border-gray-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelectedVal ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white'
                          }`}
                        >
                          {isSelectedVal && <Check size={12} />}
                        </div>
                        <div>
                          <span className="block font-sans text-sm font-semibold text-dark">
                            {option.text}
                          </span>
                          {option.description && (
                            <span className="block font-sans text-xs text-gray-400 mt-1">
                              {option.description}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step Navigation Back */}
              {currentStep > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-500/10">
                  <button
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="text-xs font-semibold uppercase text-gray-500 hover:text-dark transition-colors"
                  >
                    ← Back to previous question
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* RESULTS STATE */
            <div className="p-6 md:p-8 text-center flex-1 flex flex-col justify-between animate-fadeIn">
              <div className="mt-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-dark mx-auto mb-4 animate-bounce">
                  <Heart size={24} className="fill-secondary text-secondary" />
                </div>
                
                <h3 className="font-serif text-3xl font-light text-dark mb-2">
                  Your Signature <span className="italic">Glow Recipe</span>
                </h3>
                <p className="font-sans text-xs text-gray-500 max-w-lg mx-auto mb-6">
                  Based on your affinity for{' '}
                  <span className="text-secondary font-semibold">
                    {CONSULTATION_QUIZ[1].options.find(o => o.value === answers[2])?.text || 'custom styling'}
                  </span>{' '}
                  and goal of{' '}
                  <span className="text-primary font-medium">
                    {CONSULTATION_QUIZ[2].options.find(o => o.value === answers[3])?.text || 'perfection'}
                  </span>, we recommend the following treatments:
                </p>

                {/* Recommendations Showcase cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-8">
                  {recommendedItems.map((item) => {
                    const added = selectedServices.some(s => s.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className="bg-cream/40 p-4 rounded-xl border border-gray-100 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <h4 className="font-serif text-base font-semibold text-dark leading-tight">
                              {item.title}
                            </h4>
                            <span className="font-sans text-xs font-bold text-secondary text-right shrink-0">
                              {item.price}
                            </span>
                          </div>
                          <p className="font-sans text-[11px] text-gray-500 leading-relaxed line-clamp-3">
                            {item.description}
                          </p>
                        </div>
                        
                        <button
                          id={`quiz-add-${item.id}`}
                          onClick={() => onAddService(item)}
                          className={`w-full mt-4 h-9 rounded-lg font-sans text-[10px] uppercase tracking-wider font-bold transition-all ${
                            added
                              ? 'bg-secondary text-white'
                              : 'bg-white border border-gray-100 text-dark hover:border-primary hover:text-primary'
                          }`}
                        >
                          {added ? '✓ Selection Saved' : '+ Highlight Treatment'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action tray */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-6">
                <button
                  id="quiz-redo-btn"
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-dark transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw size={14} />
                  Retake Diagnostic
                </button>
                <button
                  id="quiz-book-now-btn"
                  onClick={openBooking}
                  className="w-full sm:w-auto h-11 px-6 rounded-[20px] bg-primary text-white font-sans text-xs font-bold tracking-[0.08em] uppercase hover-btn-trigger shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  Apply &amp; Reserve Date
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
