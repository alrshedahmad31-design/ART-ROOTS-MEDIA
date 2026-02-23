import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';
import { ArrowRight, ArrowLeft, Play } from 'lucide-react';
import ShaderBackground from './ShaderBackground';

export default function Hero() {
    const { t, isRTL } = useLanguage();

    // Animation variants for staggered reveal
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.4,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1], // Custom cinematic easing
            },
        },
    };

    const logoVariants = {
        hidden: { opacity: 0, scale: 0.8, filter: 'blur(20px)' },
        visible: {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <section className="relative w-full min-h-[100dvh] flex items-end overflow-hidden">
            {/* WebGL Shader Background */}
            <div className="absolute inset-0">
                <ShaderBackground />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                <div className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-obsidian/50 to-transparent`} />
            </div>

            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={`relative z-10 w-full container-custom pb-20 md:pb-28 pt-32 ${isRTL ? 'text-right' : 'text-left'}`}
            >
                <div className="max-w-4xl">
                    {/* Brand Identity Group */}
                    <div className="mb-8 md:mb-10">
                        {/* Centered/Aligned Logo with soft glow */}
                        <motion.div variants={logoVariants} className="mb-6 relative inline-block group">
                            <div className="absolute -inset-4 bg-champagne/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <img
                                src="/assets/logo/Logoo.webp"
                                alt="ART ROOTS MEDIA"
                                className="h-16 md:h-24 w-auto relative z-10 drop-shadow-[0_0_20px_rgba(201,168,76,0.2)]"
                            />
                        </motion.div>

                        {/* Label */}
                        <motion.div variants={itemVariants}>
                            <span className="inline-flex items-center gap-2 font-mono text-xs md:text-sm text-champagne/80 tracking-widest uppercase">
                                <span className="w-8 h-[1px] bg-champagne/50 inline-block" />
                                ART ROOTS MEDIA
                            </span>
                        </motion.div>
                    </div>

                    {/* Headline */}
                    <motion.h1 variants={itemVariants} className="mb-4 md:mb-6">
                        <span className="block text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-ivory leading-[1.1] tracking-tight">
                            {t.hero.line1}
                        </span>
                        <span className="block text-5xl md:text-7xl lg:text-[5.5rem] font-drama italic text-champagne leading-[1.1] mt-2">
                            {t.hero.line2}
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p variants={itemVariants} className="text-ivory/50 text-sm md:text-base lg:text-lg max-w-xl leading-relaxed mb-8 md:mb-10 text-justify whitespace-pre-line">
                        {t.hero.subtitle}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
                        <a
                            href={`https://wa.me/${t.contact.whatsappLink}?text=${encodeURIComponent(t.whatsappMessages.hero)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-magnetic btn-primary text-sm md:text-base px-6 md:px-8 py-3 md:py-4"
                        >
                            {t.hero.cta}
                            {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                        </a>
                        <a
                            href="/portfolio"
                            className="btn-magnetic btn-secondary text-sm md:text-base px-6 md:px-8 py-3 md:py-4"
                        >
                            <Play size={16} />
                            {t.hero.ctaSecondary}
                        </a>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <div className="w-[1px] h-12 bg-gradient-to-b from-champagne/50 to-transparent animate-pulse" />
                </motion.div>
            </motion.div>
        </section>
    );
}
