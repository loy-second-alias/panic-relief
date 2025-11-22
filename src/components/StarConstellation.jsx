import React, { useMemo } from 'react';
import '../App.css';

const StarConstellation = () => {
    // Generate stars
    const stars = useMemo(() => {
        return Array.from({ length: 200 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 2 + 1, // 1px to 3px
            delay: Math.random() * 3,
            opacity: Math.random() * 0.5 + 0.3,
        }));
    }, []);

    // Generate a few simple constellations (connected points)
    const constellations = useMemo(() => {
        const groups = [];
        for (let i = 0; i < 8; i++) {
            const startX = Math.random() * 80 + 10;
            const startY = Math.random() * 80 + 10;
            const points = [];
            let currentX = startX;
            let currentY = startY;

            // Create 3-5 connected points
            const numPoints = Math.floor(Math.random() * 3) + 3;
            for (let j = 0; j < numPoints; j++) {
                points.push({ x: currentX, y: currentY });
                currentX += (Math.random() - 0.5) * 20;
                currentY += (Math.random() - 0.5) * 20;
            }
            groups.push({ id: i, points });
        }
        return groups;
    }, []);

    return (
        <div className="star-container">
            {/* Stars */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="star"
                    style={{
                        left: `${star.left}%`,
                        top: `${star.top}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                        animationDelay: `${star.delay}s`,
                    }}
                />
            ))}

            {/* Constellation Lines */}
            <svg className="constellation-svg">
                {constellations.map((group) => (
                    <g key={group.id} className="constellation-group">
                        <polyline
                            points={group.points.map(p => `${p.x},${p.y}`).join(' ')}
                            fill="none"
                            stroke="var(--line-color)"
                            strokeWidth="1"
                        />
                        {group.points.map((p, idx) => (
                            <circle
                                key={idx}
                                cx={p.x}
                                cy={p.y}
                                r="1.5"
                                fill="var(--star-color)"
                                opacity="0.8"
                            />
                        ))}
                    </g>
                ))}
            </svg>

            <style>{`
        .star-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .star {
          position: absolute;
          background: var(--star-color);
          border-radius: 50%;
          box-shadow: 0 0 4px var(--star-glow);
          animation: twinkle 4s ease-in-out infinite;
        }

        .constellation-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .constellation-group {
          animation: drift 20s ease-in-out infinite alternate;
          transform-origin: center;
        }

        /* Randomize drift duration slightly for each group via nth-child if desired, 
           or just keep it simple for now */
        .constellation-group:nth-child(odd) {
          animation-duration: 25s;
        }
        .constellation-group:nth-child(even) {
          animation-duration: 30s;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes drift {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(20px, -10px) rotate(2deg); }
        }
      `}</style>
        </div>
    );
};

export default StarConstellation;
