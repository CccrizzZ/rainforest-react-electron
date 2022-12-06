import { useEffect, useState } from 'react';
import { AppBar, IconButton } from '@mui/material';
import { Circle } from '@mui/icons-material';
import spacetime from 'spacetime';
import { setInterval } from 'timers';
import '../style/TimeBar.css';

const TimeBar = () => {
  const [currentTime, setCurrentTime] = useState(spacetime.now());

  useEffect(() => {
    // connect to mongodb
    window.electron.ipcRenderer.connectMongoDB();

    // start updating time
    setInterval(() => {
      setCurrentTime(spacetime.now());
    }, 60000);
  }, []);

  // returns current date in string
  // spacetime.now() returns device system time no internet connection needed
  const getDate = (): string => {
    return `${currentTime.monthName().toUpperCase()} ${currentTime.date()}`;
  };

  const closeWindow = (): void => {
    window.electron.ipcRenderer.shutDownSystem();
  };

  const minimizeWindow = (): void => {
    window.electron.ipcRenderer.minimizeWindow();
  };

  const maximizeWindow = (): void => {
    window.electron.ipcRenderer.toggleMaximizeWindow();
  };

  return (
    <div className="timeBar">
      <div className="buttonGroup">
        <IconButton color="error" size="small" onClick={closeWindow}>
          <Circle />
        </IconButton>
        <IconButton color="warning" size="small" onClick={minimizeWindow}>
          <Circle />
        </IconButton>
        <IconButton color="success" size="small" onClick={maximizeWindow}>
          <Circle />
        </IconButton>
      </div>
      <AppBar
        position="static"
        style={{
          backgroundColor: '#252525',
          padding: '10px',
          color: '#ff7b00',
        }}
      >
        <div className="clock">
          <h4>{currentTime.time()}</h4>
          <h4>{getDate()}</h4>
        </div>
      </AppBar>
    </div>
  );
};

export default TimeBar;
