'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search, ShoppingCart, BookOpen, User, Home, PenTool, Info, PhoneCall, GraduationCap, ChevronDown, LogIn, Menu, X
} from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useLanguage } from '../contexts/LanguageContext';

const servicesDropdown = [
  {
    title: { en: 'Consultations', hi: 'परामर्श' },
    items: [
      
      { label: { en: 'Chat with Astrologer', hi: 'ज्योतिषी से चैट करें' }, href: '/services/chat-with-astrologer' },
      { label: { en: 'Love & Relationship', hi: 'प्रेम और संबंध' }, href: '/services/love-relationship' },
      { label: { en: 'Career & Job', hi: 'करियर और नौकरी' }, href: '/services/career-job' },
      { label: { en: 'Numerology', hi: 'अंक ज्योतिष' }, href: '/services/numerology' },
    ],
  },
  {
    title: { en: 'Puja & Rituals', hi: 'पूजा और अनुष्ठान' },
    items: [
      { label: { en: 'Online Puja', hi: 'ऑनलाइन पूजा' }, href: '/services/online-puja' },
      { label: { en: 'Grah Shanti', hi: 'ग्रह शांति' }, href: '/services/grah-shanti' },
      { label: { en: 'Manokamna Pooja', hi: 'मनोकामना पूजा' }, href: '/services/manokamna-pooja' },
    ],
  },
  {
    title: { en: 'Horoscopes', hi: 'राशियाँ' },
    items: [
      { label: { en: 'Daily Horoscope', hi: 'दैनिक राशिफल' }, href: '/services/daily-horoscope' },
      { label: { en: 'Monthly Horoscope', hi: 'मासिक राशिफल' }, href: '/services/monthly-horoscope' },
      { label: { en: 'Yearly Horoscope', hi: 'वार्षिक राशिफल' }, href: '/services/yearly-horoscope' },
    ],
  },
  {
    title: { en: 'Learning', hi: 'सीखना' },
    items: [
      { label: { en: 'Astrology Courses', hi: 'ज्योतिष पाठ्यक्रम' }, href: '/services/courses' },
      { label: { en: 'Blog', hi: 'ब्लॉग' }, href: '/blog' },
    ],
  },
];

const navItems = [
  { label: { en: 'Home', hi: 'होम' }, href: '/', icon: Home },
  { label: { en: 'Shop', hi: 'दुकान' }, href: '/shop', icon: ShoppingCart },
  { label: { en: 'Blog', hi: 'ब्लॉग' }, href: '/blog', icon: PenTool },
  { label: { en: 'About', hi: 'हमारे बारे में' }, href: '/about', icon: Info },
  { label: { en: 'Contact', hi: 'संपर्क' }, href: '/contact', icon: PhoneCall },
  { label: { en: 'Study', hi: 'अध्ययन' }, href: '/study', icon: GraduationCap },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { lang, setLang } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const hamburgerButton = document.getElementById('hamburger-button');
      if (mobileMenu && !mobileMenu.contains(event.target as Node) && 
          hamburgerButton && !hamburgerButton.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/signin' });
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-6 left-0 right-0 mx-auto max-w-7xl z-50 bg-[#FAEBE6] shadow-md rounded-3xl py-2 px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex flex-col items-start">
          <span className="text-xl font-bold text-purple-800 leading-tight">नक्षत्र ज्ञान</span>
          <span className="text-base font-serif text-purple-600 leading-tight">Nakshatra Gyaan</span>
        </div>

        {/* Center: Navigation - Hidden on Mobile */}
        <nav className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-black hover:bg-gray-200 transition-all`}
            >
              <item.icon className="w-4 h-4" />
              <span className="bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">
                {item.label[lang]}
              </span>
            </Link>
          ))}
          
          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-black hover:bg-gray-200 transition-all"
            >
              <span className="bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">
                {servicesDropdown[0].title[lang]}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            
            {/* Services Dropdown Menu */}
            {isServicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                {servicesDropdown.map((col) => (
                  <div key={col.title.en} className="mb-4 last:mb-0">
                    <div className="uppercase text-sm font-semibold bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text mb-2">
                      {col.title[lang]}
                    </div>
                    <ul className="space-y-1">
                      {col.items.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-gray-600 rounded-lg px-2 py-1.5 block transition-all duration-150 hover:bg-gradient-to-r hover:from-[#6A0DAD] hover:to-[#FF8C00] hover:text-white"
                            onClick={() => setIsServicesOpen(false)}
                          >
                            {link.label[lang]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right: Icons and Auth */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          {/* Mobile Menu Button */}
          <button
            id="hamburger-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {status !== 'loading' && (
              session ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-transparent bg-clip-text bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] hover:bg-gray-100 transition-all font-semibold"
                >
                  <User className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-transparent bg-clip-text bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] hover:bg-gray-100 transition-all font-semibold"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )
            )}
            
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="px-4 py-2 rounded-lg bg-white text-transparent bg-clip-text bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] hover:bg-gray-100 transition-all font-semibold"
            >
              {lang === 'en' ? 'हिन्दी' : 'English'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu" 
          className="fixed top-20 left-0 right-0 bottom-0 bg-white shadow-lg rounded-b-2xl mx-4 z-40 md:hidden overflow-hidden"
        >
          <div className="h-full overflow-y-auto pb-4">
            <nav className="flex flex-col gap-2 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-black hover:bg-gray-100 transition-all ${
                    pathname === item.href ? 'font-bold bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label[lang]}</span>
                </Link>
              ))}

              {/* Mobile Services Section */}
              <div className="border-t border-gray-200 pt-4 mt-2">
                {servicesDropdown.map((col) => (
                  <div key={col.title.en} className="mb-4 last:mb-0">
                    <div className="uppercase text-sm font-semibold bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text mb-2">
                      {col.title[lang]}
                    </div>
                    <ul className="space-y-1">
                      {col.items.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-gray-600 rounded-lg px-4 py-2 block transition-all duration-150 hover:bg-gray-100"
                          >
                            {link.label[lang]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="border-t border-gray-200 pt-4 mt-2 flex flex-col gap-2">
                {status !== 'loading' && (
                  session ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-white hover:from-[#5A0D9D] hover:to-[#FF7C00] transition-all font-semibold"
                    >
                      <User className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => signIn()}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-white hover:from-[#5A0D9D] hover:to-[#FF7C00] transition-all font-semibold"
                    >
                      <LogIn className="w-5 h-5" />
                      <span>Sign In</span>
                    </button>
                  )
                )}
                
                <button
                  onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                  className="px-4 py-3 rounded-lg bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-white hover:from-[#5A0D9D] hover:to-[#FF7C00] transition-all font-semibold"
                >
                  {lang === 'en' ? 'हिन्दी' : 'English'}
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="bg-[#F7E5A5] rounded-2xl p-6 w-full max-w-2xl mx-4 shadow-xl border border-black/10"
            onClick={e => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for services, products, or articles..."
                className="w-full bg-black/5 text-black placeholder-gray-500 rounded-xl px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              <Search className="w-5 h-5 text-black absolute left-4 top-1/2 transform -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1.5 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Search
              </button>
            </form>
            <div className="mt-4 text-sm text-gray-400">
              <p>Popular searches:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {[ 'Horoscope', 'Tarot Reading', 'Meditation', 'Astrology Course'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      handleSearch(new Event('submit') as any);
                    }}
                    className="px-3 py-1 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}