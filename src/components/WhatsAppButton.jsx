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
            className="fixed bottom-10 right-10 z-50 w-16 h-16 bg-surface-0 border-2 border-action flex items-center justify-center shadow-[8px_8px_0px_rgba(var(--arm-red-0),0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300 group"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={28} className="text-action group-hover:scale-110 transition-transform" />
        </a>
    );
}
