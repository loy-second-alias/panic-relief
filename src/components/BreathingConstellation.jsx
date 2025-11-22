import React, { useMemo, useEffect, useState } from 'react';
import '../App.css';

// Library of constellation patterns (normalized coordinates 0-100)
const PATTERNS = [
    // 1. Hexagon
    [
        { x: 50, y: 10 }, { x: 90, y: 30 }, { x: 90, y: 70 },
        { x: 50, y: 90 }, { x: 10, y: 70 }, { x: 10, y: 30 }
    ],
    // 2. Diamond
    [
        { x: 50, y: 0 }, { x: 100, y: 50 }, { x: 50, y: 100 }, { x: 0, y: 50 },
        { x: 50, y: 25 }, { x: 50, y: 75 }
    ],
    // 3. Spiral-ish
    [
        { x: 50, y: 50 }, { x: 60, y: 40 }, { x: 75, y: 50 },
        { x: 60, y: 70 }, { x: 30, y: 60 }, { x: 40, y: 20 }
    ],
    // 4. Arrow
    [
        { x: 50, y: 10 }, { x: 20, y: 80 }, { x: 50, y: 60 },
        { x: 80, y: 80 }, { x: 50, y: 30 }, { x: 50, y: 90 }
    ],
    // 5. Star
    [
        { x: 50, y: 0 }, { x: 65, y: 35 }, { x: 100, y: 35 },
        { x: 75, y: 60 }, { x: 85, y: 100 }, { x: 50, y: 75 },
        { x: 15, y: 100 }, { x: 25, y: 60 }, { x: 0, y: 35 }, { x: 35, y: 35 }
    ],
    // 6. Random Scatter 1
    [
        { x: 20, y: 20 }, { x: 80, y: 20 }, { x: 50, y: 50 },
        { x: 20, y: 80 }, { x: 80, y: 80 }
    ],
    // 7. Cross
    [
        { x: 50, y: 10 }, { x: 50, y: 90 }, { x: 10, y: 50 }, { x: 90, y: 50 },
        { x: 30, y: 30 }, { x: 70, y: 70 }
    ]
];

const BreathingConstellation = ({ phase, cycleCount }) => {
    const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
    const [nextPatternIndex, setNextPatternIndex] = useState(1);
    const [morphProgress, setMorphProgress] = useState(0);

    // Change pattern on every cycle
    useEffect(() => {
        // When cycleCount changes, we transition to a new pattern
        // We want to transition during the 'pause' or 'inhale' start
        // For simplicity, let's just switch the target pattern index
        const next = (cycleCount % PATTERNS.length);
        if (next !== currentPatternIndex) {
            setNextPatternIndex(next);
            // Trigger morph? 
            // Actually, let's just switch abruptly if we want distinct shapes, 
            // OR interpolate. Interpolation is cooler.
            // Let's interpolate over the 'pause' phase?
            // Or just let CSS handle position transitions if we map index-to-index.

            // Strategy: Render stars at positions. When pattern changes, 
            // the stars move to new positions.
            setCurrentPatternIndex(next);
        }
    }, [cycleCount]);

    // Get current pattern points
    const points = PATTERNS[currentPatternIndex];

    // Helper to generate SVG path
    const getPath = (pts) => {
        if (!pts || pts.length === 0) return '';
        return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
    };

    return (
        <div className={`breathing-constellation phase-${phase}`}>
            <svg className="constellation-svg" viewBox="0 0 100 100">
                {/* Connecting Lines */}
                <path
                    d={getPath(points)}
                    className="constellation-lines"
                />

                {/* Stars */}
                {points.map((p, i) => (
                    <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="2"
                        className="constellation-star-dot"
                    />
                ))}
            </svg>

            <style>{`
        .breathing-constellation {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px; /* Increased size */
          height: 300px;
          transform: translate(-50%, -50%);
          z-index: 10;
          transition: transform 5s cubic-bezier(0.4, 0, 0.2, 1), filter 2s ease;
        }

        .constellation-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .constellation-lines {
          fill: none;
          stroke: rgba(255, 255, 255, 0.3);
          stroke-width: 0.5;
          transition: d 2s ease-in-out; /* Morphing effect */
        }

        .constellation-star-dot {
          fill: #FFF9E6;
          filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.8));
          transition: cx 2s ease-in-out, cy 2s ease-in-out; /* Morphing effect */
        }

        /* Animations per phase */
        .phase-inhale {
          transform: translate(-50%, -50%) scale(1.3) rotate(5deg);
          filter: blur(1px);
        }
        
        .phase-hold {
          transform: translate(-50%, -50%) scale(1.3) rotate(5deg);
          filter: blur(1px);
        }
        
        .phase-exhale {
          transform: translate(-50%, -50%) scale(0.8) rotate(0deg);
          filter: blur(0px);
        }
        
        .phase-pause {
          transform: translate(-50%, -50%) scale(0.8) rotate(0deg);
          filter: blur(0px);
        }
      `}</style>
        </div>
    );
};

export default BreathingConstellation;
