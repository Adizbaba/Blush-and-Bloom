/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { STUDIO_SERVICES } from '../data';
import { ServiceItem } from '../types';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  Check, 
  User, 
  Mail, 
  Phone, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  AlertCircle, 
  CheckCircle,
  FileText,
  DollarSign
} from 'lucide-react';

interface BookingFormProps {
  initialSelectedServices: ServiceItem[];
  onClose: () => void;
}

export default function BookingForm({ initialSelectedServices, onClose }: BookingFormProps) {
  // Studio choice representing expanding to both Australia & New Zealand
  const [selectedStudio, setSelectedStudio] = useState<'Australia' | 'New Zealand'>('Australia');

  const tzSuffix = selectedStudio === 'Australia' ? 'AEST' : 'NZST';
  const currencySuffix = selectedStudio === 'Australia' ? 'AUD' : 'NZD';

  // Main Stepper states: 1, 2, 3, 4, or 'success'
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>(initialSelectedServices);
  
  // Date & Time states
  // We initialize the calendar view to June 2026, corresponding to the mock system date
  const [viewDate, setViewDate] = useState<Date>(new Date(2026, 5)); 
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 5, 5)); // Default to June 5, 2026
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM AEST');

  useEffect(() => {
    setSelectedTime(`10:30 AM ${selectedStudio === 'Australia' ? 'AEST' : 'NZST'}`);
  }, [selectedStudio]);

  // Member states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);

  // Error and UI States
  const [errorMess, setErrorMess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showPolicyOverlay, setShowPolicyOverlay] = useState(false);

  // Time Slots in Australia (AEST) or New Zealand (NZST)
  const TIME_SLOTS = [
    `09:00 AM ${tzSuffix}`,
    `10:30 AM ${tzSuffix}`,
    `12:00 PM ${tzSuffix}`,
    `01:30 PM ${tzSuffix}`,
    `03:00 PM ${tzSuffix}`,
    `04:30 PM ${tzSuffix}`,
    `06:00 PM ${tzSuffix}`
  ];

  // Unique categories for filtering Service selections
  const CATEGORIES = ['All', 'Hair Styling', 'Colouring', 'Bridal', 'Event Makeup', 'Beauty Treatments'];

  // Handle service toggling inside Step 1
  const handleToggleService = (service: ServiceItem) => {
    const exists = selectedServices.some(s => s.id === service.id);
    if (exists) {
      setSelectedServices(prev => prev.filter(s => s.id !== service.id));
    } else {
      setSelectedServices(prev => [...prev, service]);
    }
  };

  // Auto scroll to top of form area when changing steps to maintain context
  useEffect(() => {
    const scroller = document.getElementById('booking-scroller');
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  // Pure JS Monthly Calendar Utilities
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(viewDate);
  const firstDay = getFirstDayOfMonth(viewDate);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const preOffset = Array.from({ length: firstDay }, (_, i) => i);

  // Calendar validation rules
  const isWeekend = (day: number) => {
    const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const dayOfWeek = d.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
  };

  const isPastDate = (day: number) => {
    const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day, 23, 59, 59);
    // Standard system static date June 5, 2026. Dates before then are disabled.
    const today = new Date(2026, 5, 5);
    return d < today;
  };

  const isUnavailable = (day: number) => {
    // Arbitrary seed dates to represent greyed out booked appointments (10th, 17th, 24th, 25th)
    return day === 10 || day === 17 || day === 24 || day === 25;
  };

  // Navigating months
  const handleNextMonth = () => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handlePrevMonth = () => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  // Format Australian/New Zealand Phone Number Input
  const handlePhoneChange = (val: string) => {
    // Strip non-numbers
    const clearDigits = val.replace(/\D/g, '');
    
    // Format if AU style starting with 04
    if (clearDigits.startsWith('04') && clearDigits.length <= 10) {
      let formatted = clearDigits;
      if (clearDigits.length > 4 && clearDigits.length <= 7) {
        formatted = `${clearDigits.slice(0, 4)} ${clearDigits.slice(4)}`;
      } else if (clearDigits.length > 7) {
        formatted = `${clearDigits.slice(0, 4)} ${clearDigits.slice(4, 7)} ${clearDigits.slice(7)}`;
      }
      setPhone(formatted);
    } else if (clearDigits.startsWith('02') && clearDigits.length <= 11) {
      // Format New Zealand style starting with 02
      let formatted = clearDigits;
      if (clearDigits.length > 3 && clearDigits.length <= 6) {
        formatted = `${clearDigits.slice(0, 3)} ${clearDigits.slice(3)}`;
      } else if (clearDigits.length > 6) {
        formatted = `${clearDigits.slice(0, 3)} ${clearDigits.slice(3, 6)} ${clearDigits.slice(6)}`;
      }
      setPhone(formatted);
    } else {
      // General input fall-through
      setPhone(val);
    }
  };

  // Navigation Guard Checks
  const handleNext = () => {
    setErrorMess('');

    if (step === 1) {
      if (selectedServices.length === 0) {
        setErrorMess('Please select at least one hair, styling, or beauty treatment.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate) {
        setErrorMess('Please select an available date on the booking calendar.');
        return;
      }
      if (!selectedTime) {
        setErrorMess('Please select an available start afternoon/morning time slot.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!firstName.trim() || !lastName.trim()) {
        setErrorMess('Please provide your First Name and Last Name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMess('Please specify a valid email address.');
        return;
      }
      
      // Clean digit checks for AU/NZ formats on mobile number
      const digitsOnly = phone.replace(/\s+/g, '');
      if (digitsOnly.length < 9) {
        setErrorMess('Please specify a valid Australian or New Zealand mobile number.');
        return;
      }

      if (!agreeToPolicy) {
        setErrorMess('You must read and agree to our Blush & Bloom salon scheduling policies.');
        return;
      }
      setStep(4);
    }
  };

  const handleBack = () => {
    setErrorMess('');
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const getSvcTotal = () => {
    return selectedServices.reduce((acc, current) => {
      const val = parseInt(current.price.replace('$', '').trim());
      return acc + (isNaN(val) ? 0 : val);
    }, 0);
  };

  const getSvcMins = () => {
    return selectedServices.reduce((acc, current) => {
      const mins = parseInt(current.duration.replace('mins', '').trim());
      return acc + (isNaN(mins) ? 0 : mins);
    }, 0);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Smooth transition simulation for premium feeling
    setTimeout(() => {
      setSubmitting(false);
      setStep(5); // 5 represents success
    }, 1500);
  };

  // Selected Date Formatting
  const getFormattedDate = (date: Date | null) => {
    if (!date) return 'No date selected';
    return date.toLocaleDateString('en-AU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredServices = selectedCategory === 'All' 
    ? STUDIO_SERVICES 
    : STUDIO_SERVICES.filter(s => s.category === selectedCategory);

  const mockReference = `BB-${tzSuffix}-${Math.floor(Math.random() * 9000 + 1000)}`;

  return (
    <div
      id="booking-modal-overlay"
      className="fixed inset-0 z-50 bg-dark/75 backdrop-blur-md flex items-center justify-center p-4 md:p-6 select-text"
    >
      <div
        id="booking-modal-housing"
        className="glass text-dark w-full max-w-3xl rounded-[24px] overflow-hidden shadow-2xl max-h-[92vh] flex flex-col justify-between border border-white/40 bg-white/80"
      >
        {/* HEADER BAR */}
        <div className="p-5 md:p-6 border-b border-gray-100 flex items-center justify-between select-none bg-white/90">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#FF4FA3]/10 flex items-center justify-center text-primary">
              <Calendar size={18} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold leading-normal text-dark">
                Blush <span className="text-primary font-normal font-serif">&amp;</span> Bloom Salon
              </h3>
              <span className="text-[10px] uppercase tracking-widest text-[#FF4FA3] font-sans block">
                Appointment Desk / {selectedStudio === 'Australia' ? 'Australia' : 'New Zealand'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-dark transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* STEP PROGRESS INDICATOR */}
        {step <= 4 && (
          <div className="bg-white/40 px-6 py-4.5 border-b border-gray-100 select-none">
            <div className="flex justify-between items-center mb-2.5">
              <span className="font-sans text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                Progress
              </span>
              <span className="font-sans text-[11px] font-bold text-primary uppercase tracking-widest">
                Step {step} of 4
              </span>
            </div>
            
            {/* Real Progress Bar */}
            <div className="w-full h-1.5 bg-gray-200/60 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-in-out"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>

            {/* Sub-label indicators */}
            <div className="grid grid-cols-4 gap-1 text-center font-sans text-[9px] uppercase font-bold tracking-wider mt-3 text-gray-400">
              <span className={step === 1 ? 'text-primary' : step > 1 ? 'text-primary' : ''}>1. Service</span>
              <span className={step === 2 ? 'text-primary' : step > 2 ? 'text-primary' : ''}>2. Date &amp; Time</span>
              <span className={step === 3 ? 'text-primary' : step > 3 ? 'text-primary' : ''}>3. Details</span>
              <span className={step === 4 ? 'text-primary' : ''}>4. Review</span>
            </div>
          </div>
        )}

        {/* CONTAINER SCROLLER FOR TRANSITIONS */}
        <div 
          id="booking-scroller" 
          className="flex-1 overflow-y-auto p-6 md:p-8 bg-cream/30 scroll-smooth"
        >
          {errorMess && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <AlertCircle size={15} />
              <span>{errorMess}</span>
            </div>
          )}

          {/* STEP 1: SELECT A SERVICE */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn text-left">
              <div>
                <h4 className="font-serif text-2xl font-light text-dark mb-1">
                  Step 1 — <span className="italic font-normal text-[#FF6B6B]">Select a Service</span>
                </h4>
                <p className="font-sans text-xs text-gray-500 font-light">
                  Choose from our prestigious array of high-gloss coloring, boutique cuts, and camera-ready makeup formulas.
                </p>
              </div>

              {/* LOCATION SELECTOR FOR AUSTRALIA & NEW ZEALAND */}
              <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                <span className="block font-sans text-[10px] uppercase tracking-[0.15em] text-primary font-bold mb-2.5">
                  Select Salon Sanctuary Location:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedStudio('Australia')}
                    className={`h-11 rounded-xl font-sans text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      selectedStudio === 'Australia'
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-white/90 text-dark/80 hover:bg-white border border-gray-200'
                    }`}
                  >
                    <span>🇦🇺</span> Australia Sanctuary
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStudio('New Zealand')}
                    className={`h-11 rounded-xl font-sans text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      selectedStudio === 'New Zealand'
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-white/90 text-dark/80 hover:bg-white border border-gray-200'
                    }`}
                  >
                    <span>🇳🇿</span> New Zealand Sanctuary
                  </button>
                </div>
              </div>

              {/* CATEGORY TABS SELECTOR */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-primary text-white shadow-md scale-102'
                        : 'glass hover:bg-white text-dark/80 shadow-sm'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* SERVICE CARDS LIST */}
              <div className="space-y-3.5 max-h-[360px] overflow-y-auto pr-1">
                {filteredServices.map(svc => {
                  const isChecked = selectedServices.some(s => s.id === svc.id);
                  return (
                    <div
                      key={svc.id}
                      onClick={() => handleToggleService(svc)}
                      className={`p-4 rounded-2xl transition-all cursor-pointer flex items-center justify-between border text-left ${
                        isChecked
                          ? 'bg-white border-primary shadow-md ring-1 ring-primary/20'
                          : 'glass border-gray-150/40 hover:bg-white/80 hover:border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 mr-4">
                        {/* Custom Select Box */}
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                            isChecked 
                              ? 'bg-primary border-primary text-white' 
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                        <div className="space-y-0.5">
                          <span className="block font-sans text-xs md:text-sm font-bold text-dark leading-tight">
                            {svc.title}
                          </span>
                          <span className="block text-[10px] text-gray-400 font-light">
                            {svc.category} • {svc.duration} hours
                          </span>
                          <p className="text-[11px] text-gray-500 font-light tracking-normal leading-normal line-clamp-1">
                            {svc.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Price and Duration Badge highlight */}
                      <div className="text-right shrink-0">
                        <span className="block font-sans text-sm font-extrabold text-dark tracking-tight">
                          {svc.price}
                        </span>
                        <span className="block text-[9px] text-gray-400 uppercase tracking-widest font-sans mt-0.5">
                          {currencySuffix}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* SELECTION PREVIEW BANNER */}
              {selectedServices.length > 0 && (
                <div className="p-4 bg-primary/5 rounded-xl flex items-center justify-between border border-primary/10 select-none animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-primary animate-pulse" />
                    <span className="font-sans text-xs font-semibold text-primary">
                      {selectedServices.length} Treatment(s) selected
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-dark">
                    Est. Total: ${getSvcTotal()} {currencySuffix}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: DATE & TIME SELECTOR (Calendar View) */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn text-left">
              <div>
                <h4 className="font-serif text-2xl font-light text-dark mb-1">
                  Step 2 — <span className="italic font-normal text-[#FF6B6B]">Select Date &amp; Time</span>
                </h4>
                <p className="font-sans text-xs text-gray-500 font-light">
                  Pick a convenient weekday start time. Mon-Fri sessions. Weekends are reserved for dedicated bridal events.
                </p>
              </div>

              {/* PURE JS CALENDAR CONTAINER */}
              <div className="glass p-5 rounded-3xl bg-white/75 border border-white/50 shadow-sm">
                
                {/* Month Controller header */}
                <div className="flex justify-between items-center mb-4 select-none">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-cream rounded-full text-dark transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="font-serif text-base font-semibold text-dark">
                    {viewDate.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-cream rounded-full text-dark transition-colors cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Day Headers Grid */}
                <div className="grid grid-cols-7 gap-1 text-center font-sans text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2 mb-2 select-none">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1.5 text-center">
                  {/* Empty offsets days of previous month */}
                  {preOffset.map(n => (
                    <div key={`offset-${n}`} className="aspect-square opacity-0 pointer-events-none" />
                  ))}

                  {/* Active days rendering */}
                  {daysArray.map(day => {
                    const weekend = isWeekend(day);
                    const past = isPastDate(day);
                    const unavailable = isUnavailable(day);
                    const isSelect = selectedDate && 
                                     selectedDate.getDate() === day && 
                                     selectedDate.getMonth() === viewDate.getMonth() && 
                                     selectedDate.getFullYear() === viewDate.getFullYear();

                    // Resolve disabled conditions: Weekends and Past dates are disabled
                    const isDisabled = weekend || past || unavailable;

                    return (
                      <button
                        key={`day-${day}`}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => setSelectedDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))}
                        className={`aspect-square rounded-full font-sans text-xs font-semibold flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                          isSelect
                            ? 'bg-primary text-white shadow-md'
                            : isDisabled
                              ? weekend
                                ? 'bg-gray-100/40 text-gray-300 cursor-not-allowed'
                                : 'bg-rose-50/20 text-rose-200/50 cursor-not-allowed line-through'
                              : 'hover:bg-primary/15 text-dark/95'
                        }`}
                      >
                        <span>{day}</span>
                        {/* Small decorative dot for selected */}
                        {isSelect && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-white animate-pulse" />}
                        {/* Red hash line or indicator for fully booked unavailability */}
                        {unavailable && !past && !weekend && (
                          <span className="absolute inset-0 border-t border-red-300 rotate-12 self-center opacity-40 pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Calendar Legend indicators */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap justify-center gap-4 text-[10px] font-sans text-gray-400 select-none">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-cream hover:bg-primary/20" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-100/60" />
                    <span>Closed (Weekend)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-50/20 text-rose-300 line-through" />
                    <span>No Slots (Booked Out)</span>
                  </div>
                </div>

              </div>

              {/* TIME SLOTS AS PILL BUTTONS */}
              <div className="glass p-5 rounded-3xl bg-white/75 border border-white/50 shadow-sm animate-fadeIn">
                <div className="flex items-center gap-2 mb-3.5 text-left">
                  <Clock size={15} className="text-secondary animate-pulse" />
                  <span className="block font-sans text-[11px] uppercase tracking-wider text-gray-500 font-bold">
                    Available {tzSuffix} Time Slots on {selectedDate ? selectedDate.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' }) : 'your chosen date'}:
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-3 px-1 hover:scale-[1.02] text-center rounded-xl font-sans text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                        selectedTime === slot
                          ? 'bg-secondary text-white shadow-md'
                          : 'glass hover:bg-white text-dark/95'
                      }`}
                    >
                      {slot.replace(` ${tzSuffix}`, '')}
                      <span className="block text-[8px] uppercase tracking-widest opacity-60 font-light mt-0.5">
                        {tzSuffix} Time
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PERSONAL COMPREHENSIVE GUEST DETAILS */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn text-left">
              <div>
                <h4 className="font-serif text-2xl font-light text-dark mb-1">
                  Step 3 — <span className="italic font-normal text-[#FF6B6B]">Guest Details</span>
                </h4>
                <p className="font-sans text-xs text-gray-500 font-light">
                  Input your contact coordinates below to secure the appointment with our senior designers.
                </p>
              </div>

              <div className="space-y-4">
                {/* Names grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">
                      First Name *
                    </label>
                    <div className="relative flex items-center">
                      <User size={15} className="absolute left-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="e.g. Isla"
                        className="w-full bg-white pl-11 pr-4 h-11 rounded-xl border border-gray-150 focus:border-primary outline-none text-dark text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">
                      Last Name *
                    </label>
                    <div className="relative flex items-center">
                      <User size={15} className="absolute left-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="e.g. Thompson"
                        className="w-full bg-white pl-11 pr-4 h-11 rounded-xl border border-gray-150 focus:border-primary outline-none text-dark text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Email and Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">
                      Email Address *
                    </label>
                    <div className="relative flex items-center">
                      <Mail size={15} className="absolute left-4 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. isla.t@gmail.com.au"
                        className="w-full bg-white pl-11 pr-4 h-11 rounded-xl border border-gray-150 focus:border-primary outline-none text-dark text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">
                      {selectedStudio === 'Australia' ? 'Australian' : 'New Zealand'} Mobile *
                    </label>
                    <div className="relative flex items-center">
                      <Phone size={15} className="absolute left-4 text-gray-400" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder={selectedStudio === 'Australia' ? '04XX XXX XXX' : '02XX XXX XXX'}
                        className="w-full bg-white pl-11 pr-4 h-11 rounded-xl border border-gray-150 focus:border-primary outline-none text-dark text-xs animate-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Styling Notes */}
                <div className="space-y-1">
                  <label className="block font-sans text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">
                    Special Styling Requests / Hair Profile Notes (Optional)
                  </label>
                  <textarea
                    rows={2.5}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="E.g. hair length is medium-thick, preferring specific tone adjustments or styling highlights..."
                    className="w-full bg-white/80 p-3.5 rounded-xl border border-gray-150 focus:border-primary outline-none text-dark text-xs resize-none"
                  />
                </div>

                {/* PRIVACY & CANCELLATION CHECKBOX */}
                <div className="p-4 rounded-2xl glass bg-white/60 border border-gray-150">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeToPolicy}
                      onChange={(e) => setAgreeToPolicy(e.target.checked)}
                      className="mt-1 accent-primary h-4.5 w-4.5"
                    />
                    <div className="text-left font-sans text-[11px] leading-relaxed text-gray-600">
                      <span>I have read and agree to the </span>
                      <button
                        type="button"
                        onClick={() => setShowPolicyOverlay(true)}
                        className="text-primary font-bold hover:underline inline focus:outline-none cursor-pointer"
                      >
                        Booking &amp; Cancellation Policy
                      </button>
                      <span>. I understand cancellations within 48 hours are subject to a standard boutique charge.</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & CONFIRM BOOKING SLIP */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn text-left select-text">
              <div>
                <h4 className="font-serif text-2xl font-light text-dark mb-1">
                  Step 4 — <span className="italic font-normal text-[#FF6B6B]">Review &amp; Confirm</span>
                </h4>
                <p className="font-sans text-xs text-gray-500 font-light">
                  Please confirm your selected session information prior to reserving slot locks.
                </p>
              </div>

              {/* RESERVATION RECEIPT CARD */}
              <div className="glass p-6 md:p-8 rounded-[24px] bg-white border border-gray-150 shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#FF4FA3] to-[#FF6B6B]" />

                <h5 className="font-serif text-xl font-medium text-dark pb-3.5 border-b border-gray-100 flex justify-between items-center">
                  <span>Booking Summary</span>
                  <span className="text-xs uppercase font-sans tracking-widest text-primary font-bold">In-Boutique</span>
                </h5>

                <div className="space-y-4 pt-4">
                  {/* Guest block */}
                  <div className="flex gap-3">
                    <div className="p-2 h-9 w-9 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                      <User size={15} />
                    </div>
                    <div>
                      <span className="block font-sans text-[8px] uppercase tracking-widest text-gray-400 font-bold">Reserved Guest:</span>
                      <span className="font-sans text-sm font-semibold text-dark leading-tight">
                        {firstName} {lastName}
                      </span>
                      <span className="block text-xs text-gray-550 pt-0.5 select-all">
                        {email} • {phone}
                      </span>
                    </div>
                  </div>

                  {/* Datetime block */}
                  <div className="flex gap-3">
                    <div className="p-2 h-9 w-9 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center shrink-0">
                      <Clock size={15} />
                    </div>
                    <div>
                      <span className="block font-sans text-[8px] uppercase tracking-widest text-gray-400 font-bold">Schedules Arrival:</span>
                      <span className="font-sans text-sm font-semibold text-dark">
                        {getFormattedDate(selectedDate)}
                      </span>
                      <span className="block text-xs text-primary font-bold mt-0.5">
                        {selectedTime}
                      </span>
                    </div>
                  </div>

                  {/* Services summary block */}
                  <div className="border-t border-gray-100 pt-3">
                    <span className="block font-sans text-[8px] uppercase tracking-widest text-gray-400 font-bold mb-2">Booked Treatments:</span>
                    <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                      {selectedServices.map(svc => (
                        <div key={svc.id} className="flex justify-between items-center bg-cream/50 px-3 py-2 rounded-xl text-xs font-medium text-dark">
                          <div>
                            <span className="block font-semibold leading-normal">{svc.title}</span>
                            <span className="block text-[9px] text-gray-400 font-light">{svc.duration}</span>
                          </div>
                          <span className="font-bold shrink-0">{svc.price} {currencySuffix}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary calculations footer strip */}
                  <div className="border-t border-gray-150 pt-3.5 flex justify-between items-center text-dark">
                    <div>
                      <span className="block font-sans text-[8px] uppercase tracking-widest text-gray-400 font-bold">Estimated Time:</span>
                      <span className="font-sans text-xs font-semibold">{getSvcMins()} minutes</span>
                    </div>
                    <div className="text-right">
                      <span className="block font-sans text-[8px] uppercase tracking-widest text-gray-400 font-bold">Estimated Total {currencySuffix}:</span>
                      <span className="font-sans text-base font-extrabold text-primary">${getSvcTotal()} {currencySuffix}</span>
                    </div>
                  </div>

                  {notes && (
                    <div className="bg-cream/40 p-3 rounded-xl text-xs text-gray-555 font-light leading-relaxed italic border border-dashed border-gray-200">
                      "Notes: {notes}"
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SUCCESS SCREEN */}
          {step === 5 && (
            <div id="booking-success-slip" className="text-center py-8 md:py-12 animate-fadeIn text-dark select-text">
              <div className="w-18 h-18 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-5 animate-scale-up border border-emerald-100">
                <CheckCircle size={36} className="text-emerald-500" />
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/60 text-dark font-sans text-[10px] font-bold uppercase tracking-wider mb-2">
                <Sparkles size={11} className="text-primary animate-pulse" />
                You're booked in!
              </span>

              <h4 className="font-serif text-3xl md:text-4xl font-light text-dark max-w-md mx-auto leading-tight mb-2">
                Let's get <span className="italic font-normal text-primary">glowing</span>!
              </h4>
              
              <p className="font-sans text-xs text-gray-550 max-w-sm mx-auto mb-8 leading-relaxed font-light">
                A confirmation will be sent to your email at <span className="font-medium text-dark">{email}</span>. A text reminder has also been lined up to reach {phone}. See you in {selectedStudio}.
              </p>

              {/* SLIP RECEIPT CARD */}
              <div className="max-w-md mx-auto glass p-6 rounded-2xl text-left shadow-lg relative overflow-hidden bg-white">
                <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-emerald-400 to-[#FF4FA3]" />

                <div className="flex justify-between items-center pb-4 border-b border-gray-150 mb-4">
                  <div>
                    <span className="block font-sans text-[9px] uppercase tracking-widest text-gray-400 font-bold">Reference Code:</span>
                    <span className="font-sans text-sm font-extrabold text-dark tracking-tight select-all">{mockReference}</span>
                  </div>
                  <div className="text-right">
                    <span className="block font-sans text-[9px] uppercase tracking-widest text-gray-400 font-bold">Paid Deposit:</span>
                    <span className="font-sans text-sm font-extrabold text-primary">${Math.round(getSvcTotal() * 0.25)} {currencySuffix}</span>
                  </div>
                </div>

                <div className="space-y-4 font-sans text-xs">
                  <div className="flex items-start gap-2.5">
                    <Calendar size={15} className="text-secondary shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-sans text-[9px] uppercase tracking-widest text-gray-400 font-bold">Date &amp; Arrival:</span>
                      <span className="font-sans text-xs font-semibold text-dark">{getFormattedDate(selectedDate)} at {selectedTime}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock size={15} className="text-secondary shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-sans text-[9px] uppercase tracking-widest text-gray-400 font-bold">Allocated Salon Time:</span>
                      <span className="font-sans text-xs font-semibold text-dark">{getSvcMins()} minutes / {selectedServices.length} inclusions</span>
                    </div>
                  </div>

                  <div>
                    <span className="block font-sans text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1.5">Treatments Reserved:</span>
                    <div className="space-y-1.5">
                      {selectedServices.map(svc => (
                        <div key={svc.id} className="flex justify-between text-xs text-dark/95 bg-cream/40 px-3 py-1.5 rounded-xl">
                          <span>{svc.title}</span>
                          <span className="font-bold">{svc.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={onClose}
                  className="h-11 px-8 rounded-full bg-dark text-white font-sans text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-all cursor-pointer shadow-md inline-flex items-center justify-center"
                >
                  Return to Studio
                </button>
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM NAV BAR */}
        {step <= 4 && (
          <div className="p-5 md:p-6 bg-white border-t border-gray-100 flex items-center justify-between gap-4 select-none">
            {/* Total Estimated Left panel */}
            <div className="hidden sm:block text-left text-xs text-dark">
              <span className="block font-semibold text-primary">{selectedServices.length} Treatment(s) selected</span>
              <span className="block text-[10px] text-gray-400">Estimated Total: <span className="font-bold text-dark">${getSvcTotal()} {currencySuffix}</span></span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="h-11 px-5 rounded-[20px] glass font-sans text-xs font-bold uppercase tracking-wider hover:bg-gray-55 transition-all text-dark cursor-pointer"
                >
                  Back
                </button>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="h-11 px-6 rounded-[20px] bg-primary text-white font-sans text-xs font-bold tracking-[0.08em] uppercase hover:opacity-90 transition-all flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto shadow-sm"
                >
                  Continue
                  <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleFinalSubmit}
                  disabled={submitting}
                  className="h-11 px-7 rounded-[20px] bg-primary text-white font-sans text-xs font-bold tracking-[0.08em] uppercase hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto shadow-md"
                >
                  {submitting ? 'Locking Appointment...' : 'Confirm Appointment'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* INLINE POLICIES OVERLAY FOR FRICTIONLESS CLIENT DETAILS */}
        {showPolicyOverlay && (
          <div 
            className="fixed inset-0 z-55 bg-dark/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowPolicyOverlay(false)}
          >
            <div 
              className="glass p-6 md:p-8 rounded-[24px] bg-white text-dark max-w-lg w-full shadow-2xl space-y-4 select-text"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center pb-2.5 border-b border-gray-150">
                <div className="flex items-center gap-2">
                  <FileText className="text-primary" size={18} />
                  <h4 className="font-serif text-lg font-bold">Blush &amp; Bloom Policy Summary</h4>
                </div>
                <button
                  onClick={() => setShowPolicyOverlay(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-dark transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4.5 font-sans text-xs text-gray-600 leading-relaxed max-h-[300px] overflow-y-auto pr-1">
                <div>
                  <h5 className="font-bold text-dark pb-1 text-left flex items-center gap-1.5">
                    <Clock size={12} className="text-primary" /> 1. Cancellations &amp; Re-scheduling
                  </h5>
                  <p className="font-light text-left pl-4.5">
                    We request a minimum of <strong>48 hours</strong> notice for any cancellations or schedule changes. Within 48 hours, 50% fees apply. Same-day cancellations or no-shows incur a full 100% service fee.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-dark pb-1 text-left flex items-center gap-1.5">
                    <DollarSign size={12} className="text-primary" /> 2. Booking Hold Deposits
                  </h5>
                  <p className="font-light text-left pl-4.5">
                    A 25% credit-card security hold or deposit is logged for balayage treatments, high-end colouring, and wedding trials. Retainers are non-refundable but stay active for reschedule credits.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-dark pb-1 text-left flex items-center gap-1.5">
                    <AlertCircle size={12} className="text-secondary" /> 3. Late Arrivals
                  </h5>
                  <p className="font-light text-left pl-4.5">
                    Please arrive 5 to 10 minutes early. Arrivals later than 15 minutes may be deemed same-day cancellations to protect subsequent schedules.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setAgreeToPolicy(true);
                    setShowPolicyOverlay(false);
                  }}
                  className="h-10 px-5 rounded-full bg-primary text-white font-sans text-[11px] font-bold uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer"
                >
                  I Understand &amp; Agree
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
