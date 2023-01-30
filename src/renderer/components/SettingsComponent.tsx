import { useState, useEffect } from 'react';
import {
  AppBar,
  IconButton,
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@mui/material';
import { globalColor } from '../style/GlobalStyle';

const SettingsComponent = (): JSX.Element => {
  // need redux
  const [dbSelection, setDbSelection] = useState('');

  const SettingsComponentStyle = {
    width: '60%',
    height: '80%',
    backgroundColor: globalColor.moduleBGColor,
    margin: 'auto',
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDbSelection((event.target as HTMLInputElement).value);
  };

  return (
    <div style={SettingsComponentStyle}>
      <h1 style={{ padding: '20px' }}>Settings</h1>
      <Paper elevation={3} style={{ userSelect: 'none' }}>
        <h4>Database</h4>
        <FormControl>
          <FormLabel id="db-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="db-row-radio-buttons-group-label"
            name="db-radio-buttons-group"
            onChange={handleChange}
          >
            <FormControlLabel
              value="mongo"
              control={<Radio />}
              label="MongoDB"
            />
            <FormControlLabel value="json" control={<Radio />} label="JSON" />
          </RadioGroup>
        </FormControl>
      </Paper>
    </div>
  );
};

export default SettingsComponent;
