import { useState, useEffect, useRef, memo } from 'react';
import { useLanguage } from '../i18n';
import { Sparkles, Radio, CalendarDays, Check, ArrowRight } from 'lucide-react';

/* ═══ Card 1: Diagnostic Shuffler (Isolated Perpetual Motion) ═══ */
const ShufflerCard = memo(function ShufflerCard({ data }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % data.labels.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [data.labels.length]);

    return (
        <div className="h-full flex flex-col bg-surface-1 border border-divider/5 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-accent" />
                <span className="font-mono text-xs text-text-2/50 uppercase tracking-[0.2em]">01 / SYSTEM_SYNC</span>
            </div>
            <h3 className="text-2xl font-sans font-bold text-text-1 mb-4 uppercase tracking-tighter">{data.title}</h3>
            <p className="text-sm text-text-2 mb-8 leading-relaxed max-w-[65ch] font-sans">{data.description}</p>

            {/* Shuffler Stack */}
            <div className="flex-1 flex items-end">
                <div className="relative w-full h-40">
                    {data.labels.map((label, i) => {
                        const offset = (i - activeIndex + data.labels.length) % data.labels.length;
                        return (
                            <div
                                key={i}
                                className="absolute inset-x-0"
                                style={{
                                    transform: `translateY(${offset * -16}px) scale(${1 - offset * 0.04})`,
                                    opacity: 1 - offset * 0.25,
                                    zIndex: data.labels.length - offset,
                                    transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                                }}
                            >
                                <div className={`border rounded-md ${offset === 0 ? 'border-action bg-action text-white' : 'border-divider/10 bg-surface-0/50 text-text-2/40'} p-4 flex items-center gap-3`}
                                    style={{ transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                                    <div className={`w-2 h-2 rounded-full ${offset === 0 ? 'bg-white animate-pulse' : 'bg-text-2/20'}`} />
                                    <span className="font-mono text-[10px] uppercase tracking-widest leading-none">
                                        {label}
                                    </span>
                                    {offset === 0 && <Check size={14} className="text-white ml-auto" />}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

/* ═══ Card 2: Telemetry Typewriter (Isolated Perpetual Motion) ═══ */
const TypewriterCard = memo(function TypewriterCard({ data }) {
    const [displayText, setDisplayText] = useState('');
    const [feedIndex, setFeedIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const feed = data.feeds[feedIndex];
        if (charIndex < feed.length) {
            const timer = setTimeout(() => {
                setDisplayText(prev => prev + feed[charIndex]);
                setCharIndex(prev => prev + 1);
            }, 30);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setFeedIndex(prev => (prev + 1) % data.feeds.length);
                setCharIndex(0);
                setDisplayText('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [charIndex, feedIndex, data.feeds]);

    return (
        <div className="h-full flex flex-col border border-divider/5 bg-surface-0 rounded-[2.5rem] p-8 md:p-10 text-text-1 relative overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]">
            {/* Liquid Glass inner refraction */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[2.5rem]" />

            <div className="flex items-center gap-2 mb-4 relative z-10">
                <Radio size={18} className="text-action" />
                <span className="font-mono text-xs text-text-2/40 uppercase tracking-[0.2em]">02 / LIVE_STREAM</span>
            </div>
            <h3 className="text-2xl font-sans font-bold text-text-1 mb-4 uppercase tracking-tighter relative z-10">{data.title}</h3>
            <p className="text-sm text-text-2 mb-8 leading-relaxed max-w-[65ch] font-sans relative z-10">{data.description}</p>

            {/* Live Feed */}
            <div className="flex-1 flex items-end relative z-10">
                <div className="w-full">
                    <div className="flex items-center justify-between mb-3 border-b border-divider/10 pb-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-action rounded-full animate-ping" />
                            <span className="font-mono text-[10px] text-action uppercase tracking-widest">Active Connection</span>
                        </div>
                        <span className="font-mono text-[10px] text-text-2/30 uppercase tracking-widest">Signal_99%</span>
                    </div>
                    <div className="min-h-[100px] border border-divider/10 bg-surface-1/50 p-4 relative overflow-hidden rounded-md">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-action/5 blur-2xl" />
                        <p className="font-mono text-xs md:text-sm text-text-1/80 leading-relaxed" dir="ltr">
                            {displayText}
                            <span className="cursor-blink text-action font-black">_</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});

/* ═══ Card 3: Scheduler (Isolated Perpetual Motion) ═══ */
const SchedulerCard = memo(function SchedulerCard({ data }) {
    const [activeDay, setActiveDay] = useState(-1);

    useEffect(() => {
        let step = 0;
        const sequence = [2, 4, 5];
        let timers = [];

        const runAnimation = () => {
            if (step < sequence.length) {
                const t1 = setTimeout(() => {
                    setActiveDay(sequence[step]);
                    step++;
                    const t2 = setTimeout(runAnimation, 800);
                    timers.push(t2);
                }, 600);
                timers.push(t1);
            } else {
                const t3 = setTimeout(() => {
                    step = 0;
                    setActiveDay(-1);
                    runAnimation();
                }, 2000);
                timers.push(t3);
            }
        };

        runAnimation();
        return () => { timers.forEach(clearTimeout); step = 999; };
    }, []);

    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    return (
        <div className="h-full flex flex-col bg-surface-1 border border-divider/5 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-2 mb-4">
                <CalendarDays size={18} className="text-accent" />
                <span className="font-mono text-xs text-text-2/50 uppercase tracking-[0.2em]">03 / TIME_GRID</span>
            </div>
            <h3 className="text-2xl font-sans font-bold text-text-1 mb-4 uppercase tracking-tighter">{data.title}</h3>
            <p className="text-sm text-text-2 mb-8 leading-relaxed max-w-[65ch] font-sans">{data.description}</p>

            {/* Scheduler Grid */}
            <div className="flex-1 flex items-end">
                <div className="w-full relative">
                    <div className="grid grid-cols-7 gap-1 md:gap-2 mb-6">
                        {days.map((day, i) => (
                            <div
                                key={i}
                                className={`h-12 border rounded-md flex flex-col items-center justify-center
                                    ${activeDay === i
                                        ? 'bg-action border-action text-white'
                                        : 'bg-surface-0/50 border-divider/10 text-text-2/40'
                                    }`}
                                style={{ transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
                            >
                                <span className="font-mono text-[8px] mb-1">{day}</span>
                                <div className={`w-1 h-1 rounded-full ${activeDay === i ? 'bg-white' : 'bg-text-2/20'}`} />
                            </div>
                        ))}
                    </div>
                    <button className="w-full bg-surface-0 text-text-1 py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-action active:scale-[0.98] active:-translate-y-[1px] rounded-md"
                        style={{ transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        {data.saveLabel}
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
});

/* ═══ Main Features Section — Asymmetric Bento Layout ═══ */
export default function Features() {
    const { t, isRTL } = useLanguage();
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.feature-card');
                        cards.forEach((card, i) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, i * 200);
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
        <section ref={sectionRef} className="section-padding bg-surface-1 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-0/20 z-0" />
            <div className="absolute top-20 left-10 font-mono text-[160px] font-bold text-text-1/[0.02] select-none pointer-events-none">
                SYNC
            </div>

            <div className="container-custom relative z-10">
                {/* Section Header — Left-aligned (ANTI-CENTER) */}
                <div className={`mb-20 md:mb-28 max-w-2xl ${isRTL ? 'mr-0 ml-auto text-right' : 'ml-0 mr-auto text-left'}`}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-1 bg-accent" />
                        <span className="font-mono text-xs font-bold text-text-2/40 uppercase tracking-[0.4em]">
                            {t.features.sectionLabel}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-sans font-bold text-text-1 uppercase tracking-tighter leading-none">
                        {t.features.sectionTitle}
                    </h2>
                </div>

                {/* Asymmetric Bento Grid (2fr 1fr / 1fr 2fr zig-zag) */}
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mb-6">
                    <div className="feature-card opacity-0" style={{ transform: 'translateY(60px)', transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        <TypewriterCard data={t.features.card2} />
                    </div>
                    <div className="feature-card opacity-0" style={{ transform: 'translateY(60px)', transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        <ShufflerCard data={t.features.card1} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
                    <div className="feature-card opacity-0" style={{ transform: 'translateY(60px)', transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        <SchedulerCard data={t.features.card3} />
                    </div>
                    <div className="feature-card opacity-0 hidden md:flex items-center justify-center bg-surface-0/30 rounded-[2.5rem] border border-divider/5 p-10" style={{ transform: 'translateY(60px)', transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        <div className="text-center">
                            <div className="accent-bar mx-auto mb-6" />
                            <p className="font-mono text-[10px] text-text-2/30 uppercase tracking-[0.5em]">
                                PRECISION_ENGINEERING
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
