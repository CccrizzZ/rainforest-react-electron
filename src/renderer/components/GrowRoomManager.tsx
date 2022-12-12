import { useState, useEffect } from 'react';
import {
  Grid,
  Chip,
  Fab,
  Modal,
  Box,
  FormControl,
  InputLabel,
  Input,
} from '@mui/material';
import { AddCircle, Edit } from '@mui/icons-material';
import { GradientPinkBlue } from '@visx/gradient';
import { Bar, Pie } from '@visx/shape';
import { ProvidedProps, PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import JsonDBConnector from '../utilities/JsonDB';
import { Plant } from '../utilities/Types';
import RenderPlantCards from './RenderPlantCard';
import '../style/GrowRoomManager.css';

const plant: Plant[] = [];

const GrowRoomManager = () => {
  // all plants information
  const [jsonConnector] = useState(new JsonDBConnector('./db.json'));
  const [allBatches, setAllBatches] = useState(plant);
  const [showPlantPopUp, setShowPlantPopUp] = useState(false);
  const [plantPopUpTitle, setPlantPopUpTitle] = useState('Add New Plant');
  const openPopUp = () => setShowPlantPopUp(true);
  const closePopUp = () => setShowPlantPopUp(false);

  useEffect(() => {
    // receive all plants data
    window.electron.ipcRenderer.on('readPlantJsonDB', (arg) => {
      const db = JSON.parse(arg as string);
      setAllBatches(db);
    });

    // receive append result
    window.electron.ipcRenderer.on('appendPlantToJsonDB', (arg) => {
      if (arg === 'cannot find file') {
        alert('cannot find json.db');
      } else {
        jsonConnector.readPlantDB();
      }
    });

    // read from json db
    jsonConnector.readPlantDB();
  }, [jsonConnector]);

  // gets all plats data at selected stage
  const getPlants = (
    stage: 'germination' | 'vegetation' | 'flowering' | 'harvested' | undefined
  ): JSX.Element[] | null | React.ReactElement => {
    // check if stage is undefined or allBatches is empty
    if (stage === undefined || allBatches.forEach === undefined) {
      return null;
    }

    // all stages array
    const germinationBatches: Plant[] = [];
    const vegetationBatches: Plant[] = [];
    const floweringBatches: Plant[] = [];
    const harvestedBatches: Plant[] = [];

    // allocate plants into stage
    allBatches.forEach((batch) => {
      switch (batch.stage) {
        case 'germination':
          germinationBatches.push(batch);
          break;
        case 'vegetation':
          vegetationBatches.push(batch);
          break;
        case 'flowering':
          floweringBatches.push(batch);
          break;
        case 'harvested':
          harvestedBatches.push(batch);
          break;
        default:
          break;
      }
    });

    switch (stage) {
      case 'germination':
        return germinationBatches.map((batch, key) =>
          RenderPlantCards(batch, key)
        );
      case 'vegetation':
        return vegetationBatches.map((batch, key) =>
          RenderPlantCards(batch, key)
        );
      case 'flowering':
        return floweringBatches.map((batch, key) =>
          RenderPlantCards(batch, key)
        );
      case 'harvested':
        return harvestedBatches.map((batch, key) =>
          RenderPlantCards(batch, key)
        );
      default:
        return <h2>None</h2>;
    }
  };

  const gridStyle = { margin: 'auto', marginTop: '0' };
  const renderGraph = () => {
    return (
      <svg
        width={300}
        height={300}
        style={{ backgroundColor: '#fff', borderRadius: '2em' }}
      >
        <GradientPinkBlue
          id="pieFill"
          style={{ height: '100%', width: '100%' }}
        />
        <Bar
          fill="visx-pie-gradient"
          width={60}
          height={300}
          x={50}
          stroke="#ffffff"
          strokeWidth={1}
          rx={5}
        />
      </svg>
    );
  };

  return (
    <div className="growRoomManager unselectable componentWindow">
      <Modal
        className="unselectable"
        open={showPlantPopUp}
        onClose={closePopUp}
      >
        <Box className="plantModalBox disableOutline">
          <h2>{plantPopUpTitle}</h2>
          <div className="plantModalContent">
            <FormControl>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
          </div>
          <div className="plantModalFooter">
            <Chip color="error" label="Close" onClick={closePopUp} />
            <Chip color="success" label="Add Plant" onClick={closePopUp} />
          </div>
        </Box>
      </Modal>
      <div className="header" style={{ paddingTop: '30px' }}>
        {renderGraph()}
        <Fab
          onClick={openPopUp}
          color="success"
          aria-label="add"
          style={{
            margin: 'auto',
            display: 'flex',
          }}
        >
          <AddCircle />
        </Fab>
      </div>
      <div className="content">
        <Grid container alignItems="stretch">
          <Grid className="germinationCol slots" style={gridStyle}>
            <h2>Germination</h2>
            {getPlants(`germination`)}
          </Grid>
          <Grid className="vegetationCol slots" style={gridStyle}>
            <h2>Vegetation</h2>
            {getPlants(`vegetation`)}
          </Grid>
          <Grid className="floweringCol slots" style={gridStyle}>
            <h2>Flowering</h2>
            {getPlants(`flowering`)}
          </Grid>
          <Grid className="harvestedCol slots" style={gridStyle}>
            <h2>Harvested</h2>
            {getPlants(`harvested`)}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default GrowRoomManager;
