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
          
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          padding: 16px 32px;
          
          font-family: 'Comfortaa', sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #FFFFFF;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          
          transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
          animation: gentle-pulse 3s ease-in-out infinite;
        }

        .breathe-button:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateX(-50%) translateY(-2px);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .breathe-button:active {
          transform: translateX(-50%) translateY(0px);
          box-shadow: 
            0 6px 24px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        @keyframes gentle-pulse {
          0%, 100% {
            box-shadow: 0 8px 32px rgba(255, 255, 255, 0.2);
          }
          50% {
            box-shadow: 0 12px 40px rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>
        </>
    );
};

export default BreathButton;
