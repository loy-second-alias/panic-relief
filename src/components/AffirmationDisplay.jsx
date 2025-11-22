import React, { useState, useEffect } from 'react';
import { affirmations } from '../data/affirmations';
import '../App.css';

const AffirmationDisplay = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeElement, setActiveElement] = useState('current');
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    let timeoutId;
    let particleInterval;

    const runCycle = () => {
      // Show current affirmation for 8 seconds
      timeoutId = setTimeout(() => {
        // Start fade out
        setActiveElement('none'); // Both hidden

        // After fade out completes (2.5s), wait 1.5s, then show next
        setTimeout(() => {
          const newNextIndex = (currentIndex + 1) % affirmations.length;
          setCurrentIndex(newNextIndex);

          // Show the new affirmation
          setTimeout(() => {
            setActiveElement('current');
            runCycle();
          }, 100); // Small delay to ensure state update
        }, 4000); // 2.5s fade out + 1.5s pause
      }, 8000);
    };

    // Start the cycle
    runCycle();

    // Spawn purple twinkle particles periodically
    particleInterval = setInterval(() => {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: 50 + (Math.random() - 0.5) * 30,
        y: 50 + (Math.random() - 0.5) * 20,
        delay: Math.random() * 0.5
      };
      setParticles(prev => [...prev.slice(-8), newParticle]);
    }, 800);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(particleInterval);
    };
  }, [currentIndex]);

  return (
    <div className="affirmation-container">
      {/* Single affirmation element */}
      <h2
        className={`affirmation-text ${activeElement === 'current' ? 'active' : 'inactive'}`}
      >
        {affirmations[currentIndex]}
      </h2>

      {/* Purple twinkle particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="twinkle-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}

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
          font-size: clamp(36px, 8vw, 64px);
          font-weight: 700;
          text-align: center;
          width: 85%;
          max-width: 900px;
          line-height: 1.3;
          
          /* Gradient with purple hints */
          background: linear-gradient(
            135deg, 
            #FFD700 0%,
            #FFC947 20%,
            #FFB347 40%,
            #E6A8D7 60%,
            #D4A5FF 80%,
            #FFD700 100%
          );
          background-size: 300% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          
          filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));
          
          /* Smooth transitions for everything */
          transition: 
            opacity 2.5s cubic-bezier(0.4, 0, 0.2, 1),
            filter 2.5s cubic-bezier(0.4, 0, 0.2, 1),
            transform 2.5s cubic-bezier(0.4, 0, 0.2, 1);
          
          will-change: opacity, filter, transform;
        }

        .affirmation-text.active {
          opacity: 1;
          filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));
          transform: scale(1);
          animation: gentle-shimmer 12s linear infinite;
        }

        .affirmation-text.inactive {
          opacity: 0;
          filter: drop-shadow(0 0 40px rgba(212, 165, 255, 0.3)) blur(15px);
          transform: scale(0.95);
        }

        @keyframes gentle-shimmer {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }

        /* Purple twinkle particles */
        .twinkle-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, #D4A5FF, transparent);
          border-radius: 50%;
          pointer-events: none;
          animation: twinkle-fade 2s ease-out forwards;
          box-shadow: 0 0 8px rgba(212, 165, 255, 0.8);
        }

        @keyframes twinkle-fade {
          0% {
            opacity: 0;
            transform: scale(0) translateY(0);
          }
          20% {
            opacity: 1;
            transform: scale(1) translateY(-5px);
          }
          100% {
            opacity: 0;
            transform: scale(0.5) translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default AffirmationDisplay;
