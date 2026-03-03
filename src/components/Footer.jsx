import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { MessageCircle, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

export default function Footer() {
    const { t, isRTL } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkStatus = () => {
            const now = new Date();
            const day = now.getDay();
            const hour = now.getHours();

            const isWorkingDay = day >= 0 && day <= 4;
            const isWorkingHour = hour >= 9 && hour < 17;
            setIsOpen(isWorkingDay && isWorkingHour);
        };

        checkStatus();
        const interval = setInterval(checkStatus, 60000);
        return () => clearInterval(interval);
    }, []);

    const navLinks = [
        { to: '/', label: t.nav.home },
        { to: '/services', label: t.nav.services },
        { to: '/portfolio', label: t.nav.portfolio },
        { to: '/about', label: t.nav.about },
        { to: '/contact', label: t.nav.contact },
    ];

    const serviceLinks = t.services.list.map(s => s.title);

    return (
        <footer className="bg-surface-1 text-text-1 relative rounded-t-[2.5rem] overflow-hidden">
            <div className="container-custom py-24 md:py-32">
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 mb-24">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <img
                            src="/assets/logo/Logoo.webp"
                            alt="ART ROOTS MEDIA"
                            className="h-16 w-auto mb-10 invert brightness-200 contrast-125"
                        />
                        <p className="text-text-2 text-base leading-relaxed mb-10 font-sans">
                            {t.footer.tagline}
                        </p>
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <a href={`https://wa.me/${t.contact.whatsappLink}?text=${encodeURIComponent(t.whatsappMessages.footerContact)}`} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-text-2/60 hover:text-action transition-colors group link-lift">
                                <MessageCircle size={16} className="text-action" />
                                <span dir="ltr">{t.contact.whatsappNumber}</span>
                                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href={`tel:${t.contact.phoneRaw}`}
                                className="flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-text-2/60 hover:text-action transition-colors group link-lift">
                                <Phone size={16} />
                                <span dir="ltr">{t.contact.phoneNumber}</span>
                                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="mailto:azzambh78@gmail.com"
                                className="flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-text-2/60 hover:text-action transition-colors group link-lift">
                                <Mail size={16} />
                                <span>azzambh78@gmail.com</span>
                                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h4 className="font-sans font-bold text-text-1 mb-10 text-xs uppercase tracking-[0.4em] border-b border-divider/10 pb-4">
                            {t.footer.navigation}
                        </h4>
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-sm font-bold uppercase tracking-widest text-text-2/40 hover:text-action transition-all hover:pl-2 link-lift">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="font-sans font-bold text-text-1 mb-10 text-xs uppercase tracking-[0.4em] border-b border-divider/10 pb-4">
                            {t.footer.services}
                        </h4>
                        <ul className="space-y-4">
                            {serviceLinks.slice(0, 6).map((service, i) => (
                                <li key={i}>
                                    <Link to="/services" className="text-sm font-bold uppercase tracking-widest text-text-2/40 hover:text-action transition-all hover:pl-2 link-lift">
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal / CTA Column */}
                    <div>
                        <h4 className="font-sans font-bold text-text-1 mb-10 text-xs uppercase tracking-[0.4em] border-b border-divider/10 pb-4">
                            {t.footer.legal}
                        </h4>
                        <div className="bg-surface-0/50 border border-divider/10 p-8 mb-10 rounded-sm">
                            <p className="text-xs font-mono text-text-2/40 uppercase tracking-widest mb-6 leading-loose">
                                {t.footer.privacy}<br />
                                {t.footer.terms}
                            </p>
                            <a
                                href={`https://wa.me/${t.contact.whatsappLink}?text=${encodeURIComponent(t.whatsappMessages.footerCTA)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full btn-magnetic btn-primary !py-4 font-bold uppercase tracking-[0.2em]"
                            >
                                {t.nav.quote}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-divider/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-2/30">{t.footer.copyright}</p>

                    {/* System Status */}
                    <div className="flex items-center gap-4 bg-surface-0/50 px-6 py-2 border border-divider/10 rounded-xs">
                        <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-text-2/20'}`} />
                        <span className="font-mono text-[10px] text-text-2/60 uppercase tracking-[0.3em]">
                            STATUS: {isOpen ? 'OPERATIONAL' : 'OFFLINE'}
                        </span>
                    </div>

                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-2/30">{t.footer.cr}</p>
                </div>
            </div>

            {/* Watermark */}
            <div className="absolute bottom-0 right-0 font-bold text-[15vw] leading-none text-text-1/[0.02] select-none pointer-events-none translate-y-1/2">
                ROOTS
            </div>
        </footer>
    );
}
