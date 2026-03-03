import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n';
import { Sparkles, Radio, CalendarDays, Check, ArrowRight } from 'lucide-react';

/* ═══ Card 1: Diagnostic Shuffler ═══ */
function ShufflerCard({ data }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % data.labels.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [data.labels.length]);

    return (
        <div className="paper-card h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-accent" />
                <span className="font-mono text-xs text-text-2/50 uppercase tracking-[0.2em]">01 / SYSTEM_SYNC</span>
            </div>
            <h3 className="text-2xl font-sans font-bold text-text-1 mb-4 uppercase tracking-tighter">{data.title}</h3>
            <p className="text-sm text-text-2 mb-8 leading-relaxed font-sans">{data.description}</p>

            {/* Shuffler Stack */}
            <div className="flex-1 flex items-end">
                <div className="relative w-full h-40">
                    {data.labels.map((label, i) => {
                        const offset = (i - activeIndex + data.labels.length) % data.labels.length;
                        return (
                            <div
                                key={i}
                                className="absolute inset-x-0 transition-all duration-700"
                                style={{
                                    transform: `translateY(${offset * -16}px) scale(${1 - offset * 0.04})`,
                                    opacity: 1 - offset * 0.25,
                                    zIndex: data.labels.length - offset,
                                }}
                            >
                                <div className={`border rounded-xs ${offset === 0 ? 'border-action bg-action text-white' : 'border-divider/10 bg-surface-0/50 text-text-2/40'} p-4 flex items-center gap-3 transition-colors duration-500`}>
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
}

/* ═══ Card 2: Telemetry Typewriter ═══ */
function TypewriterCard({ data }) {
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
        <div className="h-full flex flex-col border border-divider/5 bg-surface-0 p-8 text-text-1 relative overflow-hidden group rounded-md">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="flex items-center gap-2 mb-4 relative z-10">
                <Radio size={18} className="text-action" />
                <span className="font-mono text-xs text-text-2/40 uppercase tracking-[0.2em]">02 / LIVE_STREAM</span>
            </div>
            <h3 className="text-2xl font-sans font-bold text-text-1 mb-4 uppercase tracking-tighter">{data.title}</h3>
            <p className="text-sm text-text-2 mb-8 leading-relaxed font-sans">{data.description}</p>

            {/* Live Feed */}
            <div className="flex-1 flex items-end">
                <div className="w-full">
                    <div className="flex items-center justify-between mb-3 border-b border-divider/10 pb-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-action rounded-full animate-ping" />
                            <span className="font-mono text-[10px] text-action uppercase tracking-widest">Active Connection</span>
                        </div>
                        <span className="font-mono text-[10px] text-text-2/30 uppercase tracking-widest">Signal_99%</span>
                    </div>
                    <div className="min-h-[100px] border border-divider/10 bg-surface-1/50 p-4 relative overflow-hidden rounded-xs">
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
}

/* ═══ Card 3: Scheduler ═══ */
function SchedulerCard({ data }) {
    const [activeDay, setActiveDay] = useState(-1);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, visible: false });
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    useEffect(() => {
        let step = 0;
        const sequence = [2, 4, 5];

        const runAnimation = () => {
            if (step < sequence.length) {
                setCursorPos({ x: sequence[step] * 14.28, y: 50, visible: true });
                setTimeout(() => {
                    setActiveDay(sequence[step]);
                    step++;
                    setTimeout(runAnimation, 800);
                }, 600);
            } else {
                setTimeout(() => {
                    setCursorPos({ x: 85, y: 90, visible: true });
                    setTimeout(() => {
                        setCursorPos(prev => ({ ...prev, visible: false }));
                        setTimeout(() => {
                            step = 0;
                            setActiveDay(-1);
                            runAnimation();
                        }, 2000);
                    }, 500);
                }, 400);
            }
        };

        runAnimation();
        return () => { step = 999; };
    }, []);

    return (
        <div className="paper-card h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
                <CalendarDays size={18} className="text-accent" />
                <span className="font-mono text-xs text-text-2/50 uppercase tracking-[0.2em]">03 / TIME_GRID</span>
            </div>
            <h3 className="text-2xl font-sans font-bold text-text-1 mb-4 uppercase tracking-tighter">{data.title}</h3>
            <p className="text-sm text-text-2 mb-8 leading-relaxed font-sans">{data.description}</p>

            {/* Scheduler Grid */}
            <div className="flex-1 flex items-end">
                <div className="w-full relative">
                    <div className="grid grid-cols-7 gap-1 md:gap-2 mb-6">
                        {days.map((day, i) => (
                            <div
                                key={i}
                                className={`h-12 border rounded-xs flex flex-col items-center justify-center transition-all duration-300
                  ${activeDay === i
                                        ? 'bg-action border-action text-white'
                                        : 'bg-surface-0/50 border-divider/10 text-text-2/40'
                                    }`}
                            >
                                <span className="font-mono text-[8px] mb-1">{day}</span>
                                <div className={`w-1 h-1 rounded-full ${activeDay === i ? 'bg-white' : 'bg-text-2/20'}`} />
                            </div>
                        ))}
                    </div>
                    <button className="w-full bg-surface-0 text-text-1 py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-action transition-colors rounded-xs">
                        {data.saveLabel}
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ═══ Main Features Component ═══ */
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
        <section ref={sectionRef} className="section-padding bg-surface-1 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-surface-0/30 z-0" />
            <div className="absolute top-20 left-10 font-mono text-[160px] font-bold text-text-1/[0.02] select-none pointer-events-none line-height-none">
                SYNC
            </div>

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className={`mb-20 md:mb-28 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-1 bg-accent" />
                        <span className="font-mono text-xs font-bold text-text-2/40 uppercase tracking-[0.4em]">
                            {t.features.sectionLabel}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-sans font-bold text-text-1 uppercase tracking-tighter leading-none">
                        {t.features.sectionTitle}
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="feature-card opacity-0 translate-y-20 transition-all duration-1000" style={{ transform: 'translateY(80px)' }}>
                        <ShufflerCard data={t.features.card1} />
                    </div>
                    <div className="feature-card opacity-0 translate-y-20 transition-all duration-1000" style={{ transform: 'translateY(80px)' }}>
                        <TypewriterCard data={t.features.card2} />
                    </div>
                    <div className="feature-card opacity-0 translate-y-20 transition-all duration-1000" style={{ transform: 'translateY(80px)' }}>
                        <SchedulerCard data={t.features.card3} />
                    </div>
                </div>
            </div>
        </section>
    );
}
