import { useEffect, useState } from 'react';
import { AppBar, IconButton } from '@mui/material';
import { Circle } from '@mui/icons-material';
// import spacetime from 'spacetime';
import moment, { Moment } from 'moment';
import { setInterval } from 'timers';
import { textColor, barColor } from '../style/GlobalStyle';
import '../style/TimeBar.css';

const TimeBar = () => {
  const [currentTime, setCurrentTime] = useState<Moment>(moment());

  useEffect(() => {
    // connect to mongodb
    window.electron.ipcRenderer.connectMongoDB();

    // start updating time
    setInterval(() => {
      setCurrentTime(moment());
    }, 60000);
  }, []);

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
          backgroundColor: barColor,
          padding: '10px',
          color: textColor,
        }}
      >
        <div className="clock">
          <h4>{currentTime.format('LT')}</h4>
          <h4>{currentTime.format('LL')}</h4>
        </div>
      </AppBar>
    </div>
  );
};

export default TimeBar;
