import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n';
import { Menu, X, Globe } from 'lucide-react';

export default function Navbar() {
    const { t, toggleLang, isRTL } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const navLinks = [
        { to: '/', label: t.nav.home },
        { to: '/services', label: t.nav.services },
        { to: '/portfolio', label: t.nav.portfolio },
        { to: '/about', label: t.nav.about },
        { to: '/contact', label: t.nav.contact },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
          ${scrolled
                        ? 'bg-onyx/90 backdrop-blur-md border-b border-off-white/10 shadow-xl'
                        : 'bg-transparent border-b border-transparent'
                    }
          px-6 py-4 md:py-6 w-full`}
            >
                <div className="container-custom flex items-center justify-between w-full gap-8">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-4 shrink-0 group">
                        <div className="relative overflow-hidden">
                            <img
                                src="/assets/logo/Logoo.webp"
                                alt="ART ROOTS MEDIA"
                                className={`h-10 md:h-14 w-auto transition-all duration-700 ${scrolled ? 'invert brightness-125' : 'invert brightness-200'}`}
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`relative font-heading text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300
                  ${location.pathname === link.to ? 'text-signal-red' : 'text-off-white/70 hover:text-off-white'}`}
                            >
                                {link.label}
                                <AnimatePresence>
                                    {location.pathname === link.to && (
                                        <motion.div
                                            layoutId="activeNav"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute -bottom-2 left-0 right-0 h-0.5 bg-signal-red"
                                        />
                                    )}
                                </AnimatePresence>
                            </Link>
                        ))}
                    </div>

                    {/* Action Group */}
                    <div className="flex items-center gap-4">
                        {/* Language Selector */}
                        <button
                            onClick={toggleLang}
                            className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-off-white/50 hover:text-signal-red transition-colors font-mono"
                        >
                            <Globe size={14} />
                            <span>{t.nav.langSwitch}</span>
                        </button>

                        {/* Brutalist Button */}
                        <a
                            href={`https://wa.me/${t.contact.whatsappLink}?text=${encodeURIComponent(t.whatsappMessages.navbar)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-magnetic btn-primary !px-6 !py-2.5 !text-[10px] font-black uppercase tracking-[0.2em]"
                        >
                            {t.nav.quote}
                        </a>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex lg:hidden items-center justify-center p-2 text-off-white/70 hover:text-signal-red transition-colors"
                        >
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Brutalist Mobile Overlay */}
                <div
                    className={`lg:hidden fixed inset-0 top-0 bg-onyx z-[-1] flex flex-col pt-32 px-10 transition-transform duration-700 ease-[0.16,1,0.3,1] 
                    ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
                >
                    <div className="flex flex-col gap-8">
                        {navLinks.map((link, idx) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter transition-all duration-500
                                ${location.pathname === link.to ? 'text-signal-red' : 'text-off-white hover:pl-4 hover:text-signal-red'}`}
                                style={{ transitionDelay: `${idx * 50}ms` }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}
