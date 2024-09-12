import React from 'react';

interface ControlsProps {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onContinue: () => void;
  isActive: boolean;
  isPaused: boolean;
  currentPhase: string;
  selectedPhase: string;
}

const Controls: React.FC<ControlsProps> = ({ onStart, onPause, onReset, onContinue, isActive, isPaused, currentPhase, selectedPhase }) => {
  const showContinue = isPaused && currentPhase === selectedPhase;

  return (
    <div>
      <button onClick={onReset}>Reset</button>
      {isActive ? (
        <button onClick={onPause}>Pause</button>
      ) : showContinue ? (
        <button onClick={onContinue}>Continue</button>
      ) : (
        <button onClick={onStart}>Start</button>
      )}
    </div>
  );
};

export default Controls;