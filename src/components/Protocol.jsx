import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n';

/* ═══ Canvas Animations ═══ */
function RotatingMotif() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let angle = 0;
        let animId;

        const draw = () => {
            const w = canvas.width = canvas.offsetWidth * 2;
            const h = canvas.height = canvas.offsetHeight * 2;
            ctx.clearRect(0, 0, w, h);
            ctx.save();
            ctx.translate(w / 2, h / 2);
            ctx.rotate(angle);

            for (let i = 0; i < 6; i++) {
                ctx.save();
                ctx.rotate((Math.PI * 2 / 6) * i);
                ctx.beginPath();
                ctx.arc(60, 0, 30, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(196, 22, 28, 0.1)';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(90, 0, 15, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(196, 22, 28, 0.05)';
                ctx.stroke();
                ctx.restore();
            }

            ctx.beginPath();
            ctx.arc(0, 0, 50, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(196, 22, 28, 0.15)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.restore();
            angle += 0.003;
            animId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animId);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />;
}

function ScanningLaser() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let y = 0;
        let animId;

        const draw = () => {
            const w = canvas.width = canvas.offsetWidth * 2;
            const h = canvas.height = canvas.offsetHeight * 2;
            ctx.clearRect(0, 0, w, h);

            const spacing = 40;
            for (let x = spacing; x < w; x += spacing) {
                for (let gy = spacing; gy < h; gy += spacing) {
                    const dist = Math.abs(gy - y);
                    const alpha = dist < 40 ? 0.4 : 0.05;
                    ctx.beginPath();
                    ctx.rect(x - 1, gy - 1, 2, 2);
                    ctx.fillStyle = dist < 40 ? `rgba(196, 22, 28, ${alpha})` : `rgba(255, 255, 255, ${alpha * 0.3})`;
                    ctx.fill();
                }
            }

            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.strokeStyle = 'rgba(196, 22, 28, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();

            y = (y + 1.5) % h;
            animId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animId);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />;
}

function PulsingWaveform() {
    const svgRef = useRef(null);
    const offsetRef = useRef(0);

    useEffect(() => {
        let animId;
        const animate = () => {
            if (svgRef.current) {
                const path = svgRef.current.querySelector('path');
                if (path) {
                    offsetRef.current -= 3;
                    path.setAttribute('stroke-dashoffset', offsetRef.current);
                }
            }
            animId = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <svg ref={svgRef} className="w-full h-64" viewBox="0 0 800 200" preserveAspectRatio="none">
                <path
                    d="M0,100 L50,100 L60,40 L70,160 L80,100 L150,100 L160,20 L170,180 L180,100 L250,100 L260,60 L270,140 L280,100 L400,100 L410,30 L420,170 L430,100 L550,100 L560,50 L570,150 L580,100 L700,100 L710,10 L720,190 L730,100 L800,100"
                    fill="none"
                    stroke="#C4161C"
                    strokeWidth="2"
                    strokeDasharray="10 5"
                    strokeDashoffset="0"
                />
            </svg>
        </div>
    );
}

/* ═══ Protocol Section ═══ */
export default function Protocol() {
    const { t, isRTL } = useLanguage();
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.protocol-card');
                        cards.forEach((card, i) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateX(0)';
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

    const animations = [RotatingMotif, ScanningLaser, PulsingWaveform];

    return (
        <section ref={sectionRef} className="section-padding bg-surface-0 relative overflow-hidden">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className={`mb-20 md:mb-32 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-1 bg-accent" />
                        <span className="font-mono text-xs font-bold text-text-2/40 uppercase tracking-[0.4em]">
                            {t.protocol.sectionLabel}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-sans font-bold text-text-1 uppercase tracking-tighter leading-none">
                        {t.protocol.sectionTitle}
                    </h2>
                </div>

                {/* Protocol Cards */}
                <div className="grid grid-cols-1 gap-1">
                    {t.protocol.steps.map((step, i) => {
                        const AnimComponent = animations[i];
                        return (
                            <div
                                key={i}
                                className="protocol-card transition-all duration-1000 ease-[0.16,1,0.3,1] opacity-0"
                                style={{ transform: isRTL ? 'translateX(50px)' : 'translateX(-50px)' }}
                            >
                                <div className="group relative overflow-hidden flex flex-col md:flex-row items-center bg-surface-1/50 border-y border-divider/5 hover:bg-surface-1 transition-colors duration-500 rounded-sm">
                                    {/* Animation Side */}
                                    <div className="w-full md:w-1/3 h-48 md:h-80 relative bg-surface-0/50 border-r border-divider/5">
                                        <AnimComponent />
                                    </div>

                                    {/* Content Side */}
                                    <div className={`flex-1 p-8 md:p-16 ${isRTL ? 'text-right md:pr-24' : 'text-left md:pl-24'}`}>
                                        <div className="flex items-baseline gap-4 mb-6">
                                            <span className="font-mono text-action text-2xl md:text-4xl font-bold">
                                                {step.number}
                                            </span>
                                            <h3 className="text-2xl md:text-5xl font-sans font-bold text-text-1 uppercase tracking-tight">
                                                {step.title}
                                            </h3>
                                        </div>
                                        <p className="text-base md:text-xl text-text-2 max-w-2xl leading-relaxed font-sans">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Decorative Element */}
                                    <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-text-2/20 uppercase tracking-widest hidden lg:block">
                                        PRT_SYS_LVL_{i + 1}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
