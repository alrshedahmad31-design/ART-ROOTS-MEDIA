import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n';
import { Sparkles, Radio, CalendarDays, Check } from 'lucide-react';

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
        <div className="glass-card p-6 md:p-8 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} className="text-champagne" />
                <span className="font-mono text-xs text-champagne/70 uppercase tracking-wider">Feature 01</span>
            </div>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-ivory mb-3">{data.title}</h3>
            <p className="text-sm text-ivory/50 mb-6 leading-relaxed">{data.description}</p>

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
                                    transform: `translateY(${offset * -18}px) scale(${1 - offset * 0.05})`,
                                    opacity: 1 - offset * 0.3,
                                    zIndex: data.labels.length - offset,
                                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                                }}
                            >
                                <div className="bg-slate/50 border border-ivory/10 rounded-2xl p-4 flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${offset === 0 ? 'bg-champagne' : 'bg-ivory/20'}`} />
                                    <span className={`font-mono text-sm ${offset === 0 ? 'text-ivory' : 'text-ivory/40'}`}>
                                        {label}
                                    </span>
                                    {offset === 0 && <Check size={14} className="text-champagne ml-auto" />}
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
        <div className="glass-card p-6 md:p-8 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <Radio size={18} className="text-champagne" />
                <span className="font-mono text-xs text-champagne/70 uppercase tracking-wider">Feature 02</span>
            </div>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-ivory mb-3">{data.title}</h3>
            <p className="text-sm text-ivory/50 mb-6 leading-relaxed">{data.description}</p>

            {/* Live Feed */}
            <div className="flex-1 flex items-end">
                <div className="w-full">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="pulse-dot" style={{ width: '6px', height: '6px' }} />
                        <span className="font-mono text-xs text-green-400/80 uppercase tracking-wider">Live Feed</span>
                    </div>
                    <div className="bg-obsidian/80 border border-ivory/5 rounded-xl p-4 min-h-[80px]">
                        <p className="font-mono text-xs md:text-sm text-ivory/70 leading-relaxed" dir="ltr">
                            {displayText}
                            <span className="cursor-blink text-champagne font-bold">|</span>
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
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const gridRef = useRef(null);

    useEffect(() => {
        let step = 0;
        const sequence = [2, 4, 5]; // T, T, F

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
        <div className="glass-card p-6 md:p-8 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <CalendarDays size={18} className="text-champagne" />
                <span className="font-mono text-xs text-champagne/70 uppercase tracking-wider">Feature 03</span>
            </div>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-ivory mb-3">{data.title}</h3>
            <p className="text-sm text-ivory/50 mb-6 leading-relaxed">{data.description}</p>

            {/* Scheduler Grid */}
            <div className="flex-1 flex items-end">
                <div ref={gridRef} className="w-full relative">
                    <div className="grid grid-cols-7 gap-2 mb-4">
                        {days.map((day, i) => (
                            <div
                                key={i}
                                className={`aspect-square rounded-xl flex items-center justify-center text-xs font-mono transition-all duration-300
                  ${activeDay === i
                                        ? 'bg-champagne text-obsidian scale-95 shadow-lg shadow-champagne/30'
                                        : 'bg-slate/30 text-ivory/40 border border-ivory/5'
                                    }`}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                    <button className="w-full bg-slate/30 border border-ivory/10 rounded-xl py-2.5 text-xs font-mono text-ivory/50 hover:text-champagne hover:border-champagne/30 transition-all">
                        {data.saveLabel}
                    </button>

                    {/* Animated Cursor */}
                    {cursorPos.visible && (
                        <svg
                            className="absolute w-5 h-5 text-champagne transition-all duration-500 pointer-events-none"
                            style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%`, transform: 'translate(-50%, -50%)' }}
                            viewBox="0 0 24 24" fill="currentColor"
                        >
                            <path d="M5.5 3.21V20.79c0 .45.54.67.85.35l4.86-4.86H19c.55 0 1-.45 1-1v-1.78c0-.55-.45-1-1-1H11.21L6.35 2.86c-.31-.31-.85-.09-.85.35z" />
                        </svg>
                    )}
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
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="section-padding bg-obsidian relative">
            <div className="container-custom">
                {/* Section Header */}
                <div className={`mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="font-mono text-xs text-champagne/70 uppercase tracking-widest mb-4 block">
                        {t.features.sectionLabel}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-ivory">
                        {t.features.sectionTitle}
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="feature-card transition-all duration-700" style={{ opacity: 0, transform: 'translateY(40px)' }}>
                        <ShufflerCard data={t.features.card1} />
                    </div>
                    <div className="feature-card transition-all duration-700" style={{ opacity: 0, transform: 'translateY(40px)' }}>
                        <TypewriterCard data={t.features.card2} />
                    </div>
                    <div className="feature-card transition-all duration-700" style={{ opacity: 0, transform: 'translateY(40px)' }}>
                        <SchedulerCard data={t.features.card3} />
                    </div>
                </div>
            </div>
        </section>
    );
}
