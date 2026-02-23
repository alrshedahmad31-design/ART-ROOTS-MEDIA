import { useEffect, useRef } from 'react';

/**
 * Animated Tiles — Image reveal effect
 * Adapted from 21st.dev/aliimam/animated-tiles
 * Splits an image into tiles with shimmer opacity animation
 */
export default function AnimatedTiles({
    rows = 12,
    cols = 8,
    tileSize = 50,
    imageUrl,
    className = '',
}) {
    const tilesRef = useRef(null);

    // Opacity map: higher in center, fades to edges — creates a vignette reveal
    const maxOpacities = [
        [0.0, 0.2, 0.4, 0.6, 0.6, 0.4, 0.2, 0.0],
        [0.2, 0.4, 0.8, 1.0, 1.0, 0.6, 0.4, 0.2],
        [0.2, 0.4, 1.0, 1.0, 1.0, 0.8, 0.6, 0.2],
        [0.2, 0.6, 1.0, 1.0, 1.0, 1.0, 0.6, 0.2],
        [0.2, 0.6, 1.0, 1.0, 1.0, 1.0, 0.6, 0.2],
        [0.2, 0.6, 1.0, 1.0, 1.0, 1.0, 0.6, 0.2],
        [0.2, 0.4, 0.8, 1.0, 1.0, 0.8, 0.6, 0.2],
        [0.2, 0.4, 0.6, 0.8, 0.8, 0.6, 0.4, 0.1],
        [0.1, 0.2, 0.4, 0.4, 0.4, 0.4, 0.2, 0.1],
        [0.0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.1, 0.1],
        [0.0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    ];

    useEffect(() => {
        if (!tilesRef.current) return;

        const tiles = [];
        tilesRef.current.innerHTML = '';

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const tile = document.createElement('div');
                tile.style.width = `${tileSize}px`;
                tile.style.height = `${tileSize}px`;
                tile.style.backgroundImage = `url(${imageUrl})`;
                tile.style.backgroundPosition = `${-col * tileSize}px ${-row * tileSize}px`;
                tile.style.backgroundSize = `${cols * tileSize}px ${rows * tileSize}px`;
                tile.style.float = 'left';
                tiles.push(tile);
                tilesRef.current.appendChild(tile);
            }
        }

        const animationFrames = [];
        const startTimes = [];

        tiles.forEach((tile, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const variance = 0.4;
            const maxOpacity = maxOpacities[row]?.[col] ?? 0;
            const minOpacity = Math.max(0, maxOpacity - variance);
            const duration = Math.random() * 0.25 + 0.75;

            if (maxOpacity === 0) {
                tile.style.opacity = '0';
                return;
            }

            startTimes[i] = Math.random() * duration;
            let startTime = null;

            const animate = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const elapsed = (currentTime - startTime) / 1000;
                const progress = (elapsed + startTimes[i]) % (duration * 2);
                const normalizedProgress = progress < duration
                    ? progress / duration
                    : (duration * 2 - progress) / duration;

                const opacity = minOpacity + (maxOpacity - minOpacity) * normalizedProgress;
                tile.style.opacity = Math.max(minOpacity, Math.min(maxOpacity, opacity)).toString();

                animationFrames[i] = requestAnimationFrame(animate);
            };

            animationFrames[i] = requestAnimationFrame(animate);
        });

        return () => {
            animationFrames.forEach((frameId) => cancelAnimationFrame(frameId));
        };
    }, [rows, cols, tileSize, imageUrl]);

    return (
        <div
            ref={tilesRef}
            className={className}
            style={{
                width: `${cols * tileSize}px`,
                height: `${rows * tileSize}px`,
                position: 'relative',
                overflow: 'hidden',
            }}
        />
    );
}
