// src/components/Timer.tsx
import React from 'react';

interface TimerProps {
  minutes: number;
  seconds: number;
  currentPhase: string;
  cycle: number;
  selectedPhase: string;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}

const Timer: React.FC<TimerProps> = ({ 
  minutes, 
  seconds, 
  currentPhase, 
  cycle, 
  selectedPhase, 
  workDuration, 
  shortBreakDuration, 
  longBreakDuration 
}) => {
  return (
    <div>
      <h2>{currentPhase === 'work' ? 'Work' : currentPhase === 'shortBreak' ? 'Short Break' : 'Long Break'}</h2>
      <div>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div>Cycle: {cycle}</div>
    </div>
  );
};

export default Timer;