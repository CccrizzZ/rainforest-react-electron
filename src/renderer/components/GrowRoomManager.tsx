import { useState, useEffect } from 'react';
import {
  Grid,
  Chip,
  Fab,
  Modal,
  Box,
  FormControl,
  InputLabel,
  Tooltip,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Select,
  MenuItem,
  SelectChangeEvent,
  Fade,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { GradientPinkBlue } from '@visx/gradient';
import { Bar, Pie } from '@visx/shape';
import { ProvidedProps, PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import JsonDBConnector from '../utilities/JsonDB';
import { Plant } from '../utilities/Types';
import Sleep from '../utilities/Sleep';
import {
  indicaColor,
  sativaColor,
  hybridColor,
  textColor,
  formControlStyle,
} from '../style/GlobalStyle';
import RenderPlantCards from './RenderPlantCard';
import '../style/GrowRoomManager.css';

const plant: Plant[] = [];
const initPlant: Plant = {
  id: '',
  name: '',
  dominant: 'indica',
  amount: 0,
  thc: 0,
  cbd: 0,
  plantDate: moment().format('l'),
  stage: 'germination',
  seedType: 'regular',
};

const indicaRadioStyle = {
  color: indicaColor,
  '&.Mui-checked': {
    color: indicaColor,
  },
};

const sativaRadioStyle = {
  color: sativaColor,
  '&.Mui-checked': {
    color: sativaColor,
  },
};

const hybridRadioStyle = {
  color: hybridColor,
  '&.Mui-checked': {
    color: hybridColor,
  },
};

const typographyStyle = {
  '& .MuiTypography-root': {
    color: textColor,
  },
};

const textColorObj = {
  color: textColor,
};

const textFieldStyle = {
  '& label.Mui-focused': textColorObj,
  '& .MuiInputLabel-root': textColorObj,
  '& .MuiSvgIcon-root': textColorObj,
  '& .MuiFilledInput-root': {
    backgroundColor: '#101010',
  },
  '& .MuiFilledInput-input': {
    color: '#fff',
  },
  '& .MuiFilledInput-root:after': {
    borderBottom: `2px solid ${textColor}`,
  },
};

const selectInputStyle = {
  '& .MuiSelect-icon': textColorObj,
  '& .MuiFilledInput-input': {
    color: '#fff',
  },
};

const GrowRoomManager = () => {
  const [fadeIn, setFadeIn] = useState(false);
  // plants data states
  const [jsonConnector] = useState<JsonDBConnector>(
    new JsonDBConnector('./db.json')
  );
  const [allBatches, setAllBatches] = useState(plant);

  const [todayDate] = useState<string>(moment().format('l'));

  // inputs for adding plant
  const [currentAddPlant, setCurrentAddPlant] = useState<Plant>(initPlant);
  const [addPlantDate, setAddPlantDate] = useState<string>(todayDate);

  // inputs for editing plant
  const [currentEditingPlant, setCurrentEditingPlant] = useState<Plant>(
    {} as Plant
  );

  // add popup
  const [showAddPlantPopUp, setShowAddPlantPopUp] = useState<boolean>(false);
  const openAddPlantPopUp = () => setShowAddPlantPopUp(true);
  const closeAddPlantPopUp = () => setShowAddPlantPopUp(false);

  // edit popup
  const [showEditPlantPopUp, setShowEditPlantPopUp] = useState<boolean>(false);
  const closeEditPlantPopUp = () => {
    setShowEditPlantPopUp(false);
    setCurrentEditingPlant({} as Plant);
  };
  const openEditPlantPopUp = (selectedPlant: Plant) => {
    setShowEditPlantPopUp(true);
    setCurrentEditingPlant(selectedPlant);
  };

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
        closeAddPlantPopUp();
      }
    });

    // read from json db
    jsonConnector.readPlantDB();

    // fade in
    setFadeIn(true);

    return () => {
      setFadeIn(false);
    };
  }, [jsonConnector]);

  const updatePlant = (targetPlantID: string, updatedPlant: Plant) => {
    // jsonConnector.appendPlantToDB()
  };

  const deletePlant = (targetPlantID: string) => {
    // jsonConnector.appendPlantToDB()
  };

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
          RenderPlantCards(batch, key, { openEditPlantPopUp })
        );
      case 'vegetation':
        return vegetationBatches.map((batch, key) =>
          RenderPlantCards(batch, key, { openEditPlantPopUp })
        );
      case 'flowering':
        return floweringBatches.map((batch, key) =>
          RenderPlantCards(batch, key, { openEditPlantPopUp })
        );
      case 'harvested':
        return harvestedBatches.map((batch, key) =>
          RenderPlantCards(batch, key, { openEditPlantPopUp })
        );
      default:
        return <h2>None</h2>;
    }
  };

  // render grow room chart information
  const renderGraph = () => {
    return (
      <svg
        width={300}
        height={300}
        style={{ backgroundColor: '#fff', borderRadius: '2em', margin: 'auto' }}
      >
        {/* <GradientPinkBlue
          id="pieFill"
          style={{ height: '100%', width: '100%' }}
        /> */}
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

  const onAddChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    // currentAddPlant.name = event.target.value;
    setCurrentAddPlant((prevState: Plant) => {
      return {
        ...prevState,
        name: event.target.value,
      };
    });
  };

  const onAddChangeDomiant = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAddPlant((prevState: Plant) => {
      return {
        ...prevState,
        dominant: (event.target as HTMLInputElement).value,
      };
    });
  };

  const onAddChangeSeedType = (event: SelectChangeEvent) => {
    setCurrentAddPlant((prevState: Plant) => {
      return {
        ...prevState,
        seedType: event.target.value,
      };
    });
  };

  const onAddChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAddPlant((prevState: Plant) => {
      return {
        ...prevState,
        amount: Number(event.target.value),
      };
    });
  };

  const onAddChangeThc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAddPlant((prevState: Plant) => {
      return {
        ...prevState,
        thc: Number(event.target.value),
      };
    });
  };

  const onAddChangeCbd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAddPlant((prevState: Plant) => {
      return {
        ...prevState,
        cbd: Number(event.target.value),
      };
    });
  };

  const onAddChangeDate = (newValue: moment.Moment | null) => {
    if (newValue) {
      setCurrentAddPlant((prevState: Plant) => {
        return {
          ...prevState,
          plantDate: newValue.format('l'),
        };
      });
    }
  };

  const onAddChangeStage = (event: SelectChangeEvent) => {
    setCurrentAddPlant((prevState: Plant) => {
      return {
        ...prevState,
        stage: event.target.value,
      };
    });
  };

  // clear and close add plant popup
  const clearAddPlantPopup = () => {
    console.log(currentAddPlant);
    setAddPlantDate(todayDate);
    setCurrentAddPlant({} as Plant);
    closeAddPlantPopUp();
  };

  // add plant to jsonDB
  const addPlant = () => {
    currentAddPlant.plantDate = addPlantDate;
    if (
      currentAddPlant.name === '' ||
      currentAddPlant.dominant === '' ||
      currentAddPlant.seedType === '' ||
      currentAddPlant.plantDate === '' ||
      currentAddPlant.stage === ''
    ) {
      console.log(
        'please fill out the plant information, all entries are required.'
      );
      return;
    }
    jsonConnector.appendPlantToDB(currentAddPlant);
    clearAddPlantPopup();
  };

  const renderAddPlantPopup = () => {
    return (
      <Modal
        className="unselectable"
        open={showAddPlantPopUp}
        onClose={closeAddPlantPopUp}
      >
        <Box className="plantModalBox disableOutline">
          <h1 style={{ textAlign: 'center' }}>🎍Add New Plant</h1>
          <div className="plantModalContent">
            <FormControl style={formControlStyle}>
              <TextField
                label="Plant Name"
                id="add-plant-name"
                size="medium"
                type="text"
                variant="filled"
                onChange={onAddChangeName}
                value={currentAddPlant.name}
                sx={textFieldStyle}
              />
              <FormLabel
                style={{ color: textColor }}
                id="add-row-radio-buttons-group-label"
              >
                Dominant
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="add-row-radio-buttons-group-label"
                name="row-radio-buttons-group1"
                onChange={onAddChangeDomiant}
                value={currentAddPlant.dominant}
              >
                <FormControlLabel
                  value="indica"
                  control={<Radio sx={indicaRadioStyle} />}
                  label="Indica"
                />
                <FormControlLabel
                  color={textColor}
                  value="sativa"
                  control={<Radio sx={sativaRadioStyle} />}
                  label="Sativa"
                />
                <FormControlLabel
                  style={{ color: textColor }}
                  value="hybrid"
                  control={<Radio sx={hybridRadioStyle} />}
                  label="Hybrid"
                />
              </RadioGroup>
              <TextField
                label="Amount"
                id="add-plant-amount"
                size="medium"
                variant="filled"
                type="number"
                sx={textFieldStyle}
                value={currentAddPlant.amount}
                onChange={onAddChangeAmount}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={typographyStyle}>
                      Plants
                    </InputAdornment>
                  ),
                  inputProps: { min: 0 },
                }}
              />
              <FormControl>
                <FormLabel
                  style={{ color: textColor }}
                  id="seed-type-select-filled-label"
                >
                  Seed Type
                </FormLabel>
                <Select
                  labelId="seed-type-select-filled-label"
                  id="seed-type-select-filled"
                  variant="filled"
                  size="small"
                  onChange={onAddChangeSeedType}
                  value={currentAddPlant.seedType}
                  sx={selectInputStyle}
                >
                  <MenuItem value="regular">Regular</MenuItem>
                  <MenuItem value="femenized">Femenized</MenuItem>
                  <MenuItem value="autoflower">Autoflower</MenuItem>
                  <MenuItem value="unknown">Unknown</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Plant Date"
                  inputFormat="MM/DD/YYYY"
                  value={currentAddPlant.plantDate}
                  onChange={onAddChangeDate}
                  renderInput={(params) => {
                    return (
                      <TextField
                        sx={textFieldStyle}
                        size="medium"
                        variant="filled"
                        {...params}
                      />
                    );
                  }}
                />
              </LocalizationProvider>
              <TextField
                label="THC Content"
                id="add-thc-content"
                size="medium"
                variant="filled"
                type="number"
                sx={textFieldStyle}
                value={currentAddPlant.thc}
                onChange={onAddChangeThc}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={typographyStyle}>
                      %
                    </InputAdornment>
                  ),
                  inputProps: { min: 0 },
                }}
              />
              <TextField
                label="CBD Content"
                id="add-cbd-content"
                size="medium"
                variant="filled"
                type="number"
                sx={textFieldStyle}
                value={currentAddPlant.cbd}
                onChange={onAddChangeCbd}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={typographyStyle}>
                      %
                    </InputAdornment>
                  ),
                  inputProps: { min: 0 },
                }}
              />
              <FormControl>
                <FormLabel
                  style={{ color: textColor }}
                  id="plant-stage-select-filled-label"
                >
                  Plant Stage
                </FormLabel>
                <Select
                  labelId="plant-stage-select-filled-label"
                  id="plant-stage-select-filled"
                  variant="filled"
                  size="small"
                  onChange={onAddChangeStage}
                  value={currentAddPlant.stage}
                  sx={selectInputStyle}
                >
                  <MenuItem value="germination">Germination</MenuItem>
                  <MenuItem value="vegetation">Vegetation</MenuItem>
                  <MenuItem value="flowering">Flowering</MenuItem>
                  <MenuItem value="harvested">Harvested</MenuItem>
                </Select>
              </FormControl>
            </FormControl>
          </div>
          <div className="plantModalFooter">
            <Chip
              color="error"
              label="Close"
              onClick={clearAddPlantPopup}
              style={{ marginRight: '20px' }}
            />
            <Chip color="success" label="Add Plant" onClick={addPlant} />
          </div>
        </Box>
      </Modal>
    );
  };

  const renderEditPlantPopup = () => {
    return (
      <Modal
        className="unselectable"
        open={showEditPlantPopUp}
        onClose={closeEditPlantPopUp}
      >
        <Box className="plantModalBox disableOutline">
          <h2>Edit Plant</h2>
          <div className="plantModalContent">
            <FormControl>
              <TextField
                label="Name"
                id="plant-id"
                defaultValue={currentEditingPlant.name}
                size="medium"
                variant="standard"
              />
              <TextField
                disabled
                label="ID"
                id="plant-id"
                defaultValue={currentEditingPlant.id}
                size="medium"
                variant="standard"
              />
              <FormLabel id="demo-row-radio-buttons-group-label">
                Dominant
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group1"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              <TextField
                label="Amount"
                id="plant-amount"
                defaultValue={currentEditingPlant.amount}
                size="medium"
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Plants</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="THC"
                id="plant-thc"
                defaultValue={currentEditingPlant.thc}
                size="medium"
                variant="standard"
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="CBD"
                id="plant-cbd"
                defaultValue={currentEditingPlant.cbd}
                size="medium"
                variant="standard"
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
              <FormLabel id="seed-type-radio-group">Seed Type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="seed-type-radio-group"
                name="row-seed-type-radio-group"
              >
                <FormControlLabel
                  value="feminized"
                  control={<Radio />}
                  label="Feminized"
                />
                <FormControlLabel
                  value="autoflowering"
                  control={<Radio />}
                  label="Autoflowering"
                />
                <FormControlLabel
                  value="normal"
                  control={<Radio />}
                  label="Normal"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="plantModalFooter">
            <Chip color="error" label="Close" onClick={closeEditPlantPopUp} />
            <Chip color="success" label="Add Plant" onClick={addPlant} />
          </div>
        </Box>
      </Modal>
    );
  };

  const gridStyle = { margin: 'auto', marginTop: '0' };
  return (
    <Fade in>
      <div className="growRoomManager unselectable componentWindow">
        <div className="header" style={{ paddingTop: '30px' }}>
          {/* {renderGraph()} */}
          {renderAddPlantPopup()}
          {renderEditPlantPopup()}
          <Tooltip title="Add New Plant" disableInteractive placement="top">
            <Fab
              onClick={openAddPlantPopUp}
              color="success"
              aria-label="add"
              style={{
                margin: 'auto',
                display: 'flex',
              }}
            >
              <AddCircle />
            </Fab>
          </Tooltip>
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
    </Fade>
  );
};

export default GrowRoomManager;
