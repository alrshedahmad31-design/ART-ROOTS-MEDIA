import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n';
import { Menu, X, Globe } from 'lucide-react';

export default function Navbar() {
    const { t, toggleLang, isRTL } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // IntersectionObserver morphing logic
    useEffect(() => {
        const heroEl = document.querySelector('[data-hero]') || document.querySelector('section');
        if (!heroEl) {
            const handleScroll = () => setScrolled(window.scrollY > 80);
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setScrolled(!entry.isIntersecting);
            },
            { threshold: 0.1, rootMargin: '-80px 0px 0px 0px' }
        );

        observer.observe(heroEl);
        return () => observer.disconnect();
    }, [location]);

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
            {/* ═══ Floating Island Navbar ═══ */}
            <nav
                className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-med ease-arm
                    ${scrolled
                        ? 'bg-surface-1/90 backdrop-blur-xl border border-divider/10 shadow-tight rounded-sm'
                        : 'bg-surface-0/40 backdrop-blur-md border border-divider/5 rounded-sm'
                    }
                    w-[95%] max-w-5xl px-6 py-3`}
            >
                <div className="flex items-center justify-between w-full gap-6">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 shrink-0 group link-lift">
                        <img
                            src="/assets/logo/Logoo.webp"
                            alt="ART ROOTS MEDIA"
                            className="h-8 md:h-10 w-auto invert brightness-200 transition-all duration-med"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`relative font-sans text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-fast link-lift
                                    ${location.pathname === link.to
                                        ? 'text-action'
                                        : 'text-text-2 hover:text-text-1'
                                    }`}
                            >
                                {link.label}
                                <AnimatePresence>
                                    {location.pathname === link.to && (
                                        <motion.div
                                            layoutId="activeNav"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-action rounded-full"
                                        />
                                    )}
                                </AnimatePresence>
                            </Link>
                        ))}
                    </div>

                    {/* Action Group */}
                    <div className="flex items-center gap-3">
                        {/* Language Selector */}
                        <button
                            onClick={toggleLang}
                            className="hidden sm:flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-text-2/40 hover:text-action transition-colors font-mono link-lift"
                        >
                            <Globe size={12} />
                            <span>{t.nav.langSwitch}</span>
                        </button>

                        {/* CTA Button */}
                        <a
                            href={`https://wa.me/${t.contact.whatsappLink}?text=${encodeURIComponent(t.whatsappMessages.navbar)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-magnetic btn-primary !px-5 !py-2 !text-[9px] font-black uppercase tracking-[0.15em]"
                        >
                            {t.nav.quote}
                        </a>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex lg:hidden items-center justify-center p-2 text-text-2 hover:text-action transition-colors"
                        >
                            {menuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* ═══ Full-screen Mobile Overlay ═══ */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        className="lg:hidden fixed inset-0 bg-surface-0 z-40 flex flex-col justify-center px-10"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.to}
                                    initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    <Link
                                        to={link.to}
                                        className={`block text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter transition-all duration-fast
                                            ${location.pathname === link.to ? 'text-action' : 'text-text-1 hover:text-action hover:pl-4'}`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile language */}
                        <div className="mt-12 flex items-center gap-6">
                            <button
                                onClick={toggleLang}
                                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-2/40 hover:text-action transition-colors font-mono"
                            >
                                <Globe size={14} />
                                <span>{t.nav.langSwitch}</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
