import { useEffect, useState } from 'react';
import { AppBar, Grid } from '@mui/material';
import { Circle } from '@mui/icons-material';
import HeatMap, { HeatMapValue } from '@uiw/react-heat-map';
import { textColor, darkColor, moduleBGColor } from '../../style/GlobalStyle';

const style = {
  borderRadius: '2em',
  border: '1px solid black',
  backgroundColor: moduleBGColor,
  width: '80%',
  margin: 'auto',
  marginBottom: '20px',
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const mockData: HeatMapValue[] = [
  { date: '2016/05/04', count: 1, content: 'feeding' },
  { date: '2016/05/04', count: 11, content: 'watering' },
];

const EventHeatMap = () => {
  const [eventData, setEventData] = useState<HeatMapValue[]>([]);

  useEffect(() => {
    console.log('load event heat map');

    setEventData(mockData);
  }, []);

  const renderBin = (size: number, xCount: number, yCount: number) => {
    return <rect width={size} height={size} />;
  };

  const renderYAxis = (indexArray: string[]) => {
    return indexArray.map((item) => <h4 key={item}>{item}</h4>);
  };

  const renderHeatMapCalender = () => {
    return (
      <Grid
        container
        spacing={2}
        style={{
          borderRadius: '2em',
          margin: 'auto',
          width: '80%',
          marginBottom: '20px',
        }}
      >
        <Grid item xs={1} style={{ color: textColor }}>
          {renderYAxis(days)}
        </Grid>
        <Grid item xs={11} style={{ backgroundColor: darkColor }}>
          Content
        </Grid>
        <Grid item xs={12} style={{ backgroundColor: textColor }}>
          X Axis
        </Grid>
        <Grid item xs={12} style={{ backgroundColor: darkColor }}>
          Legend
        </Grid>
      </Grid>
    );
  };

  return (
    <div style={style}>
      <h1 style={{ display: 'table', margin: 'auto', marginTop: '10px' }}>
        Event Record
      </h1>
      <HeatMap
        style={{
          color: textColor,
          width: '60%',
          height: '60%',
          margin: 'auto',
        }}
        value={eventData}
        startDate={new Date()}
        panelColors={{
          0: '#f4decd',
          2: '#e4b293',
          4: '#d48462',
          10: '#c2533a',
          20: '#ad001d',
          30: '#000',
        }}
        legendRender={(props) => (
          <rect {...props} rx={5} width={10} height={10} />
        )}
        rectProps={{
          rx: 2,
          width: 10,
          height: 10,
        }}
      />
      {renderHeatMapCalender()}
    </div>
  );
};

export default EventHeatMap;
