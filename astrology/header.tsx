'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useLanguage } from '../contexts/useLanguage';
import { SupportedLang, LANGUAGE_NAMES } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, Search, Menu, X, User, LogIn, LogOut 
} from 'lucide-react';
import CartIcon from './CartIcon';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const servicesMegaMenu = {
  consultations: {
    href: "/services/astrology",
    items: [
      { href: "/panchang", key: "panchang" },
      { href: "/kundali-matching", key: "kundali_matching" },
      { href: "/shop", key: "buy_products" },
      { href: "/daily-horoscope", key: "free_daily_horoscope" },
      { href: "/services/astrology", key: "astrology" },
      { href: "/services/chat-with-astrologer", key: "chat_with_astrologer" },
      { href: "/services/love-relationship", key: "love_relationship" },
      { href: "/services/career-guidance", key: "career_guidance" },
      { href: "/services/numerology", key: "numerology" },
    ],
  },
  puja_rituals: {
    href: "/online-puja",
    items: [
      { href: "/online-puja", key: "online_puja" },
      { href: "/services/grah-shanti", key: "grah_shanti" },
      { href: "/services/manokamna-pooja", key: "manokamna_pooja" },
    ],
  },
  horoscopes: {
    href: "/daily-horoscope",
    items: [
      { href: "/services/daily-horoscope", key: "daily_horoscope" },
      { href: "/services/monthly-horoscope", key: "monthly_horoscope" },
      { href: "/services/yearly-horoscope", key: "yearly_horoscope" },
    ],
  },
  learning: {
    href: "/courses",
    items: [
      { href: "/courses", key: "astrology_courses" },
      { href: "/blog", key: "blog" },
    ],
  },
};

