import { useLanguage } from '../i18n';
import { ArrowRight, ArrowLeft, Clock, MessageCircle } from 'lucide-react';

export default function CTASection() {
    const { t, isRTL } = useLanguage();

    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-surface-1 border-y border-divider/10">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <div className="container-custom relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
                    {/* Left Side: Content */}
                    <div className="flex-1 text-left">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-[2px] bg-accent" />
                            <span className="font-mono text-xs font-bold text-text-2/40 uppercase tracking-[0.4em]">INITIATE_PROTOCOL</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-text-1 mb-8 leading-[0.9] uppercase tracking-tighter">
                            {t.cta.title}
                        </h2>

                        <p className="text-lg md:text-xl text-text-2 mb-12 leading-relaxed max-w-xl font-sans">
                            {t.cta.subtitle}
                        </p>

                        <div className="flex flex-wrap gap-6 items-center">
                            <a
                                href={`https://wa.me/${t.contact.whatsappLink}?text=${encodeURIComponent(t.whatsappMessages.ctaSection)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-magnetic btn-primary !px-10 !py-4 text-xs font-black uppercase tracking-[0.2em]"
                            >
                                {t.cta.button}
                                {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                            </a>
                            <div className="flex items-center gap-3 text-[10px] text-text-2/30 font-mono uppercase tracking-widest">
                                <Clock size={14} className="text-action" />
                                {t.cta.note}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Visual Accent */}
                    <div className="hidden lg:flex flex-col items-center justify-center p-12 border-2 border-divider/5 bg-surface-0/50 rounded-md">
                        <MessageCircle className="text-action mb-6" size={48} />
                        <div className="font-mono text-[10px] text-text-2/20 uppercase tracking-[0.5em] vertical-text [writing-mode:vertical-lr]">
                            REACH_OUT_NOW_SYSTEM_ACTIVE
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
