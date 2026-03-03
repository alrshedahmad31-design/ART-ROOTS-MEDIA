import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n';

export default function Philosophy() {
    const { t, isRTL } = useLanguage();
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const words = entry.target.querySelectorAll('.word-reveal');
                        words.forEach((word, i) => {
                            setTimeout(() => {
                                word.style.opacity = '1';
                                word.style.transform = 'translateY(0)';
                            }, i * 40);
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const WordReveal = ({ text, className = '' }) => (
        <>
            {text.split(' ').map((word, i) => (
                <span
                    key={i}
                    className={`word-reveal inline-block transition-all duration-700 ${className}`}
                    style={{ opacity: 0, transform: 'translateY(10px)' }}
                >
                    {word}&nbsp;
                </span>
            ))}
        </>
    );

    return (
        <section ref={sectionRef} className="relative py-32 md:py-56 overflow-hidden bg-surface-0">
            {/* Dramatic Background */}
            <div
                className="absolute inset-0 grayscale opacity-20 transition-opacity duration-1000"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-transparent to-surface-0" />

            <div className="container-custom relative z-10">
                <div className={`max-w-5xl ${isRTL ? 'mr-0 ml-auto text-right' : 'ml-0 mr-auto text-left'}`}>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-16 h-[2px] bg-accent" />
                        <span className="font-mono text-xs font-bold text-text-2/80 uppercase tracking-[0.4em]">PHILOSOPHY_v2.0</span>
                    </div>

                    {/* Line 1: Neutral */}
                    <p className="text-xl md:text-3xl lg:text-4xl text-text-2/80 leading-tight mb-6 font-sans">
                        <WordReveal text={t.philosophy.line1} />
                        <br />
                        <span className="text-text-1 font-bold uppercase tracking-tight">
                            <WordReveal text={t.philosophy.highlight1} />
                        </span>
                    </p>

                    {/* Line 2: Massive */}
                    <p className="text-xl md:text-3xl lg:text-4xl text-text-2/80 leading-tight mb-4 font-sans">
                        <WordReveal text={t.philosophy.line2} />
                    </p>
                    <p className="text-5xl md:text-8xl lg:text-[10rem] font-sans font-bold leading-[0.9] mb-12 tracking-tighter">
                        <WordReveal text={t.philosophy.highlight2} className="text-action" />
                    </p>

                    {/* Description */}
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <p className="text-lg md:text-xl text-text-2/80 leading-relaxed max-w-2xl font-sans">
                            <WordReveal text={t.philosophy.description} />
                        </p>
                        <div className="font-mono text-[10px] text-text-2/50 uppercase tracking-[0.5em] vertical-text [writing-mode:vertical-lr] hidden md:block">
                            EST_QUALITY_SYSTEMS
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