export function Header() {
  const { lang, setLang, t } = useLanguage();
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileLangMenuOpen, setIsMobileLangMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isStudyDropdownOpen, setIsStudyDropdownOpen] = useState(false);
  
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => signOut({ callbackUrl: '/' });

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handlePopularSearch = (term: string) => {
    router.push(`/search?q=${encodeURIComponent(term)}`);
    setIsSearchOpen(false);
  };

  const languageList: SupportedLang[] = ['en', 'hi', 'es', 'fr', 'de', 'zh', 'ar', 'ru'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) setIsServicesOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) setIsUserMenuOpen(false);
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) setIsLangDropdownOpen(false);
      const hamburgerButton = document.getElementById('hamburger-button');
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && hamburgerButton && !hamburgerButton.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const headerTopClass = 'top-6';

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-6 left-0 right-0 w-full z-50 bg-[#FEFBF2] shadow-lg rounded-3xl py-2 px-2 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4`}
      >
        <div className="flex items-center flex-1 min-w-0 w-full">
          <div className="flex-shrink-0 mr-6 md:mr-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="text-center">
                <h1 className="text-xl font-bold whitespace-nowrap text-[#D9B48F]">{t('header.logo.line1')}</h1>
                <p className="text-xs whitespace-nowrap text-[#D9B48F]">{t('header.logo.line2')}</p>
              </div>
            </Link>
          </div>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 md:gap-x-7 md:gap-y-0 w-full md:w-auto">
            <Link href="/" className={`font-semibold text-gray-700 hover:text-[#77A656] transition-colors duration-200 relative group ${pathname === '/' ? 'text-[#77A656]' : ''}`}>{t('header.nav.home')}<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#77A656] group-hover:w-full transition-all duration-300"></span></Link>
            <Link href="/about" className={`font-semibold text-gray-700 hover:text-[#77A656] transition-colors duration-200 relative group ${pathname === '/about' ? 'text-[#77A656]' : ''}`}>{t('header.nav.about')}<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#77A656] group-hover:w-full transition-all duration-300"></span></Link>
            <Link href="/contact" className={`font-semibold text-gray-700 hover:text-[#77A656] transition-colors duration-200 relative group ${pathname === '/contact' ? 'text-[#77A656]' : ''}`}>{t('header.nav.contact')}<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#77A656] group-hover:w-full transition-all duration-300"></span></Link>
            <Link href="/blog" className={`font-semibold text-gray-700 hover:text-[#77A656] transition-colors duration-200 relative group ${pathname?.startsWith('/blog') ? 'text-[#77A656]' : ''}`}>{t('header.nav.blog')}<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#77A656] group-hover:w-full transition-all duration-300"></span></Link>
            <div className="relative" tabIndex={0} onBlur={() => setIsStudyDropdownOpen(false)}>
              <button
                onClick={() => setIsStudyDropdownOpen((prev) => !prev)}
                className={`font-semibold flex items-center text-gray-700 hover:text-[#77A656] transition-colors duration-200 relative group px-2 py-1 ${pathname?.startsWith('/study') || pathname === '/courses' ? 'text-[#77A656]' : ''}`}
                aria-haspopup="true"
                aria-expanded={isStudyDropdownOpen}
                type="button"
              >
                {t('header.nav.study')}
              </button>
              <AnimatePresence>
                {isStudyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-0 mt-2 min-w-[180px] bg-white rounded-xl shadow-lg border border-gray-100 z-50 py-2 px-2 flex flex-col gap-1"
                  >
                    <Link href="/study" className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-[#F3F8F2] hover:text-[#77A656] font-medium transition-colors">Study</Link>
                    <Link href="/courses" className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-[#F3F8F2] hover:text-[#77A656] font-medium transition-colors">Courses</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/talk-to-astrologer" className={`font-semibold text-[#77A656] hover:text-[#5fa143] transition-colors duration-200 relative group ${pathname === '/talk-to-astrologer' ? 'underline' : ''}`}>Talk to Astrologer<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#77A656] group-hover:w-full transition-all duration-300"></span></Link>
            <Link href="/chat-with-astrologer" className={`font-semibold text-[#77A656] hover:text-[#5fa143] transition-colors duration-200 relative group ${pathname === '/chat-with-astrologer' ? 'underline' : ''}`}>Chat with Astrologer<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#77A656] group-hover:w-full transition-all duration-300"></span></Link>
            <Link href="/shop" className={`font-semibold text-[#77A656] hover:text-[#5fa143] transition-colors duration-200 relative group ${pathname === '/shop' ? 'underline' : ''}`}>Buy Products<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#77A656] group-hover:w-full transition-all duration-300"></span></Link>
            <Link href="/services" className={`font-semibold text-[#77A656] hover:text-[#5fa143] transition-colors duration-200 relative group ${pathname === '/services' ? 'underline' : ''}`}>Our Services<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#77A656] group-hover:w-full transition-all duration-300"></span></Link>
            <div className="relative" ref={servicesMenuRef} tabIndex={0} onBlur={() => setIsServicesOpen(false)}>
              <button onClick={() => setIsServicesOpen(prev => !prev)} className="font-semibold px-4 py-2 rounded-lg bg-[#77A656] text-white hover:bg-[#5fa143] transition-colors flex items-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#77A656]/40" aria-haspopup="true" aria-expanded={isServicesOpen} type="button">
                {t('header.nav.consultations')}
              </button>
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-auto max-w-screen-lg bg-white rounded-xl shadow-lg border border-purple-200 z-50 p-6"
                    style={{ minWidth: 'min(90vw, 900px)' }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6">
                      {Object.entries(servicesMegaMenu).map(([sectionKey, sectionValue]) => (
                        <div key={sectionKey} className="min-w-[150px]">
                          <h3 className="text-sm font-bold uppercase text-purple-900 bg-purple-100 rounded px-3 py-1 mb-4 inline-block shadow-sm border border-purple-200">{t(`header.mega_menu.${sectionKey}.title`)}</h3>
                          <ul className="space-y-3">
                            {sectionValue.items.map((item) => (
                              <li key={item.key}>
                                <Link href={item.href} onClick={() => setIsServicesOpen(false)} className="text-base text-gray-700 hover:bg-[#F3F8F2] hover:text-[#77A656] font-medium transition-colors px-2 py-1 rounded-lg block">
                                  {t(`header.mega_menu.${sectionKey}.items.${item.key}`)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0 mt-2 md:mt-0">
          <button onClick={() => setIsSearchOpen(true)} className="p-2 rounded-full hover:bg-gray-200 transition-colors"><Search className="h-6 w-6 text-gray-600" /></button>
          <CartIcon />
          <div className="hidden md:flex items-center gap-2 md:gap-4">
            {session?.user ? (
              <div className="relative" ref={userMenuRef}>
                <button onClick={() => setIsUserMenuOpen(prev => !prev)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-transparent bg-clip-text bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] hover:bg-gray-100 transition-all font-semibold whitespace-nowrap"><User className="w-4 h-4" /> {session.user.name || 'User'} <ChevronDown className="w-4 h-4" /></button>
                {isUserMenuOpen && (<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"><div className="py-1"><Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('header.auth.my_profile')}</Link><Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('header.auth.my_orders')}</Link><button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><LogOut className="w-4 h-4" /> {t('header.auth.logout')}</button></div></div>)}
              </div>
            ) : (
              <button onClick={() => signIn()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#77A656] text-white hover:bg-[#5fa143] transition-all font-semibold whitespace-nowrap shadow focus:outline-none focus:ring-2 focus:ring-[#77A656]/40"><LogIn className="w-4 h-4" /> {t('header.auth.signin')}</button>
            )}
            <div className="relative" ref={langDropdownRef}>
              <button onClick={() => setIsLangDropdownOpen(prev => !prev)} className="px-4 py-2 rounded-lg bg-[#77A656] text-white hover:bg-[#5fa143] transition-all font-semibold flex items-center gap-2 whitespace-nowrap shadow focus:outline-none focus:ring-2 focus:ring-[#77A656]/40" aria-haspopup="listbox" aria-expanded={isLangDropdownOpen}><span>{t('header.language_selector.button')}</span><ChevronDown className="w-4 h-4" /></button>
              {isLangDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full rounded-lg shadow-lg border border-purple-200 z-50 bg-[#FAEBE6] font-[Montserrat,sans-serif] drop-shadow-xl">
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs text-gray-500 font-semibold">{t('header.language_selector.dropdown_title')}</div>
                    {languageList.map((code) => (
                      <button 
                        key={code} 
                        onClick={() => { setLang(code); setIsLangDropdownOpen(false); }} 
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F3E8FF] ${lang === code ? 'font-bold text-[#7C3AED]' : 'text-gray-700'} font-[Montserrat,sans-serif]`}
                      >
                        {(LANGUAGE_NAMES as Record<string, string>)[code] || LANGUAGE_NAMES['en']}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button id="hamburger-button" onClick={() => setIsMobileMenuOpen(prev => !prev)} className="md:hidden p-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition-colors" aria-label="Menu">{isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
      </motion.header>
      
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="bg-[#FEF9E6]/90 backdrop-blur-lg border-purple-300 border rounded-2xl p-6 max-w-2xl shadow-2xl sm:rounded-3xl">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
              <Input
                id="search"
                placeholder="Search for services, products, or articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-32 rounded-full border-2 border-purple-400 focus-visible:ring-purple-500 text-lg bg-white/80 text-black"
              />
              <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold h-10 px-8 text-md">
                Search
              </Button>
            </div>
          </form>
          <div className="mt-5 pl-2">
            <p className="text-sm text-gray-700 font-semibold mb-2">Popular searches:</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <button onClick={() => handlePopularSearch('Horoscope')} className="text-purple-700 hover:text-purple-900 transition-colors">Horoscope</button>
              <button onClick={() => handlePopularSearch('Tarot Reading')} className="text-purple-700 hover:text-purple-900 transition-colors">Tarot Reading</button>
              <button onClick={() => handlePopularSearch('Meditation')} className="text-purple-700 hover:text-purple-900 transition-colors">Meditation</button>
              <button onClick={() => handlePopularSearch('Astrology Course')} className="text-purple-700 hover:text-purple-900 transition-colors">Astrology Course</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-xs bg-white z-[999] shadow-2xl flex flex-col p-6 gap-6 md:hidden"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="self-end mb-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
            <nav className="flex flex-col gap-4">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-lg">Home</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-lg">About</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-lg">Contact</Link>
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-lg">Blog</Link>
              <Link href="/study" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-lg">Study</Link>
              <Link href="/talk-to-astrologer" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-lg">Talk to Astrologer</Link>
              <Link href="/chat-with-astrologer" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-lg">Chat with Astrologer</Link>
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-lg">Shop</Link>
              {/* Add more links as needed */}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
