import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { MessageCircle, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    const { t, isRTL } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkStatus = () => {
            const now = new Date();
            const day = now.getDay();
            const hour = now.getHours();

            // Working days: Sun (0) to Thu (4)
            // Working hours: 9 AM to 5 PM
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
        <footer className="bg-obsidian-light relative" style={{ borderRadius: '4rem 4rem 0 0' }}>
            {/* Top border accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent" />

            <div className="container-custom py-16 md:py-24">
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <img src="/assets/logo/Logoo.webp" alt="ART ROOTS MEDIA" className="h-16 w-auto mb-6 transition-transform duration-500 hover:scale-105" />
                        <p className="text-ivory/50 text-sm leading-relaxed mb-6">
                            {t.footer.tagline}
                        </p>
                        {/* Contact Info */}
                        <div className="space-y-3">
                            <a href={`https://wa.me/${t.contact.whatsappLink}?text=${encodeURIComponent(t.whatsappMessages.footerContact)}`} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm text-ivory/50 hover:text-champagne transition-colors">
                                <MessageCircle size={14} className="text-[#25D366]" />
                                <span dir="ltr">{t.contact.whatsappNumber}</span>
                            </a>
                            <a href={`tel:${t.contact.phoneRaw}`}
                                className="flex items-center gap-3 text-sm text-ivory/50 hover:text-champagne transition-colors">
                                <Phone size={14} />
                                <span dir="ltr">{t.contact.phoneNumber}</span>
                            </a>
                            <a href="mailto:azzambh78@gmail.com"
                                className="flex items-center gap-3 text-sm text-ivory/50 hover:text-champagne transition-colors">
                                <Mail size={14} />
                                <span>azzambh78@gmail.com</span>
                            </a>
                            <div className="flex items-start gap-3 text-sm text-ivory/50">
                                <MapPin size={14} className="mt-0.5 shrink-0" />
                                <span>{t.contact.addressFull}</span>
                            </div>
                            <div className="pt-2 border-t border-ivory/5">
                                <p className="text-[10px] uppercase tracking-wider text-ivory/30 mb-1">{t.contact.hours}</p>
                                <p className="text-xs text-ivory/50">{t.contact.hoursDays}: <span className="text-champagne/80">{t.contact.hoursTime}</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h4 className="font-heading font-semibold text-ivory mb-6 text-sm uppercase tracking-widest">
                            {t.footer.navigation}
                        </h4>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-sm text-ivory/50 hover:text-champagne transition-colors link-hover">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="font-heading font-semibold text-ivory mb-6 text-sm uppercase tracking-widest">
                            {t.footer.services}
                        </h4>
                        <ul className="space-y-3">
                            {serviceLinks.map((service, i) => (
                                <li key={i}>
                                    <Link to="/services" className="text-sm text-ivory/50 hover:text-champagne transition-colors link-hover">
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal / CTA Column */}
                    <div>
                        <h4 className="font-heading font-semibold text-ivory mb-6 text-sm uppercase tracking-widest">
                            {t.footer.legal}
                        </h4>
                        <ul className="space-y-3 mb-8">
                            <li>
                                <span className="text-sm text-ivory/50">{t.footer.privacy}</span>
                            </li>
                            <li>
                                <span className="text-sm text-ivory/50">{t.footer.terms}</span>
                            </li>
                        </ul>
                        <a
                            href={`https://wa.me/${t.contact.whatsappLink}?text=${encodeURIComponent(t.whatsappMessages.footerCTA)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-magnetic btn-primary text-xs px-5 py-2.5"
                        >
                            <MessageCircle size={14} />
                            {t.nav.quote}
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-ivory/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-ivory/30">{t.footer.copyright}</p>

                    {/* System Status */}
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-[#25D366] shadow-[0_0_8px_rgba(37,211,102,0.5)]' : 'bg-ivory/20'} animate-pulse`} />
                        <span className="font-mono text-[10px] text-ivory/40 uppercase tracking-wider">
                            {isOpen ? t.footer.statusOpen : t.footer.statusClosed}
                        </span>
                    </div>

                    <p className="text-xs text-ivory/30">{t.footer.cr}</p>
                </div>
            </div>
        </footer>
    );
}
