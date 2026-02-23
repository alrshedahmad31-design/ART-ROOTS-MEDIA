import Hero from '../components/Hero';
import Features from '../components/Features';
import Philosophy from '../components/Philosophy';
import Protocol from '../components/Protocol';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import useSEO from '../hooks/useSEO';
import { useLanguage } from '../i18n';

export default function Home() {
    const { isRTL } = useLanguage();
    useSEO({
        title: isRTL
            ? 'شركة طباعة ولافتات وهوية تجارية في البحرين | ART ROOTS MEDIA'
            : 'Printing, Signage & Branding Company in Bahrain | ART ROOTS MEDIA',
        description: isRTL
            ? 'أرت روتس ميديا — شريكك الموثوق للإنتاج الإعلاني في البحرين. طباعة، لافتات، هوية تجارية، قص بالليزر، تركيب وصيانة. ضمان ألوان وجودة.'
            : 'ART ROOTS MEDIA — Bahrain\'s trusted production partner for signage, printing, branding, laser/CNC & shopfront installation. In-house workshop. Color-quality guarantee.',
        canonical: 'https://artroots.bh/',
    });

    return (
        <>
            <Hero />
            <Features />
            <Philosophy />
            <Protocol />
            <FAQSection />
            <CTASection />
        </>
    );
}
