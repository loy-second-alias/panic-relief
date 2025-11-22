import React, { useState, useEffect } from 'react';
import { affirmations } from '../data/affirmations';
import '../App.css';

const AffirmationDisplay = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId;

    const runCycle = () => {
      // Start fade in
      setIsVisible(true);

      // Schedule fade out after 8 seconds (2s fade in + 6s visible)
      timeoutId = setTimeout(() => {
        setIsVisible(false);

        // Schedule next cycle after fade out completes (2s)
        timeoutId = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % affirmations.length);
          runCycle();
        }, 2000);
      }, 8000);
    };

    // Start the first cycle
    runCycle();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="affirmation-container">
      <h2 className={`affirmation-text ${isVisible ? 'visible' : 'hidden'}`}>
        {affirmations[currentIndex]}
      </h2>

      <style>{`
        .affirmation-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
          pointer-events: none;
        }

        .affirmation-text {
          font-family: 'Comfortaa', sans-serif;
          font-size: clamp(24px, 6vw, 42px);
          font-weight: 400;
          color: var(--text-affirmation);
          text-align: center;
          width: 85%;
          max-width: 800px;
          line-height: 1.5;
          text-shadow: 
            0 0 20px var(--text-glow),
            0 0 40px rgba(255, 215, 0, 0.3);
          transition: opacity 2s ease-in-out, filter 2s ease-in-out, transform 2s ease-in-out;
        }

        .affirmation-text.visible {
          opacity: 1;
          filter: blur(0px);
          transform: translateY(0px);
          animation: float 6s ease-in-out infinite;
        }

        .affirmation-text.hidden {
          opacity: 0;
          filter: blur(15px);
          transform: translateY(20px);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default AffirmationDisplay;
