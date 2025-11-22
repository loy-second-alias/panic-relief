import React from 'react';
import '../App.css';

const BreathButton = ({ onStart }) => {
  return (
    <>
      <button className="breathe-button" onClick={onStart}>
        breathe with me
      </button>

      <style>{`
        .breathe-button {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          
          /* Animated Pastel Gradient Background */
          background: linear-gradient(
            45deg, 
            var(--btn-pastel-1), 
            var(--btn-pastel-2), 
            var(--btn-pastel-3), 
            var(--btn-pastel-4), 
            var(--btn-pastel-5)
          );
          background-size: 300% 300%;
          
          /* Heavy Blur Backdrop */
          backdrop-filter: blur(40px);
          
          /* Border and Shape */
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 50px;
          padding: 16px 40px;
          
          /* Typography - Bold & Rounded */
          font-family: 'Fredoka', 'Quicksand', sans-serif;
          font-size: 20px;
          font-weight: 700; /* Bold */
          
          /* Text Gradient (Purple to Pink) */
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          /* We need a separate element or pseudo-element for text gradient if background is already gradient.
             Actually, standard CSS 'background-clip: text' clips the background of the element to the text.
             If the element has a background gradient, the text will take that gradient, but the button background will be gone.
             
             Solution: Use a pseudo-element for the button background, and apply text gradient to the button itself.
             OR: Use a span for the text.
          */
          color: #6600CC; /* Fallback */
          
          /* Box Shadow */
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          
          transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
          animation: 
            living-breath 4s ease-in-out infinite,
            gradient-shift 20s ease infinite;
            
          /* Reset text clip for now to ensure visibility on top of gradient background. 
             The user asked for "Button Text: Text gradient: purple-to-pink shift".
             And "Button Background: Blurry pastel gradient".
             
             To do both:
             1. Button has background gradient.
             2. Text span has background gradient + clip.
          */
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Text Gradient Span */
        .breathe-button span {
           background: linear-gradient(to right, #6600CC, #CC33FF, #FF66CC);
           background-size: 200% auto;
           background-clip: text;
           -webkit-background-clip: text;
           color: transparent;
           animation: text-shimmer 4s linear infinite;
           filter: drop-shadow(0 0 5px rgba(255, 105, 180, 0.4));
        }

        /* Since we can't easily change the JSX structure in this CSS block without changing the component return,
           let's update the component return to include a span.
        */

        .breathe-button:hover {
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transform: translateX(-50%) scale(1.05);
        }

        .breathe-button:active {
          transform: translateX(-50%) scale(0.98);
        }

        @keyframes living-breath {
          0%, 100% {
            transform: translateX(-50%) scale(1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          }
          50% {
            transform: translateX(-50%) scale(1.08);
            box-shadow: 0 15px 45px rgba(0, 0, 0, 0.25);
          }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes text-shimmer {
          to { background-position: 200% center; }
        }
      `}</style>
    </>
  );
};

// We need to update the JSX to wrap text in span for the gradient effect
const BreathButtonWithSpan = ({ onStart }) => {
  return (
    <>
      <button className="breathe-button" onClick={onStart}>
        <span>breathe with me</span>
      </button>
      {/* Styles are same as above */}
      <style>{`
        .breathe-button {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          
          /* Animated Pastel Gradient Background */
          background: linear-gradient(
            45deg, 
            var(--btn-pastel-1), 
            var(--btn-pastel-2), 
            var(--btn-pastel-3), 
            var(--btn-pastel-4), 
            var(--btn-pastel-5)
          );
          background-size: 300% 300%;
          
          /* Heavy Blur Backdrop */
          backdrop-filter: blur(40px);
          
          /* Border and Shape */
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 50px;
          padding: 16px 40px;
          
          /* Typography - Bold & Rounded */
          font-family: 'Fredoka', 'Quicksand', sans-serif;
          font-size: 20px;
          font-weight: 700; /* Bold */
          
          /* Box Shadow */
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          
          transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
          animation: 
            living-breath 4s ease-in-out infinite,
            gradient-shift 20s ease infinite;
            
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Text Gradient Span */
        .breathe-button span {
           background: linear-gradient(to right, #6600CC, #CC33FF, #FF66CC);
           background-size: 200% auto;
           background-clip: text;
           -webkit-background-clip: text;
           color: transparent;
           animation: text-shimmer 4s linear infinite;
           filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
        }

        .breathe-button:hover {
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
          cursor: pointer;
          /* Note: transform scale is handled by animation, adding hover scale might conflict. 
             Let's just adjust shadow. */
        }

        .breathe-button:active {
          /* transform handled by animation, maybe just opacity? */
          opacity: 0.9;
        }

        @keyframes living-breath {
          0%, 100% {
            transform: translateX(-50%) scale(1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          }
          50% {
            transform: translateX(-50%) scale(1.08);
            box-shadow: 0 15px 45px rgba(0, 0, 0, 0.25);
          }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes text-shimmer {
          to { background-position: 200% center; }
        }
      `}</style>
    </>
  );
};

export default BreathButtonWithSpan;
