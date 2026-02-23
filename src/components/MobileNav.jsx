import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { Home, Briefcase, Layout, MessageCircle, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MobileNav() {
    const { t, isRTL } = useLanguage();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { to: '/', label: t.nav.home, icon: Home },
        { to: '/about', label: t.nav.about, icon: Briefcase }, // Using Briefcase for About/Store
        { to: '/services', label: t.nav.services, icon: Layout },
        { to: '/portfolio', label: t.nav.portfolio, icon: Globe }, // Using Globe for Portfolio/Works
        { to: '/contact', label: t.nav.contact, icon: MessageCircle },
    ];

    return (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm md:hidden transition-all duration-500 ${scrolled ? 'opacity-100' : 'opacity-90'}`}>
            <div className="relative bg-obsidian/60 backdrop-blur-xl border border-ivory/10 rounded-full h-[64px] flex items-center justify-between px-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.to;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 relative group`}
                        >
                            <div className={`flex flex-col items-center gap-1 ${isActive ? 'text-champagne' : 'text-ivory/40'}`}>
                                <Icon size={20} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                <span className="text-[10px] font-medium tracking-wide uppercase">
                                    {item.label}
                                </span>
                            </div>

                            {/* Active Indicator Pin */}
                            {isActive && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-champagne shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
