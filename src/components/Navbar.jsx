import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
                className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out
          ${scrolled
                        ? 'bg-obsidian/70 backdrop-blur-xl border border-ivory/10 shadow-2xl shadow-black/20'
                        : 'bg-transparent border border-transparent'
                    }
          rounded-full px-4 md:px-6 py-2 md:py-3 w-[95%] md:w-auto md:min-w-[700px] lg:min-w-[800px]`}
            >
                <div className="flex items-center justify-between w-full gap-4 md:gap-8">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <img src="/assets/logo/Logoo.webp" alt="ART ROOTS MEDIA" className="h-10 md:h-16 w-auto transition-transform duration-500 hover:scale-105" />
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`link-hover text-sm font-medium transition-colors
                  ${location.pathname === link.to ? 'text-champagne' : 'text-ivory/70 hover:text-ivory'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLang}
                            className="flex items-center gap-1.5 text-xs md:text-sm text-ivory/60 hover:text-champagne transition-colors px-2 py-1 rounded-full hover:bg-white/5"
                            aria-label="Switch language"
                        >
                            <Globe size={14} className="md:size-4" />
                            <span>{t.nav.langSwitch}</span>
                        </button>

                        {/* CTA Desktop */}
                        <a
                            href={`https://wa.me/${t.contact.whatsappLink}?text=${encodeURIComponent(t.whatsappMessages.navbar)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex btn-magnetic btn-primary text-[10px] md:text-xs px-4 md:px-5 py-1.5 md:py-2"
                        >
                            {t.nav.quote}
                        </a>

                        {/* Dropdown Toggle (Visible on small screens) */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex md:hidden items-center justify-center p-2 text-ivory/60 hover:text-champagne transition-colors"
                        >
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Dropdown Menu (Mobile Only) */}
                <div className={`absolute top-[120%] left-0 right-0 md:hidden transition-all duration-300 transform ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                    <div className="bg-obsidian/90 backdrop-blur-2xl border border-ivory/10 rounded-[2rem] p-4 shadow-2xl overflow-hidden">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`px-6 py-4 rounded-2xl text-lg font-medium transition-all ${location.pathname === link.to ? 'bg-champagne/10 text-champagne' : 'text-ivory/70 hover:bg-white/5 hover:text-ivory'}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
