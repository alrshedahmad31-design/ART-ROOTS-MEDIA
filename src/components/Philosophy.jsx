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
                            }, i * 80);
                        });
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const WordReveal = ({ text, className = '' }) => (
        <>
            {text.split(' ').map((word, i) => (
                <span
                    key={i}
                    className={`word-reveal inline-block transition-all duration-500 ${className}`}
                    style={{ opacity: 0, transform: 'translateY(20px)', transitionDelay: `${i * 80}ms` }}
                >
                    {word}&nbsp;
                </span>
            ))}
        </>
    );

    return (
        <section ref={sectionRef} className="relative py-24 md:py-40 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-slate" />
            <div
                className="parallax-bg"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80)',
                    opacity: 0.08,
                }}
            />

            <div className="container-custom relative z-10">
                <div className={`max-w-4xl ${isRTL ? 'mr-0 ml-auto text-right' : 'ml-0 mr-auto text-left'}`}>
                    {/* Line 1: Neutral */}
                    <p className="text-lg md:text-2xl text-ivory/40 leading-relaxed mb-4 text-justify">
                        <WordReveal text={t.philosophy.line1} />
                        <br />
                        <span className="text-ivory/60 font-medium">
                            <WordReveal text={t.philosophy.highlight1} />
                        </span>
                    </p>

                    {/* Divider */}
                    <div className="w-16 h-[1px] bg-champagne/30 my-8 md:my-12" />

                    {/* Line 2: Massive */}
                    <p className="text-lg md:text-2xl text-ivory/40 leading-relaxed mb-2 text-justify">
                        <WordReveal text={t.philosophy.line2} />
                    </p>
                    <p className="text-4xl md:text-6xl lg:text-7xl font-drama italic leading-[1.1] mb-8 md:mb-12">
                        <WordReveal text={t.philosophy.highlight2} className="text-champagne" />
                    </p>

                    {/* Description */}
                    <p className="text-base md:text-lg text-ivory/40 leading-relaxed max-w-2xl text-justify">
                        <WordReveal text={t.philosophy.description} />
                    </p>
                </div>
            </div>
        </section>
    );
}
