import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n';
import { Target, Shield, Gem, Wrench, Quote } from 'lucide-react';
import AnimatedTiles from '../components/AnimatedTiles';
import useSEO from '../hooks/useSEO';

const valueIcons = [Target, Shield, Gem];

export default function About() {
    const { t, isRTL } = useLanguage();
    const sectionRef = useRef(null);

    useSEO({
        title: isRTL
            ? 'من نحن — أرت روتس ميديا | ورشة الإنتاج الإعلاني في البحرين'
            : 'About ART ROOTS MEDIA — Bahrain\'s Precision Production Workshop',
        description: isRTL
            ? 'تأسست في البحرين عام ٢٠٢٠. أرت روتس ميديا دار إنتاج إعلاني متكاملة تقدّم طباعة ولافتات وقص ليزر وتركيب في البحرين. تعرّف على قصتنا وقيمنا.'
            : 'Founded in Bahrain in 2020. ART ROOTS MEDIA is a full-service production house: print, signage, laser cutting & brand installation. CR No. 139328-1.',
        canonical: 'https://artrootsmedia.com/about',
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const els = entry.target.querySelectorAll('.about-animate');
                        els.forEach((el, i) => {
                            setTimeout(() => {
                                el.style.opacity = '1';
                                el.style.transform = 'translateY(0)';
                            }, i * 120);
                        });
                    }
                });
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            sectionRef.current.querySelectorAll('.about-section-trigger').forEach(section => {
                observer.observe(section);
            });
        }
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef}>
            {/* Hero */}
            <section data-hero className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/assets/hero/hero-about.webp"
                        alt="About ART ROOTS MEDIA"
                        className="w-full h-full object-cover"
                    />
                    <div className="gradient-hero absolute inset-0" />
                    <div className="absolute inset-0 bg-surface-0/60" />
                </div>
                <div className="container-custom relative z-10">
                    <span className="font-mono text-xs text-action uppercase tracking-widest mb-4 block">
                        {isRTL ? 'تعرّف علينا' : 'About Us'}
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-text-1 mb-4">
                        {t.about.heroTitle}
                    </h1>
                    <p className="text-lg md:text-xl text-text-1/50 max-w-xl font-sans italic italic text-justify">
                        {t.about.heroSubtitle}
                    </p>
                </div>
            </section>

            {/* Founder Section */}
            <section className="section-padding bg-surface-1/20 about-section-trigger">
                <div className="container-custom">
                    <div className={`flex flex-col md:flex-row gap-12 items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                        {/* Founder Image */}
                        <div className="md:w-2/5">
                            <div className="about-animate relative overflow-hidden rounded-3xl transition-all duration-700" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                <AnimatedTiles
                                    imageUrl="/assets/founder/founder.webp"
                                    rows={10}
                                    cols={8}
                                    tileSize={50}
                                    className="rounded-3xl"
                                />
                            </div>
                        </div>

                        {/* Founder Message */}
                        <div className={`md:w-3/5 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <div className="about-animate transition-all duration-700" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-signal-red/10 border border-signal-red/20 mb-6">
                                    <Quote size={26} className="text-signal-red" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-sans font-black text-onyx mb-6 uppercase tracking-tighter">
                                    {t.about.founderTitle}
                                </h2>
                            </div>
                            <div className="about-animate transition-all duration-700" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                {t.about.founderMessage.split('\n\n').map((paragraph, i) => (
                                    <p key={i} className="text-base text-onyx/70 leading-relaxed mb-4 text-justify font-sans">
                                        {paragraph}
                                    </p>
                                ))}
                                <div className="mt-8 border-t border-onyx/10 pt-6">
                                    <p className="text-lg font-sans font-black text-signal-red uppercase tracking-tighter">
                                        {t.about.founderName}
                                    </p>
                                    <p className="text-sm text-onyx/40 mt-1 font-mono uppercase tracking-widest">
                                        {t.about.founderRole}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="section-padding bg-surface-0 about-section-trigger overflow-hidden">
                <div className="container-custom">
                    <div className={`flex flex-col lg:flex-row gap-16 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
                        {/* Text Content */}
                        <div className="lg:w-1/2">
                            <h2 className="about-animate text-3xl md:text-4xl font-sans font-bold text-text-1 mb-8 transition-all duration-700" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                {t.about.storyTitle}
                            </h2>
                            <div className="space-y-6">
                                <p className="about-animate text-base md:text-lg text-text-1/50 leading-relaxed transition-all duration-700 text-justify" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                    {t.about.storyP1}
                                </p>
                                <p className="about-animate text-base md:text-lg text-text-1/50 leading-relaxed transition-all duration-700 text-justify" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                    {t.about.storyP2}
                                </p>
                                <p className="about-animate text-base md:text-lg text-text-1/50 leading-relaxed transition-all duration-700 text-justify" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                    {t.about.storyP3}
                                </p>
                            </div>
                        </div>

                        {/* Image Content */}
                        <div className="lg:w-1/2 w-full">
                            <div className="about-animate relative transition-all duration-700" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                <div className="absolute -inset-4 bg-action/5 rounded-3xl blur-2xl -z-10" />
                                <img
                                    src="/assets/hero/the-workshop.webp"
                                    alt="Our Workshop"
                                    className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl border border-divider/10 shadow-2xl"
                                />
                                {/* Modern detail overlay */}
                                <div className={`absolute bottom-6 ${isRTL ? 'left-6' : 'right-6'} bg-surface-0/80 backdrop-blur-md p-4 rounded-2xl border border-divider/10`}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-action/10 flex items-center justify-center">
                                            <Wrench size={20} className="text-action" />
                                        </div>
                                        <div>
                                            <p className="text-text-1 font-bold text-sm leading-none mb-1">
                                                {isRTL ? 'دقة التصنيع' : 'Precision Crafted'}
                                            </p>
                                            <p className="text-text-1/40 text-xs">
                                                {isRTL ? 'من الفكرة حتى التركيب' : 'From Concept to Presence'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section-padding bg-surface-0 about-section-trigger">
                <div className="container-custom">
                    <h2 className="about-animate text-3xl md:text-4xl font-sans font-bold text-text-1 mb-12 text-center transition-all duration-700" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                        {t.about.valuesTitle}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {t.about.values.map((value, i) => {
                            const Icon = valueIcons[i];
                            return (
                                <div
                                    key={i}
                                    className="about-animate glass-card-light p-8 text-center transition-all duration-700"
                                    style={{ opacity: 0, transform: 'translateY(30px)' }}
                                >
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-action/10 border border-action/20 mb-6">
                                        <Icon size={26} className="text-action" />
                                    </div>
                                    <h3 className="text-xl font-sans font-bold text-text-1 mb-3">{value.title}</h3>
                                    <p className="text-sm text-text-1/50 leading-relaxed text-justify">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Workshop Section */}
            <section className="section-padding bg-surface-1/20 about-section-trigger">
                <div className="container-custom">
                    <div className={`flex flex-col md:flex-row gap-12 items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                        <div className="md:w-1/2">
                            <div className="about-animate relative overflow-hidden rounded-3xl transition-all duration-700" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1581092160607-ee67df30d0d4?w=800&q=80"
                                    alt="Workshop equipment"
                                    className="w-full h-80 md:h-[400px] object-cover"
                                />
                                <div className="absolute bottom-4 left-4">
                                    <div className="flex items-center gap-2 bg-surface-0/80 backdrop-blur-sm rounded-full px-4 py-2">
                                        <Wrench size={14} className="text-action" />
                                        <span className="font-mono text-xs text-text-1/70">{t.about.workshopTitle}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`md:w-1/2 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <h2 className="about-animate text-3xl md:text-4xl font-sans font-black text-onyx mb-6 uppercase tracking-tighter transition-all duration-700" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                {t.about.workshopTitle}
                            </h2>
                            <p className="about-animate text-base text-onyx/70 leading-relaxed mb-8 transition-all duration-700 text-justify font-sans" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                {t.about.workshopDescription}
                            </p>
                            {/* Legal Info */}
                            <div className="about-animate bg-sand/50 p-6 space-y-2 border border-onyx/10 transition-all duration-700" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                <h4 className="font-sans font-black text-onyx text-sm mb-3 uppercase tracking-widest">{t.about.crTitle}</h4>
                                <p className="font-mono text-xs text-onyx/60">{t.about.crNumber}</p>
                                <p className="font-mono text-xs text-onyx/60">{t.about.crType}</p>
                                <p className="font-mono text-xs text-onyx/60">{t.about.crDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
