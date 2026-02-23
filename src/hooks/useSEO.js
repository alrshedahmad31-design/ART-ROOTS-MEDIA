/**
 * useSEO — Dynamic per-page title, description, and canonical tag updater
 * Usage: call useSEO({ title, description, canonical }) at the top of each page component.
 */
import { useEffect } from 'react';

export default function useSEO({ title, description, canonical }) {
    useEffect(() => {
        // Update <title>
        if (title) document.title = title;

        // Update or create <meta name="description">
        if (description) {
            let meta = document.querySelector('meta[name="description"]');
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute('name', 'description');
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', description);
        }

        // Update or create <link rel="canonical">
        if (canonical) {
            let link = document.querySelector('link[rel="canonical"]');
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', 'canonical');
                document.head.appendChild(link);
            }
            link.setAttribute('href', canonical);
        }

        // Update og:title and og:description
        if (title) {
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute('content', title);
        }
        if (description) {
            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) ogDesc.setAttribute('content', description);
        }
    }, [title, description, canonical]);
}
