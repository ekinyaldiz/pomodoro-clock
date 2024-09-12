// src/components/Menu.tsx
import React from 'react';

interface MenuProps {
  onSelectPhase: (phase: string) => void;
  selectedPhase: string;
}

const Menu: React.FC<MenuProps> = ({ onSelectPhase, selectedPhase }) => {
  return (
    <div>
      <button onClick={() => onSelectPhase('work')} style={{ backgroundColor: selectedPhase === 'work' ? 'lightgray' : '' }}>Work</button>
      <button onClick={() => onSelectPhase('shortBreak')} style={{ backgroundColor: selectedPhase === 'shortBreak' ? 'lightgray' : '' }}>Short Break</button>
      <button onClick={() => onSelectPhase('longBreak')} style={{ backgroundColor: selectedPhase === 'longBreak' ? 'lightgray' : '' }}>Long Break</button>
    </div>
  );
};

export default Menu;