import { useState, useEffect } from 'react';
import { Grid, Chip, Fab } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import spacetime from 'spacetime';
import { readPlantDB, appendPlantToDB } from '../utilities/JsonDB';
// fiximport
import Plant from '../utilities/Types';
import RenderPlantCards from './RenderPlantCard';
import '../style/GrowRoomManager.css';

const examplePlant = {
  name: 'EXAMPLE',
  dominant: 'hybrid',
  amount: 100,
  thc: 25,
  cbd: 1,
  plantDate: '1431011162',
  stage: 'vegetation',
};

const plant: Plant[] = [];

const GrowRoomManager = () => {
  // an object contains all plants information
  const [allBatches, setAllBatches] = useState(plant);
  const readDB = () => {
    readPlantDB('./db.json');
  };

  useEffect(() => {
    // read json db first
    readDB();

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
        readDB();
      }
    });
  }, []);

  // gets all plats data at selected stage
  // will return all plants if no stage passed in
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

  const togglePlantUpdationPopup = (): void => {
    // setShowPlantPopUp(!showPlantPopUp);
    appendPlantToDB('./db.json', examplePlant);
  };

  return (
    <div className="growRoomManager unselectable">
      <div className="header">
        {/* <h1>Growth Tracker</h1> */}
        <Fab color="primary" aria-label="add">
          <AddCircle />
        </Fab>
        <Chip
          className="addPlantButton"
          label="Add New Plant"
          color="success"
          onClick={togglePlantUpdationPopup}
          style={{
            margin: 'auto',
            display: 'flex',
            width: '200px',
            marginTop: '10px',
          }}
        />
      </div>
      <div className="content">
        <Grid container>
          <Grid className="germination" id="slots" item xs={3}>
            <h2>Germination</h2>
            {getPlants(`germination`)}
          </Grid>
          <Grid className="vegetation" id="slots" item xs={3}>
            <h2>Vegetation</h2>
            {getPlants(`vegetation`)}
          </Grid>
          <Grid className="flowering" id="slots" item xs={3}>
            <h2>Flowering</h2>
            {getPlants(`flowering`)}
          </Grid>
          <Grid className="harvested" id="slots" item xs={3}>
            <h2>Harvested</h2>
            {getPlants(`harvested`)}
          </Grid>
        </Grid>
      </div>
    </div>
  );

  // return render;
};

export default GrowRoomManager;
