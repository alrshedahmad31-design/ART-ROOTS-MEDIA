import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function WhatsAppButton() {
    const { t } = useLanguage();
    const message = encodeURIComponent(t.whatsappMessages.floating);

    return (
        <a
            href={`https://wa.me/${t.contact.whatsappLink}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-300"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={26} className="text-white" />
        </a>
    );
}
