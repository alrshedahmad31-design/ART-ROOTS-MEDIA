import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n';
import useSEO from '../hooks/useSEO';
import { Printer, Store, Palette, Scissors, Gift, Globe, ArrowRight, ArrowLeft } from 'lucide-react';

const serviceIcons = [Printer, Store, Palette, Scissors, Gift, Globe];

const serviceImages = [
    '/assets/services/printing-and-stickers.webp',
    '/assets/services/signage-and-shopfronts.webp',
    '/assets/services/brand-identity.webp',
    '/assets/services/laser-and-cnc.webp',
    '/assets/services/gifts-and-merchandise.webp',
];

export default function Services() {
    const { t, isRTL } = useLanguage();
    const sectionRef = useRef(null);

    useSEO({
        title: isRTL
            ? 'خدمات الطباعة واللافتات والهوية التجارية في البحرين | ART ROOTS MEDIA'
            : 'Printing, Signage, Branding & Laser Services in Bahrain | ART ROOTS MEDIA',
        description: isRTL
            ? 'خدمات إنتاج شاملة في البحرين: طباعة كبيرة الحجم، لافتات وواجهات محلات، هوية تجارية، قص ليزر وCNC، وهدايا دعائية. ضمان جودة على كل طلب.'
            : 'Full-spectrum production services in Bahrain: large-format printing, custom signage & shopfronts, brand identity, laser & CNC cutting, and corporate gifts. Quality guaranteed on every order.',
        canonical: 'https://artroots.bh/services',
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.service-card');
                        cards.forEach((card, i) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, i * 150);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/assets/hero/hero_services.webp" alt="Printing, signage and branding services in Bahrain — ART ROOTS MEDIA" className="w-full h-full object-cover" />
                    <div className="gradient-hero absolute inset-0" />
                    <div className="absolute inset-0 bg-obsidian/50" />
                </div>
                <div className="container-custom relative z-10">
                    <span className="font-mono text-xs text-champagne/70 uppercase tracking-widest mb-4 block">
                        {t.services.label}
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-ivory mb-4">
                        {t.services.heroTitle}
                    </h1>
                    <p className="text-lg md:text-xl text-ivory/50 max-w-xl text-justify">
                        {t.services.heroSubtitle}
                    </p>
                </div>
            </section>

            {/* Services List */}
            <section ref={sectionRef} className="section-padding bg-obsidian">
                <div className="container-custom">
                    <div className="space-y-8">
                        {t.services.list.map((service, i) => {
                            const Icon = serviceIcons[i];
                            const isEven = i % 2 === 0;

                            return (
                                <div
                                    key={i}
                                    className="service-card transition-all duration-700"
                                    style={{ opacity: 0, transform: 'translateY(40px)' }}
                                >
                                    <div className={`glass-card-light overflow-hidden`}>
                                        <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                            {/* Image */}
                                            <div className="md:w-2/5 relative overflow-hidden">
                                                <img
                                                    src={serviceImages[i]}
                                                    alt={service.title}
                                                    className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <span className="font-mono text-xs text-champagne uppercase tracking-wider">
                                                        {String(i + 1).padStart(2, '0')}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className={`md:w-3/5 p-8 md:p-12 flex flex-col justify-center ${isRTL ? 'text-right' : 'text-left'}`}>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-10 h-10 rounded-xl bg-champagne/10 flex items-center justify-center">
                                                        <Icon size={20} className="text-champagne" />
                                                    </div>
                                                    <span className="font-drama italic text-sm text-ivory/40">{service.subtitle}</span>
                                                </div>

                                                <h3 className="text-2xl md:text-3xl font-heading font-bold text-ivory mb-4">
                                                    {service.title}
                                                </h3>

                                                <p className="text-sm md:text-base text-ivory/50 leading-relaxed mb-6 text-justify">
                                                    {service.description}
                                                </p>

                                                {/* Detail Tags */}
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {service.details.map((detail, j) => (
                                                        <span
                                                            key={j}
                                                            className="px-3 py-1.5 text-xs font-mono bg-slate/30 text-ivory/50 rounded-full border border-ivory/5"
                                                        >
                                                            {detail}
                                                        </span>
                                                    ))}
                                                </div>

                                                {(() => {
                                                    const serviceKeys = ['printing', 'signage', 'branding', 'laser', 'gifts'];
                                                    const msgKey = serviceKeys[i] || 'home';
                                                    const message = encodeURIComponent(t.whatsappMessages.services[msgKey]);
                                                    return (
                                                        <a
                                                            href={`https://wa.me/${t.contact.whatsappLink}?text=${message}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn-magnetic btn-primary w-fit text-sm px-6 py-2.5"
                                                        >
                                                            {t.nav.quote}
                                                            {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                                                        </a>
                                                    );
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
