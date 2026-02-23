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
                ctx.strokeStyle = 'rgba(201, 168, 76, 0.15)';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(90, 0, 15, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(201, 168, 76, 0.1)';
                ctx.stroke();
                ctx.restore();
            }

            ctx.beginPath();
            ctx.arc(0, 0, 50, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(201, 168, 76, 0.2)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.restore();
            angle += 0.003;
            animId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animId);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />;
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

            // Grid dots
            const spacing = 30;
            for (let x = spacing; x < w; x += spacing) {
                for (let gy = spacing; gy < h; gy += spacing) {
                    const dist = Math.abs(gy - y);
                    const alpha = dist < 30 ? 0.6 : 0.1;
                    ctx.beginPath();
                    ctx.arc(x, gy, dist < 30 ? 2.5 : 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = dist < 30 ? `rgba(201, 168, 76, ${alpha})` : `rgba(250, 248, 245, ${alpha})`;
                    ctx.fill();
                }
            }

            // Laser line
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.strokeStyle = 'rgba(201, 168, 76, 0.4)';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Glow
            const gradient = ctx.createLinearGradient(0, y - 20, 0, y + 20);
            gradient.addColorStop(0, 'rgba(201, 168, 76, 0)');
            gradient.addColorStop(0.5, 'rgba(201, 168, 76, 0.1)');
            gradient.addColorStop(1, 'rgba(201, 168, 76, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, y - 20, w, 40);

            y = (y + 1) % h;
            animId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animId);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />;
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
                    offsetRef.current -= 2;
                    path.setAttribute('stroke-dashoffset', offsetRef.current);
                }
            }
            animId = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <svg ref={svgRef} className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 200" preserveAspectRatio="none">
            <path
                d="M0,100 Q25,50 50,100 Q75,150 100,100 Q125,50 150,100 Q175,150 200,100 Q225,50 250,100 Q275,150 300,100 Q325,50 350,100 Q375,150 400,100"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="2"
                strokeDasharray="20 10"
                strokeDashoffset="0"
            />
            <path
                d="M0,100 Q25,30 50,100 Q75,170 100,100 Q125,30 150,100 Q175,170 200,100 Q225,30 250,100 Q275,170 300,100 Q325,30 350,100 Q375,170 400,100"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="1"
                strokeDasharray="15 15"
                strokeDashoffset="0"
                opacity="0.3"
            />
        </svg>
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
                                card.style.transform = 'translateY(0) scale(1)';
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
        <section ref={sectionRef} className="section-padding bg-obsidian relative">
            <div className="container-custom">
                {/* Section Header */}
                <div className={`mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="font-mono text-xs text-champagne/70 uppercase tracking-widest mb-4 block">
                        {t.protocol.sectionLabel}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-ivory">
                        {t.protocol.sectionTitle}
                    </h2>
                </div>

                {/* Protocol Cards */}
                <div className="space-y-6 md:space-y-8">
                    {t.protocol.steps.map((step, i) => {
                        const AnimComponent = animations[i];
                        return (
                            <div
                                key={i}
                                className="protocol-card transition-all duration-700 ease-out"
                                style={{ opacity: 0, transform: 'translateY(40px) scale(0.98)' }}
                            >
                                <div className="glass-card-light relative overflow-hidden min-h-[280px] md:min-h-[320px]">
                                    {/* Background Animation */}
                                    <div className="absolute inset-0 pointer-events-none">
                                        <AnimComponent />
                                    </div>

                                    {/* Content */}
                                    <div className={`relative z-10 p-8 md:p-12 flex flex-col justify-end h-full min-h-[280px] md:min-h-[320px] ${isRTL ? 'text-right' : 'text-left'}`}>
                                        <span className="font-mono text-champagne text-4xl md:text-6xl font-bold opacity-30 mb-4">
                                            {step.number}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-ivory mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-ivory/50 max-w-xl leading-relaxed text-justify">
                                            {step.description}
                                        </p>
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
