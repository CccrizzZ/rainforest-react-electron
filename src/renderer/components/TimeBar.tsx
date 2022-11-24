import { AppBar } from '@mui/material';
import { useEffect, useState } from 'react';
import spacetime from 'spacetime';
import { setInterval } from 'timers';
import '../style/DraggableWindow.css';

const TimeBar = () => {
  const [currentTime, setCurrentTime] = useState(spacetime.now());

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(spacetime.now());
      console.log('1 minute passed');
    }, 60000);
  }, []);

  // returns current date in string
  // spacetime.now() returns device system time no internet connection needed
  const getDate = (): string => {
    return `${currentTime.monthName().toUpperCase()} ${currentTime.date()}`;
  };

  return (
    <div className="TimeBar">
      <AppBar
        position="static"
        style={{
          backgroundColor: '#252525',
          padding: '10px',
          color: '#ff7b00',
        }}
      >
        <h4 style={{ margin: 'auto', right: '0' }}>{currentTime.time()}</h4>
        <h4 style={{ margin: 'auto' }}>{getDate()}</h4>
      </AppBar>
    </div>
  );
};

export default TimeBar;
