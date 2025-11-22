import React, { useState, useEffect } from 'react';
import '../App.css';

const BreathingMode = ({ onExit }) => {
    const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale, pause
    const [showExit, setShowExit] = useState(false);

    useEffect(() => {
        // Cycle timing
        const times = {
            inhale: 4000,
            hold: 2000,
            exhale: 6000,
            pause: 2000
        };

        let timeoutId;

        const runCycle = (currentPhase) => {
            setPhase(currentPhase);

            let nextPhase;
            switch (currentPhase) {
                case 'inhale': nextPhase = 'hold'; break;
                case 'hold': nextPhase = 'exhale'; break;
                case 'exhale': nextPhase = 'pause'; break;
                case 'pause': nextPhase = 'inhale'; break;
                default: nextPhase = 'inhale';
            }

            timeoutId = setTimeout(() => {
                runCycle(nextPhase);
            }, times[currentPhase]);
        };

        // Start cycle
        runCycle('inhale');

        // Show exit button after 3 seconds
        const exitTimer = setTimeout(() => setShowExit(true), 3000);

        return () => {
            clearTimeout(timeoutId);
            clearTimeout(exitTimer);
        };
    }, []);

    const getInstructionText = () => {
        switch (phase) {
            case 'inhale': return 'Breathe in';
            case 'hold': return 'Hold';
            case 'exhale': return 'Breathe out';
            case 'pause': return 'Pause';
            default: return '';
        }
    };

    return (
        <div className="breathing-container">
            {/* Background Blobs */}
            <div className={`blob-layer phase-${phase}`}>
                <div className="blob blob-1" />
                <div className="blob blob-2" />
                <div className="blob blob-3" />
            </div>

            {/* Central Breathing Constellation */}
            <div className={`breathing-constellation phase-${phase}`}>
                <div className="constellation-star c-star-1" />
                <div className="constellation-star c-star-2" />
                <div className="constellation-star c-star-3" />
                <div className="constellation-star c-star-4" />
                <div className="constellation-star c-star-5" />
                <div className="constellation-star c-star-6" />
                <svg className="breathing-lines">
                    <polygon points="100,20 180,60 180,140 100,180 20,140 20,60" />
                </svg>
            </div>

            {/* Instructions */}
            <div className="instruction-container">
                <h1 key={phase} className="instruction-text">
                    {getInstructionText()}
                </h1>
            </div>

            {/* Exit Button */}
            <button
                className={`exit-button ${showExit ? 'visible' : ''}`}
                onClick={onExit}
            >
                ← Back
            </button>

            <style>{`
        .breathing-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 50;
          animation: fade-in 1.5s ease-out forwards;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* --- Background Blobs --- */
        .blob-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          transition: all 4s ease;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.6;
          animation: blob-float 20s infinite ease-in-out;
        }

        .blob-1 { top: 20%; left: 20%; width: 50vw; height: 50vw; }
        .blob-2 { bottom: 20%; right: 20%; width: 60vw; height: 60vw; animation-delay: -5s; }
        .blob-3 { top: 40%; left: 40%; width: 40vw; height: 40vw; animation-delay: -10s; }

        @keyframes blob-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        /* Phase Colors */
        .phase-inhale .blob { background: var(--inhale-primary); }
        .phase-hold .blob { background: var(--inhale-secondary); }
        .phase-exhale .blob { background: var(--exhale-primary); }
        .phase-pause .blob { background: var(--exhale-secondary); }

        /* Specific gradients for blobs could be more complex, but solid colors with heavy blur work well for "blobs" */
        .phase-inhale .blob-1 { background: radial-gradient(circle, var(--inhale-primary), transparent 70%); }
        .phase-inhale .blob-2 { background: radial-gradient(circle, var(--inhale-secondary), transparent 70%); }
        .phase-inhale .blob-3 { background: radial-gradient(circle, var(--inhale-tertiary), transparent 70%); }

        .phase-exhale .blob-1 { background: radial-gradient(circle, var(--exhale-primary), transparent 70%); }
        .phase-exhale .blob-2 { background: radial-gradient(circle, var(--exhale-secondary), transparent 70%); }
        .phase-exhale .blob-3 { background: radial-gradient(circle, var(--exhale-tertiary), transparent 70%); }
        
        /* Transitions for blobs */
        .blob { transition: background 4s ease; }


        /* --- Breathing Constellation --- */
        .breathing-constellation {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          transform: translate(-50%, -50%);
          z-index: 10;
          transition: transform 4s cubic-bezier(0.4, 0, 0.2, 1), filter 4s ease;
        }

        .breathing-lines {
          width: 100%;
          height: 100%;
          fill: none;
          stroke: rgba(255, 255, 255, 0.4);
          stroke-width: 1;
          overflow: visible;
        }

        .constellation-star {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #FFF9E6;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 249, 230, 0.8);
        }

        /* Star positions (hexagon) */
        .c-star-1 { top: 10%; left: 50%; transform: translate(-50%, 0); }
        .c-star-2 { top: 30%; right: 10%; }
        .c-star-3 { bottom: 30%; right: 10%; }
        .c-star-4 { bottom: 10%; left: 50%; transform: translate(-50%, 0); }
        .c-star-5 { bottom: 30%; left: 10%; }
        .c-star-6 { top: 30%; left: 10%; }

        /* Animations per phase */
        .phase-inhale {
          transform: translate(-50%, -50%) scale(1.5) rotate(10deg);
          filter: blur(2px);
          transition: transform 4s cubic-bezier(0.4, 0, 0.2, 1), filter 4s ease;
        }
        .phase-hold {
          transform: translate(-50%, -50%) scale(1.5) rotate(10deg);
          filter: blur(2px);
          transition: transform 2s ease;
        }
        .phase-exhale {
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
          filter: blur(0px);
          transition: transform 6s cubic-bezier(0.4, 0, 0.2, 1), filter 6s ease;
        }
        .phase-pause {
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
          filter: blur(0px);
          transition: transform 2s ease;
        }


        /* --- Instructions --- */
        .instruction-container {
          position: absolute;
          top: 40%; /* Slightly above center */
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          pointer-events: none;
        }

        .instruction-text {
          font-family: 'Comfortaa', sans-serif;
          font-size: clamp(32px, 6vw, 52px);
          font-weight: 400;
          color: var(--text-instruction);
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.7);
          letter-spacing: 2px;
          animation: text-fade 1s ease-in-out forwards;
          white-space: nowrap;
        }

        @keyframes text-fade {
          from { opacity: 0; filter: blur(10px); transform: scale(0.9); }
          to { opacity: 1; filter: blur(0px); transform: scale(1); }
        }


        /* --- Exit Button --- */
        .exit-button {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 100;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 40px;
          padding: 12px 20px;
          font-size: 14px;
          color: #FFFFFF;
          cursor: pointer;
          opacity: 0;
          transition: opacity 1s ease, background 0.3s ease;
        }

        .exit-button.visible {
          opacity: 1;
        }

        .exit-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
        </div>
    );
};

export default BreathingMode;
