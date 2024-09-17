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
  buttonLabel: string;
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
  const [buttonLabel, setButtonLabel] = useState("Start");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const setPhaseTime = useCallback((phase: string) => {
    let duration;
    if (phase === "shortBreak") {
      duration = shortBreakDuration;
    } else if (phase === "longBreak") {
      duration = longBreakDuration;
    } else {
      duration = workDuration;
    }
    setMinutes(duration);
    setSeconds(0);
  }, [workDuration, shortBreakDuration, longBreakDuration]);

  const selectPhase = (phase: string) => {
    setSelectedPhase(phase);
    setCurrentPhase(phase);
    setPhaseTime(phase);
    if (isActive) {
      pause();
      setIsPaused(true);
    }
    setButtonLabel("Start");
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
          return 59;
        } else {
          setMinutes((prevMinutes) => prevMinutes - 1);
          return 59;
        }
      } else {
        return prevSeconds - 1;
      }
    });
  }, [minutes, currentPhase, workSessionsCompleted, cycle, setPhaseTime]);

  const start = () => {
    setIsPaused(false);
      setIsActive(true);
      setButtonLabel("Pause");
    if (!isPaused) {
      setCycleCompleteMessage(null);
    }
  };

  const pause = () => {
    setIsActive(false);
    setIsPaused(true);
    setButtonLabel("Continue");
  };

  const fastForward = () => {
    let newPhase = currentPhase;
    if (currentPhase === "work") {
      if (workSessionsCompleted + 1 === 4) {
        setWorkSessionsCompleted(0);
        setCycle(cycle + 1);
        newPhase = "longBreak";
        setCycleCompleteMessage(`Pomodoro cycle ${cycle + 1} is complete`);
      } else {
        setWorkSessionsCompleted(workSessionsCompleted + 1);
        newPhase = "shortBreak";
      }
    } else if (currentPhase === "shortBreak" || currentPhase === "longBreak") {
      newPhase = "work";
    }
    setCurrentPhase(newPhase);
    setSelectedPhase(newPhase);
    setPhaseTime(newPhase);
    setIsActive(false);
    setIsPaused(false);
    setButtonLabel("Start");
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(tick, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, tick]);

  useEffect(() => {
    console.log(`Current Phase: ${currentPhase}, Minutes: ${minutes}, Seconds: ${seconds}, Button Label: ${buttonLabel}`);
  }, [currentPhase, minutes, seconds, buttonLabel]);

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
    cycleCompleteMessage,
    buttonLabel
  };
};

export default usePomodoroTimer;