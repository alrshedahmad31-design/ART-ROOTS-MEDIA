import { useLanguage } from '../i18n';
import { ArrowRight, ArrowLeft, Clock, MessageCircle } from 'lucide-react';

export default function CTASection() {
    const { t, isRTL } = useLanguage();

    return (
        <section className="section-padding relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-slate/50 to-obsidian" />

            {/* Accent glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-champagne/5 blur-[120px]" />

            <div className="container-custom relative z-10 text-center">
                <div className="max-w-2xl mx-auto">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-champagne/10 border border-champagne/20 mb-8">
                        <MessageCircle className="text-champagne" size={28} />
                    </div>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-ivory mb-6 leading-tight">
                        {t.cta.title}
                    </h2>

                    <p className="text-base md:text-lg text-ivory/50 mb-10 leading-relaxed max-w-lg mx-auto">
                        {t.cta.subtitle}
                    </p>

                    <a
                        href={`https://wa.me/${t.contact.whatsappLink}?text=${encodeURIComponent(t.whatsappMessages.ctaSection)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-magnetic btn-primary text-base md:text-lg px-10 py-4 mb-6 inline-flex"
                    >
                        {t.cta.button}
                        {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                    </a>

                    <p className="flex items-center justify-center gap-2 text-xs text-ivory/30 font-mono">
                        <Clock size={12} />
                        {t.cta.note}
                    </p>
                </div>
            </div>
        </section>
    );
}
