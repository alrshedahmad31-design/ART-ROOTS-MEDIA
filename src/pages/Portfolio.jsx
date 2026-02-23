import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n';
import useSEO from '../hooks/useSEO';
import { X, ZoomIn } from 'lucide-react';
import CardStack from '../components/CardStack';

const portfolioItems = [
    {
        id: 1,
        image: '/assets/ourwork/Kahramana1.webp',
        category: 'signage',
        title: 'Kahramana Baghdad',
    },
    {
        id: 2,
        image: '/assets/ourwork/2023-03-26.webp',
        category: 'branding',
        title: 'Dynamic Branding',
    },
    {
        id: 3,
        image: '/assets/ourwork/2026-01-17.webp',
        category: 'signage',
        title: 'Exterior Signage',
    },
    {
        id: 4,
        image: '/assets/ourwork/2020-08-15.webp',
        category: 'printing',
        title: 'Event Print Solutions',
    },
    {
        id: 5,
        image: '/assets/ourwork/kahramana.webp',
        category: 'signage',
        title: 'Façade Design',
    },
    {
        id: 6,
        image: '/assets/ourwork/Nuqtah.webp',
        category: 'branding',
        title: 'Nuqtah Identity',
    },
    {
        id: 7,
        image: '/assets/ourwork/media.webp',
        category: 'printing',
        title: 'Marketing Media',
    },
    {
        id: 8,
        image: '/assets/ourwork/lap.webp',
        category: 'laser',
        title: 'CNC Laser Work',
    },
    {
        id: 9,
        image: '/assets/ourwork/Kahramana5.webp',
        category: 'signage',
        title: 'Illuminated 3D Letters',
    },
];

const categoryLabels = {
    en: { all: 'All', signage: 'Signage', branding: 'Branding', printing: 'Printing', laser: 'Laser & CNC' },
    ar: { all: 'الكل', signage: 'اللافتات', branding: 'الهوية', printing: 'الطباعة', laser: 'الليزر و CNC' },
};

export default function Portfolio() {
    const { t, lang, isRTL } = useLanguage();
    const [activeFilter, setActiveFilter] = useState('all');
    const [lightbox, setLightbox] = useState(null);

    useSEO({
        title: isRTL
            ? 'معرض أعمالنا — أرت روتس ميديا | مشاريع الطباعة واللافتات في البحرين'
            : 'Our Portfolio — ART ROOTS MEDIA | Signage & Printing Projects in Bahrain',
        description: isRTL
            ? 'شاهد مشاريعنا السابقة في البحرين: لافتات محلات، هوية تجارية، طباعة واجهات، وقص ليزر. جودة إنتاج تتحدث عن نفسها.'
            : 'Explore our latest signage, branding, and printing projects across Bahrain. From shopfronts to corporate identities, see our production quality.',
        canonical: 'https://artroots.bh/portfolio',
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const labels = categoryLabels[lang] || categoryLabels.en;

    // Map portfolio items to include translated category labels for the CardStack
    const filtered = (activeFilter === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeFilter)
    ).map(item => ({
        ...item,
        categoryLabel: labels[item.category]
    }));

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/assets/hero/hero_portfolio.webp" alt="Portfolio of signage, printing, and branding projects in Bahrain — ART ROOTS MEDIA" className="w-full h-full object-cover" />
                    <div className="gradient-hero absolute inset-0" />
                    <div className="absolute inset-0 bg-obsidian/50" />
                </div>
                <div className="container-custom relative z-10 text-center">
                    <span className="font-mono text-xs text-champagne/70 uppercase tracking-widest mb-4 block">
                        {isRTL ? 'معرض الأعمال' : 'Gallery'}
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-ivory mb-4">
                        {t.portfolio.heroTitle}
                    </h1>
                    <p className="text-lg md:text-xl text-ivory/50 max-w-xl mx-auto">
                        {t.portfolio.heroSubtitle}
                    </p>
                </div>
            </section>

            {/* Filter Bar */}
            <section className="bg-obsidian pb-8 border-b border-white/5">
                <div className="container-custom">
                    <div className="flex flex-wrap justify-center gap-3">
                        {Object.entries(labels).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setActiveFilter(key)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeFilter === key
                                        ? 'bg-champagne text-obsidian shadow-lg shadow-champagne/20'
                                        : 'bg-slate/30 text-ivory/50 border border-ivory/10 hover:border-champagne/30 hover:text-champagne'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Stack Section */}
            <section className="section-padding bg-obsidian py-20 overflow-hidden">
                <div className="container-custom">
                    <CardStack
                        items={filtered}
                        isRTL={isRTL}
                        onCardClick={(img) => setLightbox(img)}
                    />
                </div>
            </section>

            {/* Lightbox */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-[100] bg-obsidian/95 backdrop-blur-2xl flex items-center justify-center p-4"
                    onClick={() => setLightbox(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-ivory/60 hover:text-ivory transition-colors"
                        onClick={() => setLightbox(null)}
                    >
                        <X size={28} />
                    </button>
                    <img
                        src={lightbox}
                        alt="Project detail"
                        className="max-w-full max-h-[85vh] object-contain rounded-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}
