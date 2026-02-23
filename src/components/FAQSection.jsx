import { useLanguage } from '../i18n';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

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

export default function FAQSection() {
    const { isRTL } = useLanguage();
    const lang = isRTL ? 'ar' : 'en';
    const faqs = faqData[lang];
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="section-padding bg-obsidian" aria-label={isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}>
            <div className="container-custom">
                <div className="max-w-3xl mx-auto">
                    {/* Section Header */}
                    <div className={`mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <span className="font-mono text-xs text-champagne/70 uppercase tracking-widest mb-3 block">
                            {isRTL ? 'الأسئلة الشائعة' : 'FAQ'}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory mb-4">
                            {isRTL
                                ? 'أسئلة يطرحها عملاؤنا'
                                : 'Frequently Asked Questions'}
                        </h2>
                        <p className="text-ivory/50 text-base leading-relaxed">
                            {isRTL
                                ? 'إجابات مباشرة على أكثر ما يُستفسَر عنه حول خدماتنا في البحرين.'
                                : 'Quick answers about our services, location, and production process in Bahrain.'}
                        </p>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                itemScope
                                itemProp="mainEntity"
                                itemType="https://schema.org/Question"
                                className="glass-card-light rounded-2xl overflow-hidden border border-ivory/5"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className={`w-full flex items-center justify-between p-6 gap-4 text-${isRTL ? 'right' : 'left'} hover:bg-ivory/5 transition-colors`}
                                    aria-expanded={openIndex === i}
                                >
                                    <h3
                                        itemProp="name"
                                        className="text-ivory font-semibold text-base leading-snug flex-1"
                                    >
                                        {faq.q}
                                    </h3>
                                    <ChevronDown
                                        size={20}
                                        className={`text-champagne flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                <div
                                    className={`transition-all duration-500 overflow-hidden ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                    itemScope
                                    itemProp="acceptedAnswer"
                                    itemType="https://schema.org/Answer"
                                >
                                    <p
                                        itemProp="text"
                                        className={`px-6 pb-6 text-ivory/60 text-sm leading-relaxed ${isRTL ? 'text-right' : 'text-left'} text-justify`}
                                    >
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
