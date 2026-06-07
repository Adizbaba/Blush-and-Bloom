/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ShieldCheck, Check, Settings, X } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a selection
    const consent = localStorage.getItem('blushbloom_cookies_accepted');
    if (!consent) {
      // Small lag for nice feel
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('blushbloom_cookies_accepted', 'all');
    localStorage.setItem('blushbloom_cookie_prefs', JSON.stringify({ essential: true, analytics: true, marketing: true }));
    setVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('blushbloom_cookies_accepted', 'custom');
    localStorage.setItem('blushbloom_cookie_prefs', JSON.stringify(prefs));
    setShowPreferences(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <div
        id="cookie-consent-bar"
        className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6 glass-dark text-white shadow-2xl"
      >
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 p-1.5 rounded-full bg-primary/25 text-primary shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-sans text-sm text-gray-200 leading-relaxed max-w-3xl">
                We use cookies and secure trackers to personalize styling options and optimize your experience. By clicking Accept, you consent to our privacy terms governed by the{' '}
                <span className="text-secondary font-medium underline">Australian Privacy Act 1988 and the New Zealand Privacy Act 2020</span>.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              id="cookie-manage-btn"
              onClick={() => setShowPreferences(true)}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Settings size={14} />
              Manage
            </button>
            <button
              id="cookie-accept-all-btn"
              onClick={handleAcceptAll}
              className="px-5 py-2.5 rounded-[20px] bg-primary text-white font-sans text-xs font-bold tracking-[0.08em] uppercase hover-btn-trigger shadow-sm cursor-pointer"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>

      {/* Cookie Customizer modal */}
      {showPreferences && (
        <div
          id="cookie-prefs-overlay"
          className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm"
        >
          <div className="w-full max-w-[480px] glass text-dark rounded-2xl shadow-2xl p-6 overflow-hidden relative">
            <button
              onClick={() => setShowPreferences(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="font-serif text-2xl font-semibold mb-2">Cookie Preferences</h3>
            <p className="font-sans text-xs text-gray-500 mb-6 leading-relaxed">
              Tailor how Blush &amp; Bloom Studio processes local web data to provide an optimal browsing journey.
            </p>

            <div className="space-y-4 mb-6">
              {/* Essential */}
              <div className="flex items-center justify-between p-3 glass rounded-xl">
                <div>
                  <span className="block font-sans text-sm font-semibold text-dark">Essential cookies</span>
                  <span className="block font-sans text-[11px] text-gray-500">Required to browse services &amp; secure bookings.</span>
                </div>
                <div id="pref-essential-val" className="px-2.5 py-1 bg-gray-100 rounded text-gray-400 font-sans text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Check size={12} /> Mode Active
                </div>
              </div>

              {/* Analytics */}
              <div
                className="flex items-center justify-between p-3 glass rounded-xl cursor-pointer"
                onClick={() => setPrefs(prev => ({ ...prev, analytics: !prev.analytics }))}
              >
                <div>
                  <span className="block font-sans text-sm font-semibold text-dark">Performance Trackers</span>
                  <span className="block font-sans text-[11px] text-gray-500">Helps us gauge organic beauty trend traffic in Australia and New Zealand.</span>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  readOnly
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
              </div>

              {/* Marketing */}
              <div
                className="flex items-center justify-between p-3 glass rounded-xl cursor-pointer"
                onClick={() => setPrefs(prev => ({ ...prev, marketing: !prev.marketing }))}
              >
                <div>
                  <span className="block font-sans text-sm font-semibold text-dark">Personalized Promotions</span>
                  <span className="block font-sans text-[11px] text-gray-500">Enables seasonal hair &amp; makeup bridal campaign recommendations.</span>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  readOnly
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mt-6">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-dark transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleSavePreferences}
                className="h-11 px-5 rounded-[20px] bg-dark text-white font-sans text-xs font-bold tracking-[0.08em] uppercase hover-btn-trigger shadow-sm cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
