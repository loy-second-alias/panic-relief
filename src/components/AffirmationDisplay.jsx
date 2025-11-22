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
          font-family: 'Fredoka', 'Quicksand', sans-serif;
          font-size: clamp(36px, 8vw, 64px); /* Larger size */
          font-weight: 700; /* Bold */
          text-align: center;
          width: 85%;
          max-width: 900px;
          line-height: 1.3;
          
          /* Liquid Yellow-Orange Gradient */
          background: linear-gradient(
            135deg, 
            #FFD700 0%,   /* Golden Yellow */
            #FFC947 25%,  /* Warm Gold */
            #FFB347 50%,  /* Amber */
            #FFCC33 75%,  /* Bright Yellow */
            #FFD700 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          
          /* Text Shadow for Glow (since color is transparent, we use drop-shadow filter) */
          filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.4));
          
          /* Only transition opacity, let animation handle transform/filter */
          transition: opacity 2s ease-in-out;
          will-change: transform, opacity, filter;
        }

        /* Animation: Continuous Growth & Blur */
        .affirmation-text.visible {
          opacity: 1;
          animation: 
            grow-and-blur 10s ease-out forwards,
            liquid-shimmer 8s linear infinite;
        }

        .affirmation-text.hidden {
          opacity: 0;
          /* Start with blur so it fades out nicely, but animation overrides when visible */
          filter: blur(20px);
          transform: scale(1); 
        }

        @keyframes grow-and-blur {
          0% {
            transform: scale(1);
            filter: blur(0px) drop-shadow(0 0 15px rgba(255, 215, 0, 0.4));
          }
          50% {
            /* Keep clear for first half */
            filter: blur(0px) drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));
          }
          100% {
            transform: scale(1.5);
            filter: blur(20px) drop-shadow(0 0 30px rgba(255, 215, 0, 0));
          }
        }
        
        @keyframes liquid-shimmer {
          to { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
};

export default AffirmationDisplay;
