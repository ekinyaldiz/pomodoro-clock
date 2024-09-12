// src/App.tsx
import React from 'react';
import Timer from './components/Timer';
import Menu from './components/Menu';
import usePomodoroTimer from './hooks/usePomodoroTimer';

const App = () => {
  const { 
    minutes, 
    seconds, 
    isActive, 
    start, 
    pause, 
    fastForward,
    currentPhase, 
    selectPhase, 
    selectedPhase, 
    workDuration, 
    shortBreakDuration, 
    longBreakDuration,
    cycle,
    cycleCompleteMessage // Destructure the cycle complete message
  } = usePomodoroTimer();

  const handleStartPause = () => {
    if (isActive) {
      pause();
    } else {
      start();
    }
  };

  return (
    <div className="App">
      <Menu 
        onSelectPhase={selectPhase} 
        selectedPhase={selectedPhase} 
      />
      <Timer 
        minutes={minutes} 
        seconds={seconds} 
        currentPhase={currentPhase} 
        cycle={cycle} 
        selectedPhase={selectedPhase} 
        workDuration={workDuration} 
        shortBreakDuration={shortBreakDuration} 
        longBreakDuration={longBreakDuration} 
      />
      <button onClick={handleStartPause}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={fastForward}>
        Fast Forward
      </button>
      {cycleCompleteMessage && <div>{cycleCompleteMessage}</div>}
    </div>
  );
};

export default App;