import React from 'react';
import '../Styles/ToggleBar.css';

interface Props {
  currentFilter: 'upcoming' | 'present' | 'past';
  setFilter: React.Dispatch<React.SetStateAction<'upcoming' | 'present' | 'past'>>;
}

const EventToggleBar: React.FC<Props> = ({ currentFilter, setFilter }) => {
  const options: ('upcoming' | 'present' | 'past')[] = ['upcoming', 'present', 'past'];

  return (
    <div className="event-toggle-bar">
      {options.map(option => (
        <button
          key={option}
          className={currentFilter === option ? 'active' : ''}
          onClick={() => setFilter(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default EventToggleBar;
