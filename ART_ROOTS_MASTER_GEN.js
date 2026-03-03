
import fs from 'fs';
import path from 'path';

const projectStructure = {
    'package.json': `{
  "name": "art-roots-media",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^12.34.3",
    "gsap": "^3.12.5",
    "lucide-react": "^0.469.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.1.1",
    "three": "^0.183.1"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.5"
  }
}`,
    'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'off-white': '#F5F3EE',
                'sand': '#E8E4DD',
                'onyx': '#111111',
                'signal-red': '#E63B2E',
                obsidian: '#111111',
                champagne: '#E63B2E',
                ivory: '#F5F3EE',
            },
            fontFamily: {
                sans: ['Space Grotesk', 'Cairo', 'sans-serif'],
                heading: ['Space Grotesk', 'Cairo', 'sans-serif'],
                mono: ['Space Mono', 'Cairo', 'monospace'],
                serif: ['DM Serif Display', 'Cairo', 'serif'],
                arabic: ['Cairo', 'sans-serif'],
            },
            borderRadius: {
                'none': '0',
                'sm': '0.125rem',
                'md': '0.375rem',
                'lg': '0.5rem',
                'xl': '0.75rem',
                '2xl': '1rem',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
}`,
    'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --off-white: #F5F3EE;
  --sand: #E8E4DD;
  --onyx: #111111;
  --signal-red: #E63B2E;
}

[dir="rtl"], [dir="rtl"] * {
  font-family: 'Cairo', 'Space Grotesk', sans-serif;
}

[dir="rtl"] .font-heading, [dir="rtl"] .font-space {
  font-family: 'Cairo', 'Space Grotesk', sans-serif !important;
}

.noise-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 9999; opacity: 0.12;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
}

.btn-magnetic {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  border-radius: 0;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  cursor: pointer;
  border: 1px solid var(--onyx);
}

.btn-primary { background: var(--signal-red); color: white; border: none; }
.btn-primary:hover { transform: translate(-4px, -4px); box-shadow: 8px 8px 0px var(--onyx); }
`,
    'src/components/MobileNav.jsx': `import { useLanguage } from '../i18n';
import { useLocation } from 'react-router-dom';
import { Home, Briefcase, Layout, Globe, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MobileNav() {
    const { t, isRTL } = useLanguage();
    const location = useLocation();

    const navItems = [
        { to: '/', label: t.nav.home, icon: Home },
        { to: '/about', label: t.nav.about, icon: Briefcase },
        { to: '/services', label: t.nav.services, icon: Layout },
        { to: '/portfolio', label: t.nav.portfolio, icon: Globe },
        { to: '/contact', label: t.nav.contact, icon: MessageCircle },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:hidden w-[calc(100%-2.5rem)] max-w-sm">
            <div className="bg-[#111111]/95 backdrop-blur-xl border border-white/10 h-[64px] rounded-[32px] flex items-center justify-around px-2 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.to;
                    const Icon = item.icon;
                    return (
                        <Link key={item.to} to={item.to} className="flex flex-col items-center justify-center transition-all duration-300">
                            <Icon size={20} className={isActive ? 'text-signal-red' : 'text-off-white/40'} />
                            <span className={\`text-[10px] uppercase font-bold mt-1 \${isActive ? 'text-signal-red' : 'text-off-white/40'}\`}>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}`,
    'src/components/FAQSection.jsx': `import { useLanguage } from '../i18n';
import { ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqData = {
    en: [
        { q: 'What printing and signage services does ART ROOTS MEDIA offer in Bahrain?', a: 'ART ROOTS MEDIA offers large-format printing, signage, branding, and laser work in Bahrain.' },
        { q: 'Where is ART ROOTS MEDIA located?', a: 'Our workshop is in Abu Sayba, Bahrain.' },
        { q: 'How quickly can I get a quote?', a: 'Within 30 minutes via WhatsApp.' }
    ],
    ar: [
        { q: 'ما هي خدمات الطباعة التي تقدمونها؟', a: 'نقدم خدمات طباعة، لافتات، هوية صرية، وقص ليزر في البحرين.' },
        { q: 'أين تقع ورشتكم؟', a: 'تقع في أبو صيبع، البحرين.' },
        { q: 'متى نحصل على السعر؟', a: 'خلال 30 دقيقة عبر واتساب.' }
    ]
};

export default function FAQSection({
    condensed = false,
    label,
    title,
    subtitle,
    bgClass = '',
    isDark = false
}) {
    const { t, isRTL } = useLanguage();
    const lang = isRTL ? 'ar' : 'en';
    const faqs = condensed ? faqData[lang].slice(0, 3) : faqData[lang];
    const [openIndex, setOpenIndex] = useState(null);

    const activeLabel = label || t.faq.label;
    const activeTitle = title || t.faq.title;
    const activeSubtitle = subtitle || t.faq.subtitle;

    const defaultBg = condensed ? 'bg-off-white' : 'bg-sand/10';
    const finalBg = bgClass || defaultBg;

    return (
        <section
            className={\`py-24 md:py-32 \${finalBg} \${isDark ? 'text-ivory' : 'text-onyx'}\`}
            aria-label={isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
        >
            <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className={\`mb-20 \${isRTL ? 'text-right' : 'text-left'}\`}>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-[2px] bg-signal-red" />
                            <span className={\`font-mono text-xs font-bold uppercase tracking-[0.4em] \${isDark ? 'text-ivory/40' : 'text-onyx/40'}\`}>
                                {activeLabel}
                            </span>
                        </div>
                        <h2 className={\`text-4xl md:text-6xl font-heading font-black mb-8 uppercase tracking-tighter \${isDark ? 'text-ivory' : 'text-onyx'}\`}>
                            {activeTitle}
                        </h2>
                        <p className={\`text-lg leading-relaxed max-w-2xl font-space \${isDark ? 'text-ivory/60' : 'text-onyx/60'}\`}>
                            {activeSubtitle}
                        </p>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                itemScope
                                itemProp="mainEntity"
                                itemType="https://schema.org/Question"
                                className={\`border-2 transition-all duration-300 \${openIndex === i
                                        ? 'border-signal-red bg-onyx text-off-white'
                                        : isDark
                                            ? 'border-ivory/10 bg-ivory/5 text-ivory hover:border-ivory/30'
                                            : 'border-onyx/10 bg-sand/20 text-onyx hover:border-onyx/30'
                                    }\`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className={\`w-full flex items-center justify-between p-8 gap-6 text-\${isRTL ? 'right' : 'left'} transition-colors\`}
                                    aria-expanded={openIndex === i}
                                >
                                    <h3
                                        itemProp="name"
                                        className="font-heading font-bold text-lg md:text-xl leading-tight flex-1 uppercase tracking-tight"
                                    >
                                        {faq.q}
                                    </h3>
                                    <div className={\`shrink-0 w-8 h-8 border-2 flex items-center justify-center transition-all duration-300 \${openIndex === i
                                            ? 'border-signal-red bg-signal-red text-onyx rotate-180'
                                            : isDark
                                                ? 'border-ivory/20 text-ivory'
                                                : 'border-onyx/20 text-onyx'
                                        }\`}>
                                        <ChevronDown size={20} />
                                    </div>
                                </button>

                                <div
                                    className={\`transition-all duration-500 overflow-hidden \${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}\`}
                                    itemScope
                                    itemProp="acceptedAnswer"
                                    itemType="https://schema.org/Answer"
                                >
                                    <div className="px-8 pb-8">
                                        <div className="w-full h-px bg-current opacity-10 mb-6" />
                                        <p
                                            itemProp="text"
                                            className="text-base md:text-lg leading-relaxed font-space opacity-80"
                                        >
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Show More Link for Condensed View */}
                    {condensed && (
                        <div className={\`mt-12 \${isRTL ? 'text-right' : 'text-left'}\`}>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 text-signal-red font-heading font-black uppercase tracking-widest hover:translate-x-2 transition-transform duration-300"
                            >
                                {t.faq.viewAll}
                                {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}`,
    'src/pages/Home.jsx': `import FAQSection from '../components/FAQSection';
export default function Home() {
    return (
        <>
            {/* Other sections... */}
            <FAQSection condensed={true} />
        </>
    );
}`,
    'src/pages/Contact.jsx': `import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n';
import useSEO from '../hooks/useSEO';
import { MessageCircle, Mail, MapPin, Phone, Send, ExternalLink, Clock } from 'lucide-react';
import FAQSection from '../components/FAQSection';

export default function Contact() {
    const { t, isRTL } = useLanguage();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <>
            {/* Hero, Form, Info... */}
            <FAQSection bgClass="bg-obsidian" isDark={true} />
            {/* Map... */}
        </>
    );
}`,
    'index.html': `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ART ROOTS MEDIA | Printing & Signage Bahrain</title>
  <link rel="canonical" href="https://artrootsmedia.com/" />
</head>
<body>
  <div id="root"></div>
  <div class="noise-overlay"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`,
    'public/robots.txt': `User-agent: *
Allow: /
Sitemap: https://artrootsmedia.com/sitemap.xml`,
    'DESIGN_SYSTEM.md': `# ART ROOTS DESIGN SYSTEM
Aesthetic: Brutalist Cinematic
Domain: artrootsmedia.com
Colors: Onyx #111111, Signal Red #E63B2E, Off-White #F5F3EE`
};

async function build() {
    console.log("🚀 Generating ART ROOTS MEDIA (Brutalist Cinematic) Project...");
    for (const [file, content] of Object.entries(projectStructure)) {
        const dir = path.dirname(file);
        if (dir !== '.') fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(file, content);
        console.log(`✅ Created: ${file}`);
    }
    console.log("\\n✨ Done! Run 'npm run dev' to start the cinematic experience.");
}

build();
