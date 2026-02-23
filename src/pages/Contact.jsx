import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n';
import useSEO from '../hooks/useSEO';
import { MessageCircle, Mail, MapPin, Phone, Send, ExternalLink, Clock } from 'lucide-react';


export default function Contact() {
    const { t, isRTL } = useLanguage();
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', service: '', message: ''
    });

    useSEO({
        title: isRTL
            ? 'تواصل معنا — أرت روتس ميديا | طلب عرض سعر في البحرين'
            : 'Contact ART ROOTS MEDIA — Request a Quote in Bahrain',
        description: isRTL
            ? 'تواصل مع أرت روتس ميديا في أبو صيبع، البحرين. احصل على عرض سعر مخصص للطباعة واللافتات والهوية التجارية. واتساب: +٧٧٣ ٣٣٤٠ ٤٠٥٠. متوسط الرد: أقل من ٣٠ دقيقة.'
            : 'Contact ART ROOTS MEDIA in Abu Sayba, Bahrain. Get a custom quote for printing, signage, or branding. WhatsApp: +973 3340 4050. Average response: under 30 minutes.',
        canonical: 'https://artroots.bh/contact',
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AService: ${formData.service}%0AMessage: ${formData.message}`;
        window.open(`https://wa.me/${t.contact.whatsappLink}?text=${text}`, '_blank');
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/assets/hero/hero_contact.webp" alt="Contact ART ROOTS MEDIA in Abu Sayba, Bahrain — Request a quote for printing, signage, or branding" className="w-full h-full object-cover" />
                    <div className="gradient-hero absolute inset-0" />
                    <div className="absolute inset-0 bg-obsidian/50" />
                </div>
                <div className="container-custom relative z-10">
                    <span className="font-mono text-xs text-champagne/70 uppercase tracking-widest mb-4 block">
                        {isRTL ? 'نحن هنا' : 'Reach Out'}
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-ivory mb-4">
                        {t.contact.heroTitle}
                    </h1>
                    <p className="text-lg md:text-xl text-ivory/50 max-w-xl font-drama italic text-justify">
                        {t.contact.heroSubtitle}
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section-padding bg-obsidian">
                <div className="container-custom">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16`}>

                        {/* Contact Info Side */}
                        <div>
                            <h2 className={`text-2xl md:text-3xl font-heading font-bold text-ivory mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {isRTL ? 'معلومات التواصل' : 'Contact Information'}
                            </h2>

                            <div className="space-y-6">
                                {/* WhatsApp */}
                                <a
                                    href={`https://wa.me/${t.contact.whatsappLink}?text=${encodeURIComponent(t.whatsappMessages.contactPage)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-card-light p-6 flex items-center gap-4 hover:border-[#25D366]/30 transition-all duration-300 group block"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                                        <MessageCircle size={22} className="text-[#25D366]" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-semibold text-ivory text-sm mb-1">{t.contact.whatsapp}</h3>
                                        <p className="font-mono text-sm text-ivory/50 group-hover:text-[#25D366] transition-colors" dir="ltr">
                                            {t.contact.whatsappNumber}
                                        </p>
                                    </div>
                                </a>

                                {/* Phone */}
                                <a
                                    href={`tel:${t.contact.phoneRaw}`}
                                    className="glass-card-light p-6 flex items-center gap-4 hover:border-champagne/30 transition-all duration-300 group block"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-champagne/10 flex items-center justify-center shrink-0">
                                        <Phone size={22} className="text-champagne" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-semibold text-ivory text-sm mb-1">{t.contact.phone}</h3>
                                        <p className="font-mono text-sm text-ivory/50 group-hover:text-champagne transition-colors" dir="ltr">
                                            {t.contact.phoneNumber}
                                        </p>
                                    </div>
                                </a>

                                {/* Email */}
                                <a
                                    href="mailto:azzambh78@gmail.com"
                                    className="glass-card-light p-6 flex items-center gap-4 hover:border-champagne/30 transition-all duration-300 group block"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-champagne/10 flex items-center justify-center shrink-0">
                                        <Mail size={22} className="text-champagne" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-semibold text-ivory text-sm mb-1">{t.contact.email}</h3>
                                        <p className="font-mono text-sm text-ivory/50 group-hover:text-champagne transition-colors">
                                            {t.contact.emailAddress}
                                        </p>
                                    </div>
                                </a>

                                {/* Address + Map */}
                                <a
                                    href={t.contact.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-card-light p-6 flex items-start gap-4 hover:border-champagne/30 transition-all duration-300 group block"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-champagne/10 flex items-center justify-center shrink-0">
                                        <MapPin size={22} className="text-champagne" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-semibold text-ivory text-sm mb-1">{t.contact.address}</h3>
                                        <p className="text-sm text-ivory/50 leading-relaxed mb-2 text-justify">
                                            {t.contact.addressFull}
                                        </p>
                                        <span className="inline-flex items-center gap-1 text-xs text-champagne font-medium group-hover:underline">
                                            <ExternalLink size={12} />
                                            {t.contact.viewMap}
                                        </span>
                                    </div>
                                </a>

                                {/* Working Hours */}
                                <div className="glass-card-light p-6 flex items-start gap-4 border border-ivory/5">
                                    <div className="w-12 h-12 rounded-2xl bg-champagne/10 flex items-center justify-center shrink-0">
                                        <Clock size={22} className="text-champagne" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-semibold text-ivory text-sm mb-1">{t.contact.hours}</h3>
                                        <div className="space-y-1">
                                            <p className="text-sm text-ivory/50 leading-relaxed">
                                                {t.contact.hoursDays}: <span className="text-champagne font-medium whitespace-nowrap">{t.contact.hoursTime}</span>
                                            </p>
                                            <p className="text-xs text-ivory/30">
                                                {t.contact.closedDays}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div>
                            <h2 className={`text-2xl md:text-3xl font-heading font-bold text-ivory mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t.contact.formTitle}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-ivory/50 mb-2">{t.contact.formName}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate/20 border border-ivory/10 rounded-2xl px-5 py-3.5 text-ivory text-sm placeholder:text-ivory/20 focus:outline-none focus:border-champagne/40 transition-colors"
                                        placeholder={t.contact.formName}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-ivory/50 mb-2">{t.contact.formEmail}</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate/20 border border-ivory/10 rounded-2xl px-5 py-3.5 text-ivory text-sm placeholder:text-ivory/20 focus:outline-none focus:border-champagne/40 transition-colors"
                                            placeholder={t.contact.formEmail}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-ivory/50 mb-2">{t.contact.formPhone}</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-slate/20 border border-ivory/10 rounded-2xl px-5 py-3.5 text-ivory text-sm placeholder:text-ivory/20 focus:outline-none focus:border-champagne/40 transition-colors"
                                            placeholder={t.contact.formPhone}
                                            dir="ltr"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-ivory/50 mb-2">{t.contact.formService}</label>
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate/20 border border-ivory/10 rounded-2xl px-5 py-3.5 text-ivory text-sm focus:outline-none focus:border-champagne/40 transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-obsidian">{t.contact.formService}</option>
                                        {t.contact.formServiceOptions.map((opt, i) => (
                                            <option key={i} value={opt} className="bg-obsidian">{opt}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-ivory/50 mb-2">{t.contact.formMessage}</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full bg-slate/20 border border-ivory/10 rounded-2xl px-5 py-3.5 text-ivory text-sm placeholder:text-ivory/20 focus:outline-none focus:border-champagne/40 transition-colors resize-none"
                                        placeholder={t.contact.formMessage}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn-magnetic btn-primary w-full text-base py-4"
                                >
                                    <Send size={18} />
                                    {t.contact.formSubmit}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Full-width Map */}
            <section className="relative h-[450px] md:h-[600px] w-full border-t border-ivory/10 shadow-2xl">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d223.70647688805872!2d50.5013066!3d26.2193221!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49bb42652f6ae5%3A0xf0732973a53ed81f!2z2YXZitiv2YrYpyDYs9iq2YjYsSBtZWRpYSBzdG9yZQ!5e0!3m2!1sar!2sbh!4v1771807101665!5m2!1sar!2sbh"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.9) hue-rotate(180deg)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full transition-all duration-1000 ease-in-out hover:filter-none hover:scale-[1.01]"
                    title="ART ROOTS MEDIA Location"
                ></iframe>

                {/* Floating location tag */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none">
                    <div className="glass-card-light px-6 py-3 rounded-full border border-champagne/30 backdrop-blur-md animate-bounce-subtle">
                        <span className="text-xs font-mono text-champagne tracking-widest uppercase flex items-center gap-2">
                            <MapPin size={14} />
                            {isRTL ? 'موقعنا في أبو صيبع' : 'Visit our Workshop'}
                        </span>
                    </div>
                </div>
            </section>
        </>
    );
}
