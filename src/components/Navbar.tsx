import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react';
// @ts-ignore
import logoIcon from '../assets/images/blush_and_bloom_logo_1780881803809.png';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openBookingModal: () => void;
}

export default function Navbar({ currentTab, setCurrentTab, openBookingModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [artistsDropdownOpen, setArtistsDropdownOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const [mobileArtistsOpen, setMobileArtistsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const desktopNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'consultation', label: 'Consultation' },
  ];

  const contactDropdownItems = [
    { id: 'contact', label: 'Contact Us' },
    { id: 'faq', label: 'FAQs' },
    { id: 'testimonials', label: 'Client Reviews' },
    { id: 'policies', label: 'Policies' },
  ];

  const isContactActive = contactDropdownItems.some(item => item.id === currentTab);
  const isArtistsActive = currentTab === 'artists' || currentTab === 'gallery';

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'glass shadow-lg py-2.5 md:py-3 border-b border-gray-100 bg-white/90 backdrop-blur-md'
          : 'bg-transparent py-5 md:py-5.5 border-b border-white/10'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* LOGO */}
        <button
          id="nav-logo"
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-2.5 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center p-0.5 shadow-md border border-pink-100/50 overflow-hidden group-hover:scale-110 active:scale-95 transition-transform duration-300">
            <img
              src={logoIcon}
              alt="Blush & Bloom Logo"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className={`block font-serif text-2xl md:text-3.5xl font-medium tracking-tight leading-none transition-colors duration-300 ${
              isScrolled ? 'text-dark' : 'text-white'
            }`}>
              Blush <span className="text-primary font-normal font-serif">&amp;</span> Bloom
            </span>
            <span className={`block font-sans text-[10px] uppercase tracking-[0.25em] leading-none mt-1 transition-colors duration-300 ${
              isScrolled ? 'text-gray-500' : 'text-white/80'
            }`}>
              Beauty Studio
            </span>
          </div>
        </button>

        {/* DESKTOP DESCRIPTIVE NAV */}
        <nav className="hidden lg:flex items-center space-x-8">
          {desktopNavItems.map((item) => (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`font-sans text-sm font-medium tracking-[0.05em] transition-all duration-300 relative py-2 ${
                currentTab === item.id
                  ? 'text-primary'
                  : isScrolled
                    ? 'text-dark/80 hover:text-primary hover:scale-[1.02]'
                    : 'text-white/95 hover:text-primary hover:scale-[1.02]'
              }`}
            >
              {item.label}
              {currentTab === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full" />
              )}
            </button>
          ))}

          {/* ARTISTS DROPDOWN MENU */}
          <div
            className="relative inline-block"
            onMouseEnter={() => setArtistsDropdownOpen(true)}
            onMouseLeave={() => setArtistsDropdownOpen(false)}
          >
            <button
              id="nav-item-artists-dropdown"
              onClick={() => setArtistsDropdownOpen(!artistsDropdownOpen)}
              className={`font-sans text-sm font-medium tracking-[0.05em] transition-all duration-300 relative py-2 px-1 flex items-center gap-1 focus:outline-none ${
                isArtistsActive
                  ? 'text-primary'
                  : isScrolled
                    ? 'text-dark/80 hover:text-primary hover:scale-[1.02]'
                    : 'text-white/95 hover:text-primary hover:scale-[1.02]'
              }`}
            >
              <span>Artists</span>
              <ChevronDown size={14} className={`transition-transform duration-305 ${artistsDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
              {isArtistsActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full" />
              )}
            </button>

            {/* Dropdown Box Panel */}
            <div
              id="artists-dropdown-panel"
              className={`absolute left-0 mt-2 w-52 bg-white/95 backdrop-blur-md text-dark border border-gray-150 rounded-2xl shadow-xl py-2 px-1.5 transition-all duration-300 transform origin-top-left z-50 space-y-0.5 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-[''] ${
                artistsDropdownOpen
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
              }`}
            >
              <button
                id="dropdown-sub-artists-team"
                onClick={() => {
                  handleNavClick('artists');
                  setArtistsDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 select-none ${
                  currentTab === 'artists'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-primary/5 text-dark/80 hover:text-dark'
                }`}
              >
                Meet the Team
              </button>
              <button
                id="dropdown-sub-artists-gallery"
                onClick={() => {
                  handleNavClick('gallery');
                  setArtistsDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 select-none ${
                  currentTab === 'gallery'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-primary/5 text-dark/80 hover:text-dark'
                }`}
              >
                Gallery
              </button>
            </div>
          </div>

          {/* ABOUT US NAV LINK */}
          <button
            id="nav-item-about-us"
            onClick={() => handleNavClick('about-us')}
            className={`font-sans text-sm font-medium tracking-[0.05em] transition-all duration-300 relative py-2 ${
              currentTab === 'about-us'
                ? 'text-primary'
                : isScrolled
                  ? 'text-dark/80 hover:text-primary hover:scale-[1.02]'
                  : 'text-white/95 hover:text-primary hover:scale-[1.02]'
            }`}
          >
            About Us
            {currentTab === 'about-us' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full" />
            )}
          </button>

          {/* CONTACT DROPDOWN MENU */}
          <div
            className="relative inline-block"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              id="nav-item-contact-dropdown"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`font-sans text-sm font-medium tracking-[0.05em] transition-all duration-300 relative py-2 px-1 flex items-center gap-1 focus:outline-none ${
                isContactActive
                  ? 'text-primary'
                  : isScrolled
                    ? 'text-dark/80 hover:text-primary hover:scale-[1.02]'
                    : 'text-white/95 hover:text-primary hover:scale-[1.02]'
              }`}
            >
              <span>Contact</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
              {isContactActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full" />
              )}
            </button>

            {/* Dropdown Box Panel */}
            <div
              id="contact-dropdown-panel"
              className={`absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-md text-dark border border-gray-150 rounded-2xl shadow-xl py-2 px-1.5 transition-all duration-300 transform origin-top-right z-50 space-y-0.5 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-[''] ${
                dropdownOpen
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
              }`}
            >
              {contactDropdownItems.map(subItem => (
                <button
                  key={subItem.id}
                  id={`dropdown-sub-${subItem.id}`}
                  onClick={() => {
                    handleNavClick(subItem.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 select-none ${
                    currentTab === subItem.id
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-primary/5 text-dark/80 hover:text-dark'
                  }`}
                >
                  {subItem.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* DESKTOP CTA BOOK NOW */}
        <div className="hidden lg:block">
          <button
            id="nav-book-cta"
            onClick={openBookingModal}
            className="h-12 px-6 rounded-[20px] bg-primary text-white font-sans text-xs font-bold tracking-[0.1em] uppercase hover-btn-trigger shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Book Appointment
          </button>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <button
          id="mobile-menu-trigger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg ${
            mobileMenuOpen ? 'text-dark' : isScrolled ? 'text-dark' : 'text-white'
          }`}
          aria-label="Toggle navigation drawer"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE LIGHTBOX DRAWER WITH SLIDE OUT */}
      <div
        id="mobile-nav-drawer"
        className={`lg:hidden fixed top-0 left-0 w-full bg-cream border-b border-gray-100 shadow-xl transition-all duration-350 ease-in-out origin-top overflow-hidden z-45 pt-20 px-6 pb-8 ${
          mobileMenuOpen ? 'max-h-[100vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-4">
          {desktopNavItems.map((item) => (
            <button
              key={item.id}
              id={`mob-nav-item-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`text-left font-serif text-xl font-medium tracking-wide py-2 border-b border-gray-200/40 transition-colors ${
                currentTab === item.id ? 'text-primary pl-2 border-l-2 border-l-primary animate-none' : 'text-dark/90'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* ACCORDION TRIGGER FOR ARTISTS SECTION */}
          <div className="flex flex-col border-b border-gray-200/40 pb-1">
            <button
              id="mob-artists-accordion-header"
              onClick={() => setMobileArtistsOpen(!mobileArtistsOpen)}
              className={`w-full flex items-center justify-between text-left font-serif text-xl font-medium tracking-wide py-2.5 transition-colors ${
                isArtistsActive ? 'text-primary' : 'text-dark/90'
              }`}
            >
              <span>Artists</span>
              <ChevronDown size={18} className={`transition-transform duration-300 ${mobileArtistsOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            {/* Accordion sub-items container */}
            <div
              id="mob-artists-accordion-content"
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                mobileArtistsOpen ? 'max-h-60 opacity-100 mt-2 pb-2' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <div className="pl-4 flex flex-col space-y-2.5 border-l-2 border-primary/20">
                <button
                  id="mob-dropdown-sub-artists-team"
                  onClick={() => {
                    handleNavClick('artists');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left font-sans text-xs font-semibold uppercase tracking-wider py-1.5 transition-colors ${
                    currentTab === 'artists' ? 'text-primary' : 'text-gray-500 hover:text-dark'
                  }`}
                >
                  Meet the Team
                </button>
                <button
                  id="mob-dropdown-sub-artists-gallery"
                  onClick={() => {
                    handleNavClick('gallery');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left font-sans text-xs font-semibold uppercase tracking-wider py-1.5 transition-colors ${
                    currentTab === 'gallery' ? 'text-primary' : 'text-gray-500 hover:text-dark'
                  }`}
                >
                  Gallery
                </button>
              </div>
            </div>
          </div>

          <button
            id="mob-nav-item-about-us"
            onClick={() => handleNavClick('about-us')}
            className={`text-left font-serif text-xl font-medium tracking-wide py-2 border-b border-gray-200/40 transition-colors ${
              currentTab === 'about-us' ? 'text-primary pl-2 border-l-2 border-l-primary animate-none' : 'text-dark/90'
            }`}
          >
            About Us
          </button>

          {/* ACCORDION TRIGGER FOR CONTACT SECTION */}
          <div className="flex flex-col border-b border-gray-200/40 pb-1">
            <button
              id="mob-contact-accordion-header"
              onClick={() => setMobileContactOpen(!mobileContactOpen)}
              className={`w-full flex items-center justify-between text-left font-serif text-xl font-medium tracking-wide py-2.5 transition-colors ${
                isContactActive ? 'text-primary' : 'text-dark/90'
              }`}
            >
              <span>Contact</span>
              <ChevronDown size={18} className={`transition-transform duration-300 ${mobileContactOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            {/* Accordion sub-items container */}
            <div
              id="mob-contact-accordion-content"
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                mobileContactOpen ? 'max-h-60 opacity-100 mt-2 pb-2' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <div className="pl-4 flex flex-col space-y-2.5 border-l-2 border-primary/20">
                {contactDropdownItems.map((subItem) => (
                  <button
                    key={subItem.id}
                    id={`mob-dropdown-sub-${subItem.id}`}
                    onClick={() => {
                      handleNavClick(subItem.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left font-sans text-xs font-semibold uppercase tracking-wider py-1.5 transition-colors ${
                      currentTab === subItem.id ? 'text-primary' : 'text-gray-500 hover:text-dark'
                    }`}
                  >
                    {subItem.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            id="mobile-book-cta"
            onClick={() => {
              setMobileMenuOpen(false);
              openBookingModal();
            }}
            className="w-full h-12 rounded-[20px] bg-primary text-white font-sans text-xs font-bold tracking-[0.1em] uppercase hover-btn-trigger flex items-center justify-center shadow-md hover:scale-[1.02] active:scale-98 transition-all duration-300 mt-2"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </header>
  );
}
