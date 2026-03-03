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
        { to: '/about', label: t.nav.about, icon: Briefcase },
        { to: '/services', label: t.nav.services, icon: Layout },
        { to: '/portfolio', label: t.nav.portfolio, icon: Globe },
        { to: '/contact', label: t.nav.contact, icon: MessageCircle },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:hidden w-[calc(100%-2.5rem)] max-w-sm">
            <div className="bg-[#111111]/95 backdrop-blur-xl border border-white/10 h-[64px] rounded-[32px] flex items-center justify-around px-2 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.to;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`flex flex-col items-center justify-center h-[48px] px-3 transition-all duration-300 relative group rounded-full ${isActive ? 'bg-off-white/5' : ''}`}
                        >
                            <div className={`flex flex-col items-center gap-1 ${isActive ? 'text-signal-red' : 'text-off-white/40'}`}>
                                <Icon size={18} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                <span className="text-[10px] font-black tracking-[0.05em] uppercase">
                                    {item.label}
                                </span>
                            </div>

                            {/* Active Indicator Bar */}
                            {isActive && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-signal-red rounded-full shadow-[0_0_8px_rgba(230,59,46,0.8)]" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
