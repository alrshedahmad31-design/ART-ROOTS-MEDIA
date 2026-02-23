import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ZoomIn, MapPin } from "lucide-react";

/**
 * CardStack component specifically adapted for ART ROOTS MEDIA Portfolio
 * - 3D fan-out animation
 * - Drag/Swipe support
 * - RTL awareness
 */
export function CardStack({
    items,
    initialIndex = 0,
    maxVisible = 5,
    cardWidth = 520,
    cardHeight = 350,
    overlap = 0.5,
    spreadDeg = 40,
    perspectivePx = 1000,
    depthPx = 120,
    tiltXDeg = 10,
    activeLiftPx = 20,
    activeScale = 1.05,
    inactiveScale = 0.9,
    springStiffness = 300,
    springDamping = 30,
    isRTL = false,
    onCardClick,
    className
}) {
    const reduceMotion = useReducedMotion();
    const len = items.length;
    const [active, setActive] = React.useState(initialIndex);

    // Sync with items length changes (e.g. after filtering)
    React.useEffect(() => {
        if (active >= len) setActive(0);
    }, [len, active]);

    const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
    const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
    const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

    const wrapIndex = (n) => ((n % len) + len) % len;

    const next = React.useCallback(() => {
        setActive((prev) => wrapIndex(prev + 1));
    }, [len]);

    const prev = React.useCallback(() => {
        setActive((prev) => wrapIndex(prev - 1));
    }, [len]);

    // Helper to calculate signed offset considering wrap/loop
    function signedOffset(i, activeIdx, length) {
        let raw = i - activeIdx;
        if (length <= 1) return raw;
        // Find shortest path in circular buffer
        const alt = raw > 0 ? raw - length : raw + length;
        return Math.abs(alt) < Math.abs(raw) ? alt : raw;
    }

    if (!len) return (
        <div className="flex items-center justify-center p-20 text-ivory/30 italic">
            {isRTL ? "لا توجد أعمال في هذا القسم" : "No items found in this category"}
        </div>
    );

    return (
        <div className={`w-full relative ${className || ""}`} style={{ perspective: `${perspectivePx}px` }}>
            <div
                className="relative mx-auto flex items-end justify-center overflow-visible"
                style={{
                    width: '100%',
                    maxWidth: `${cardWidth + (maxOffset * 40)}px`,
                    height: `${cardHeight + 60}px`
                }}
            >
                <AnimatePresence initial={false}>
                    {items.map((item, i) => {
                        const off = signedOffset(i, active, len);
                        const abs = Math.abs(off);

                        // Only render visible cards in the stack
                        if (abs > maxOffset) return null;

                        // Calculate 3D transforms
                        // In RTL, we flip the X offset and Z rotation
                        const flip = isRTL ? -1 : 1;
                        const rotateZ = off * stepDeg * flip;
                        const x = off * cardSpacing * flip;
                        const y = abs * 8; // Slight downward arc
                        const z = -abs * depthPx;

                        const isActive = i === active;
                        const scale = isActive ? activeScale : inactiveScale;
                        const lift = isActive ? -activeLiftPx : 0;
                        const rotateX = isActive ? 0 : tiltXDeg;

                        return (
                            <motion.div
                                key={item.id || i}
                                className={`absolute bottom-0 rounded-[32px] overflow-hidden shadow-2xl transition-shadow duration-500 ${isActive ? "shadow-champagne/10 z-50 cursor-grab active:cursor-grabbing border-2 border-champagne/20" : "z-10 border border-white/5"
                                    }`}
                                style={{
                                    width: '100%',
                                    maxWidth: `${cardWidth}px`,
                                    height: `${cardHeight}px`,
                                    background: '#0D0D11', // Obsidian base
                                    boxShadow: isActive ? '0 25px 50px -12px rgba(226, 184, 116, 0.15)' : 'none'
                                }}
                                initial={{ opacity: 0, scale: 0.8, y: 100 }}
                                animate={{
                                    opacity: 1,
                                    x,
                                    y: y + lift,
                                    rotateZ,
                                    rotateX,
                                    scale,
                                    filter: isActive ? 'grayscale(0)' : 'grayscale(0.5) blur(1px)'
                                }}
                                exit={{ opacity: 0, scale: 0.5, y: -50 }}
                                transition={{
                                    type: "spring",
                                    stiffness: springStiffness,
                                    damping: springDamping,
                                    opacity: { duration: 0.2 }
                                }}
                                onClick={() => isActive ? onCardClick?.(item.image) : setActive(i)}
                                drag={isActive ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(_, info) => {
                                    const threshold = 100;
                                    const velocity = 500;
                                    const delta = info.offset.x;
                                    const vel = info.velocity.x;

                                    if (delta < -threshold || vel < -velocity) {
                                        isRTL ? prev() : next();
                                    } else if (delta > threshold || vel > velocity) {
                                        isRTL ? next() : prev();
                                    }
                                }}
                            >
                                {/* Card Content */}
                                <div className="relative h-full w-full group overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title || "Project"}
                                        className="h-full w-full object-cover select-none pointer-events-none transition-transform duration-1000 group-hover:scale-110"
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent opacity-80" />

                                    {/* Info Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-3 py-1 rounded-full bg-champagne/10 border border-champagne/20 text-[10px] uppercase tracking-widest text-champagne font-mono">
                                                {item.categoryLabel}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-heading font-bold text-ivory drop-shadow-lg">
                                            {item.title || (isRTL ? "مشروع متميز" : "Featured Project")}
                                        </h3>

                                        {/* Zoom Icon on Hover */}
                                        <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-ivory/10 backdrop-blur-md flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                            <ZoomIn className="text-ivory" size={20} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-4 mt-12">
                <button
                    onClick={prev}
                    className="w-12 h-12 rounded-full border border-ivory/10 flex items-center justify-center text-ivory/50 hover:text-champagne hover:border-champagne/40 transition-all active:scale-90"
                >
                    <span className={`transform ${isRTL ? 'rotate-180' : ''}`}>←</span>
                </button>
                <div className="flex gap-2">
                    {items.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActive(idx)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${idx === active ? "w-8 bg-champagne" : "w-1.5 bg-ivory/10 hover:bg-ivory/20"
                                }`}
                        />
                    ))}
                </div>
                <button
                    onClick={next}
                    className="w-12 h-12 rounded-full border border-ivory/10 flex items-center justify-center text-ivory/50 hover:text-champagne hover:border-champagne/40 transition-all active:scale-90"
                >
                    <span className={`transform ${isRTL ? 'rotate-180' : ''}`}>→</span>
                </button>
            </div>
        </div>
    );
}

export default CardStack;
