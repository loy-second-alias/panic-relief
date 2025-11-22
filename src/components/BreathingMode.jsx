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
          setCycleCount(c => c + 1); // Increment cycle count on loop
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
      {/* Background Blobs - More vibrant and opaque */}
      <div className={`blob-layer phase-${phase}`}>
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
        <div className="blob blob-5" />
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
          transition: all 5s ease; /* Slower transition for slower breath */
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px); /* Slightly less blur for more defined color */
          opacity: 0.9; /* Increased opacity for vibrancy */
          animation: blob-float 25s infinite ease-in-out;
          mix-blend-mode: screen; /* Vibrant blending */
        }

        .blob-1 { top: 10%; left: 10%; width: 60vw; height: 60vw; }
        .blob-2 { bottom: 10%; right: 10%; width: 70vw; height: 70vw; animation-delay: -5s; }
        .blob-3 { top: 40%; left: 40%; width: 50vw; height: 50vw; animation-delay: -10s; }
        .blob-4 { top: 60%; left: 10%; width: 40vw; height: 40vw; animation-delay: -15s; }
        .blob-5 { top: 10%; right: 30%; width: 45vw; height: 45vw; animation-delay: -20s; }

        @keyframes blob-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }

        /* Phase Colors - Using new vibrant variables */
        .phase-inhale .blob { background: var(--inhale-primary); }
        .phase-hold .blob { background: var(--inhale-secondary); }
        .phase-exhale .blob { background: var(--exhale-primary); }
        .phase-pause .blob { background: var(--exhale-secondary); }

        /* Gradient overrides for depth */
        .phase-inhale .blob-1 { background: radial-gradient(circle, var(--inhale-primary), transparent 70%); }
        .phase-inhale .blob-2 { background: radial-gradient(circle, var(--inhale-secondary), transparent 70%); }
        .phase-inhale .blob-3 { background: radial-gradient(circle, var(--inhale-tertiary), transparent 70%); }
        
        .phase-exhale .blob-1 { background: radial-gradient(circle, var(--exhale-primary), transparent 70%); }
        .phase-exhale .blob-2 { background: radial-gradient(circle, var(--exhale-secondary), transparent 70%); }
        .phase-exhale .blob-3 { background: radial-gradient(circle, var(--exhale-tertiary), transparent 70%); }
        
        .blob { transition: background 5s ease; }

        /* --- Instructions --- */
        .instruction-container {
          position: absolute;
          top: 35%; /* Adjusted for better visibility */
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          pointer-events: none;
          width: 100%;
          display: flex;
          justify-content: center;
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
          font-family: 'Comfortaa', sans-serif;
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
