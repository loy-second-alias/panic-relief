import React, { useState, useEffect } from 'react';
import BreathingConstellation from './BreathingConstellation';
import '../App.css';

const BreathingMode = ({ onExit }) => {
  const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale, pause
  const [showExit, setShowExit] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    // Slower, more therapeutic timing (Total: 18s)
    const times = {
      inhale: 5000,
      hold: 3000,
      exhale: 8000,
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
        case 'pause':
          nextPhase = 'inhale';
          setCycleCount(c => c + 1);
          break;
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
      {/* Immersive Full-Screen Background Blobs */}
      <div className={`immersive-bg phase-${phase}`}>
        <div className="blob-large blob-1" />
        <div className="blob-large blob-2" />
        <div className="blob-large blob-3" />
        <div className="blob-large blob-4" />
      </div>

      {/* Dynamic Breathing Constellation */}
      <BreathingConstellation phase={phase} cycleCount={cycleCount} />

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
          overflow: hidden;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* --- Immersive Background --- */
        .immersive-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          transition: all 4s ease-in-out; /* Smooth transition between phases */
        }

        .blob-large {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px); /* Heavy blur for dreamlike effect */
          opacity: 0.8;
          animation: blob-morph 20s infinite ease-in-out alternate;
          will-change: transform, opacity, background;
          transition: background 4s ease-in-out;
        }

        /* Large blobs covering screen */
        .blob-1 { top: -20%; left: -20%; width: 80vw; height: 80vw; }
        .blob-2 { bottom: -20%; right: -20%; width: 90vw; height: 90vw; animation-delay: -5s; }
        .blob-3 { top: 30%; left: 40%; width: 70vw; height: 70vw; animation-delay: -10s; }
        .blob-4 { bottom: 10%; left: -10%; width: 60vw; height: 60vw; animation-delay: -15s; }

        @keyframes blob-morph {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -30px) scale(1.1); }
        }

        /* Phase Colors - Smooth Interpolation */
        /* INHALE: Vibrant Blues */
        .phase-inhale .blob-1 { background: var(--inhale-primary); }
        .phase-inhale .blob-2 { background: var(--inhale-secondary); }
        .phase-inhale .blob-3 { background: var(--inhale-tertiary); }
        .phase-inhale .blob-4 { background: var(--inhale-accent); }
        
        /* HOLD: Deepening Blues */
        .phase-hold .blob-1 { background: var(--inhale-primary); }
        .phase-hold .blob-2 { background: var(--inhale-secondary); }
        .phase-hold .blob-3 { background: var(--inhale-tertiary); }
        .phase-hold .blob-4 { background: var(--inhale-accent); }

        /* EXHALE: Rich Purples */
        .phase-exhale .blob-1 { background: var(--exhale-primary); }
        .phase-exhale .blob-2 { background: var(--exhale-secondary); }
        .phase-exhale .blob-3 { background: var(--exhale-tertiary); }
        .phase-exhale .blob-4 { background: var(--exhale-accent); }

        /* PAUSE: Soft Purples */
        .phase-pause .blob-1 { background: var(--exhale-primary); }
        .phase-pause .blob-2 { background: var(--exhale-secondary); }
        .phase-pause .blob-3 { background: var(--exhale-tertiary); }
        .phase-pause .blob-4 { background: var(--exhale-accent); }

        /* --- Instructions --- */
        .instruction-container {
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          pointer-events: none;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .instruction-text {
          font-family: 'Fredoka', 'Quicksand', sans-serif; /* Updated Font */
          font-size: clamp(36px, 8vw, 60px);
          font-weight: 700; /* Bold */
          color: var(--text-instruction);
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.7);
          letter-spacing: 2px;
          animation: text-fade 1s ease-in-out forwards;
          white-space: nowrap;
        }

        @keyframes text-fade {
          from { opacity: 0; filter: blur(10px); transform: scale(0.95); }
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
          font-family: 'Fredoka', sans-serif;
          font-size: 16px;
          font-weight: 600;
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
