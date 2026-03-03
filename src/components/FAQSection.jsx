import { useLanguage } from '../i18n';
import { ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqData = {
    en: [
        {
            q: 'What printing and signage services does ART ROOTS MEDIA offer in Bahrain?',
            a: 'ART ROOTS MEDIA offers large-format printing, vinyl stickers, custom signage and shopfront fabrication, brand identity design, laser and CNC cutting on acrylic, wood, and metal, illuminated channel-letter signs, and premium corporate gifts — all produced from an in-house workshop in Abu Sayba, Bahrain.',
        },
        {
            q: 'Does ART ROOTS MEDIA offer shopfront installation in Bahrain?',
            a: 'Yes. We fabricate and install complete shopfront solutions across Bahrain — including 3D signage, illuminated signs, window graphics, and wayfinding systems. Every installation includes a site survey and structural warranty, handled entirely by our in-house crew.',
        },
        {
            q: 'Where is ART ROOTS MEDIA located and what areas do you serve?',
            a: 'Our workshop is located in Abu Sayba, Bahrain. We serve businesses throughout the Kingdom of Bahrain, including Manama, Riffa, Muharraq, Isa Town, and Hamad Town.',
        },
        {
            q: 'How quickly can I get a custom quote?',
            a: 'We typically respond to quote requests via WhatsApp within 30 minutes during working hours (Sunday to Thursday, 9 AM–5 PM). Contact us at +973 3340 4050.',
        },
        {
            q: 'Does ART ROOTS MEDIA offer website design services in Bahrain?',
            a: 'Yes. ART ROOTS MEDIA provides professional website design and development for businesses in Bahrain. We build mobile-first, fast-loading corporate websites, landing pages, and e-commerce storefronts — all optimized for search engines and designed to reflect your brand identity.',
        },
    ],
    ar: [
        {
            q: 'ما هي خدمات الطباعة واللافتات التي يقدّمها أرت روتس ميديا في البحرين؟',
            a: 'تقدّم أرت روتس ميديا طباعة كبيرة الحجم، ستيكرات فينيل، تصميم وتصنيع لافتات وواجهات محلات، هوية تجارية، قص ليزر وCNC على الأكريليك والخشب والمعدن، لافتات مضيئة، وهدايا دعائية راقية — كل ذلك من ورشتنا الداخلية في أبو صيبع، البحرين.',
        },
        {
            q: 'هل تقدّم أرت روتس ميديا خدمة تركيب واجهات المحلات في البحرين؟',
            a: 'نعم. نقوم بتصنيع وتركيب واجهات المحلات والشركات في كامل البحرين — تشمل اللافتات ثلاثية الأبعاد، الإضاءة، رسومات الزجاج، وأنظمة الإرشاد. كل تركيب يتضمن معاينة ميدانية وضمانًا هيكليًا.',
        },
        {
            q: 'أين تقع أرت روتس ميديا وما المناطق التي تغطّيها؟',
            a: 'تقع ورشتنا في أبو صيبع، البحرين. نخدم الشركات في جميع أنحاء مملكة البحرين بما تشمل المنامة، الرفاع، المحرق، مدينة عيسى، ومدينة حمد.',
        },
        {
            q: 'ما متوسط وقت الردّ على طلبات عروض الأسعار؟',
            a: 'نردّ عبر الواتساب في أقل من ٣٠ دقيقة خلال أوقات الدوام (الأحد – الخميس، ٩ صباحًا – ٥ مساءً). تواصل معنا على: 3340 4050 (البحرين).',
        },
        {
            q: 'ما الذي يميّز أرت روتس ميديا عن شركات الطباعة الأخرى في البحرين؟',
            a: 'خلافًا لمعظم شركات الإعلان التي تُسنِد الإنتاج للخارج، نمتلك ورشتنا الداخلية بالكامل. هذا يمنحنا رقابة مباشرة على الجودة، تسليمًا أسرع، وضمانًا رسميًا لدقة الألوان — بما فيه مطابقة PANTONE وقصًا بالليزر بتفاوت ٠.٠٢ ملم.',
        },
        {
            q: 'هل تصمّم أرت روتس ميديا مواقع إلكترونية في البحرين؟',
            a: 'نعم. نقدّم خدمات تصميم وتطوير مواقع إلكترونية احترافية للشركات في البحرين. نبني مواقع مؤسسية وصفحات هبوط ومتاجر إلكترونية — متجاوبة مع الجوال، سريعة، ومحسّنة لمحركات البحث، لتعكس هويّتك التجارية بشكل كامل.',
        },
    ],
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

    const defaultBg = condensed ? 'bg-surface-1/20' : 'bg-surface-0/50';
    const finalBg = bgClass || defaultBg;

    return (
        <section
            className={`py-24 md:py-32 ${finalBg} text-text-1`}
            aria-label={isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
        >
            <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className={`mb-20 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-[2px] bg-action" />
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.4em] text-text-2/80">
                                {activeLabel}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-sans font-black mb-8 uppercase tracking-tighter text-text-1">
                            {activeTitle}
                        </h2>
                        <p className="text-lg leading-relaxed max-w-2xl font-sans text-text-1/80">
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
                                className={`border-2 transition-all duration-300 ${openIndex === i
                                    ? 'border-action bg-surface-1 text-text-1'
                                    : 'border-divider/10 bg-surface-1/20 text-text-2/90 hover:border-action/30 hover:text-text-1'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className={`w-full flex items-center justify-between p-8 gap-6 text-${isRTL ? 'right' : 'left'} transition-colors`}
                                    aria-expanded={openIndex === i}
                                >
                                    <h3
                                        itemProp="name"
                                        className="font-heading font-bold text-lg md:text-xl leading-tight flex-1 uppercase tracking-tight"
                                    >
                                        {faq.q}
                                    </h3>
                                    <div className={`shrink-0 w-8 h-8 border-2 flex items-center justify-center transition-all duration-300 ${openIndex === i
                                        ? 'border-action bg-action text-surface-0 rotate-180'
                                        : 'border-divider/20 text-text-2/80'
                                        }`}>
                                        <ChevronDown size={20} />
                                    </div>
                                </button>

                                <div
                                    className={`transition-all duration-500 overflow-hidden ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
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
                        <div className={`mt-12 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 text-action font-sans font-black uppercase tracking-widest hover:translate-x-2 transition-transform duration-300"
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
}
