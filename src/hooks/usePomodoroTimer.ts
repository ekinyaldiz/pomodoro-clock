import { useState, useEffect, useRef, useCallback } from 'react';

interface TimerState {
  minutes: number;
  seconds: number;
  isActive: boolean;
  isPaused: boolean;
  start: () => void;
  pause: () => void;
  fastForward: () => void;
  currentPhase: string;
  selectPhase: (phase: string) => void;
  selectedPhase: string;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  cycle: number;
  cycleCompleteMessage: string | null;
}

const usePomodoroTimer = (): TimerState => {
  const workDuration = 25;
  const shortBreakDuration = 5;
  const longBreakDuration = 30;

  const [minutes, setMinutes] = useState(workDuration);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPhase, setCurrentPhase] = useState("work");
  const [selectedPhase, setSelectedPhase] = useState("work");
  const [cycle, setCycle] = useState(0);
  const [workSessionsCompleted, setWorkSessionsCompleted] = useState(0);
  const [cycleCompleteMessage, setCycleCompleteMessage] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  const setPhaseTime = (phase: string) => {
    let duration = workDuration;
    if (phase === "shortBreak") {
      duration = shortBreakDuration;
    } else if (phase === "longBreak") {
      duration = longBreakDuration;
    }
    setMinutes(duration);
    setSeconds(0);
  };

  const selectPhase = (phase: string) => {
    setSelectedPhase(phase);
    setCurrentPhase(phase);
    if (!isActive) {
      setPhaseTime(phase);
    } else {
      pause();
      setPhaseTime(phase);
      setIsPaused(true);
    }
  };

  const tick = useCallback(() => {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 0) {
        if (minutes === 0) {
          if (currentPhase === "work") {
            if (workSessionsCompleted + 1 === 4) {
              setWorkSessionsCompleted(0);
              setCycle(cycle + 1);
              setCurrentPhase("longBreak");
              setPhaseTime("longBreak");
              setCycleCompleteMessage(`Pomodoro cycle ${cycle + 1} is complete`);
            } else {
              setWorkSessionsCompleted(workSessionsCompleted + 1);
              setCurrentPhase("shortBreak");
              setPhaseTime("shortBreak");
            }
          } else if (currentPhase === "shortBreak" || currentPhase === "longBreak") {
            setCurrentPhase("work");
            setPhaseTime("work");
          }
        } else {
          setMinutes((prevMinutes) => prevMinutes - 1);
          return 59;
        }
      } else {
        return prevSeconds - 1;
      }
      return prevSeconds;
    });
  }, [minutes, currentPhase, workSessionsCompleted, cycle]);

  const start = () => {
    setIsPaused(false);
    if (!isActive) {
      setPhaseTime(selectedPhase);
      setIsActive(true);
    } else {
      setIsActive(true);
    }
    setCycleCompleteMessage(null); // Clear cycle complete message when starting
  };

  const pause = () => {
    setIsActive(false);
    setIsPaused(true);
  };

  const fastForward = () => {
    if (currentPhase === "work") {
      if (workSessionsCompleted + 1 === 4) {
        setWorkSessionsCompleted(0);
        setCycle(cycle + 1);
        setCurrentPhase("longBreak");
        setPhaseTime("longBreak");
        setCycleCompleteMessage(`Pomodoro cycle ${cycle + 1} is complete`);
      } else {
        setWorkSessionsCompleted(workSessionsCompleted + 1);
        setCurrentPhase("shortBreak");
        setPhaseTime("shortBreak");
      }
    } else if (currentPhase === "shortBreak" || currentPhase === "longBreak") {
      setCurrentPhase("work");
      setPhaseTime("work");
    }
    setIsActive(false);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(tick, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, tick]);

  return { 
    minutes, 
    seconds, 
    isActive, 
    isPaused, 
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
    cycleCompleteMessage // Returning the cycle complete message
  };
};

export default usePomodoroTimer;