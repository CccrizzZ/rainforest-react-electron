/* eslint-disable no-underscore-dangle */
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
import { Add, Refresh } from '@mui/icons-material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import JsonDBConnector from '../utilities/JsonDB';
import MongoDBConnector from '../utilities/MongoDB';
import { Plant } from '../utilities/Types';
import { globalColor, formControlStyle } from '../style/GlobalStyle';
import RenderPlantCards from './RenderPlantCard';
import EventCalender from './widget/EventCalender';
import '../style/GrowRoomManager.css';

const initPlant: Plant = {
  _id: '',
  name: '',
  dominant: 'indica',
  amount: 1,
  thc: 0,
  cbd: 0,
  plantDate: moment().format('l'),
  stage: 'germination',
  seedType: 'regular',
  growingMedia: 'hydroponics',
};

const indicaRadioStyle = {
  color: globalColor.indicaColor,
  '&.Mui-checked': {
    color: globalColor.indicaColor,
  },
};

const sativaRadioStyle = {
  color: globalColor.sativaColor,
  '&.Mui-checked': {
    color: globalColor.sativaColor,
  },
};

const hybridRadioStyle = {
  color: globalColor.hybridColor,
  '&.Mui-checked': {
    color: globalColor.hybridColor,
  },
};

const typographyStyle = {
  '& .MuiTypography-root': {
    color: globalColor.textColor,
  },
};

const textColorObj = {
  color: globalColor.textColor,
  fontFamily: 'sfPro',
};

const textFieldStyle = {
  '& label.Mui-focused': textColorObj,
  '& .MuiInputLabel-root': textColorObj,
  '& .MuiSvgIcon-root': textColorObj,
  '& .MuiFilledInput-root': {
    backgroundColor: '#101010',
    fontFamily: 'sfPro',
  },
  '& .MuiFilledInput-input': {
    color: '#fff',
    fontFamily: 'sfPro',
  },
  '& .MuiFilledInput-root:after': {
    borderBottom: `2px solid ${globalColor.textColor}`,
  },
};

const selectInputStyle = {
  '& .MuiSelect-icon': textColorObj,
  '& .MuiFilledInput-input': {
    color: '#fff',
    fontFamily: 'sfPro',
  },
};

const radioLabel = {
  '& .MuiTypography-root': {
    fontFamily: 'sfPro',
  },
};

const GrowRoomManager = (): JSX.Element => {
  const [jsonPath] = useState('./db.json');
  const [jsonConnector] = useState<JsonDBConnector>(
    new JsonDBConnector(jsonPath)
  );

  // all cultivars batches data
  const [allBatches, setAllBatches] = useState<Plant[]>([] as Plant[]);

  // inputs for adding plant
  const [currentPlant, setCurrentPlant] = useState<Plant>(initPlant);

  // add popup
  const [showAddPlantPopup, setShowAddPlantPopup] = useState<boolean>(false);
  const openAddPlantPopup = (): void => setShowAddPlantPopup(true);
  const closeAddPlantPopup = (): void => setShowAddPlantPopup(false);

  // edit popup
  const [showEditPlantPopup, setShowEditPlantPopup] = useState<boolean>(false);
  const closeEditPlantPopup = (): void => setShowEditPlantPopup(false);
  const openEditPlantPopup = (selectedPlant: Plant): void => {
    setShowEditPlantPopup(true);
    setCurrentPlant(selectedPlant);
  };

  useEffect(() => {
    // fetch all plant data
    const refreshPlant = (): void => {
      MongoDBConnector.readPlantDB();
      closeAddPlantPopup();
    };

    const ipcR = window.electron.ipcRenderer;

    // json db operation
    // ipcR.on('readPlantJsonDB', (arg) => {
    //   const db = JSON.parse(arg as string);
    //   setAllBatches(db);
    // });
    // ipcR.on('appendPlantToJsonDB', (arg) => {
    //   if (arg === 'cannot find file') {
    //     alert('cannot find json.db');
    //   } else {
    //     refreshPlant();
    //   }
    // });
    // ipcR.on('updatePlantToJsonDB', (arg) => {
    //   if (arg === 'cannot find file') {
    //     alert('cannot find json.db');
    //   } else {
    //     refreshPlant();
    //   }
    // });
    // ipcR.on('deletePlantFromJsonDB', (arg) => {
    //   if (arg === 'cannot find file') {
    //     alert('cannot find json.db');
    //   } else {
    //     refreshPlant();
    //   }
    // });

    // mongodb listenser
    ipcR.on('readPlantMongoDB', (arg) => {
      const db: Plant[] = [];
      (arg as Plant[]).forEach((element) => {
        db.push(element);
      });
      setAllBatches(db);
    });
    ipcR.on('createPlantMongoDB', () => {
      refreshPlant();
    });
    ipcR.on('deletePlantMongoDB', () => {
      refreshPlant();
    });
    ipcR.on('updatePlantMongoDB', () => {
      refreshPlant();
    });

    // read plants data from mongodb
    refreshPlant();
  }, []);

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
          RenderPlantCards(batch, key, { openEditPlantPopup })
        );
      case 'vegetation':
        return vegetationBatches.map((batch, key) =>
          RenderPlantCards(batch, key, { openEditPlantPopup })
        );
      case 'flowering':
        return floweringBatches.map((batch, key) =>
          RenderPlantCards(batch, key, { openEditPlantPopup })
        );
      case 'harvested':
        return harvestedBatches.map((batch, key) =>
          RenderPlantCards(batch, key, { openEditPlantPopup })
        );
      default:
        return <h2>None</h2>;
    }
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentPlant((prevState: Plant) => {
      return {
        ...prevState,
        name: event.target.value,
      };
    });
  };

  const onChangeDomiant = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCurrentPlant((prevState: Plant) => {
      return {
        ...prevState,
        dominant: (event.target as HTMLInputElement).value,
      };
    });
  };

  const onChangeSeedType = (event: SelectChangeEvent): void => {
    setCurrentPlant((prevState: Plant) => {
      return {
        ...prevState,
        seedType: event.target.value,
      };
    });
  };

  const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentPlant((prevState: Plant) => {
      return {
        ...prevState,
        amount: Number(event.target.value),
      };
    });
  };

  const onChangeThc = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentPlant((prevState: Plant) => {
      return {
        ...prevState,
        thc: Number(event.target.value),
      };
    });
  };

  const onChangeCbd = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentPlant((prevState: Plant) => {
      return {
        ...prevState,
        cbd: Number(event.target.value),
      };
    });
  };

  const onChangeDate = (newValue: moment.Moment | null): void => {
    if (newValue) {
      setCurrentPlant((prevState: Plant) => {
        return {
          ...prevState,
          plantDate: newValue.format('l'),
        };
      });
    }
  };

  const onChangeStage = (event: SelectChangeEvent): void => {
    setCurrentPlant((prevState: Plant) => {
      return {
        ...prevState,
        stage: event.target.value,
      };
    });
  };

  const onChangeGrowingMedia = (event: SelectChangeEvent): void => {
    setCurrentPlant((prevState: Plant) => {
      return {
        ...prevState,
        growingMedia: event.target.value,
      };
    });
  };

  // check for absent field on batch data
  const isNotCompleted = (): boolean => {
    if (currentPlant.name === '') {
      alert('warning: form not completed');
      return true;
    }
    return false;
  };

  // clear and close add plant popup
  const clearPlantPopup = (): void => {
    setCurrentPlant({} as Plant);
    if (showAddPlantPopup) {
      closeAddPlantPopup();
    } else {
      closeEditPlantPopup();
    }
  };

  const deletePlant = (): void => {
    // jsonConnector.deletePlantFromDB(currentPlant._id);
    MongoDBConnector.deletePlantMongoDB(currentPlant._id);
    clearPlantPopup();
  };

  const updatePlant = (): void => {
    if (isNotCompleted()) {
      // alert the user these are required elements
      console.log(
        'please fill out the plant information, all entries are required.'
      );
      return;
    }
    // jsonConnector.updatePlantToDB(currentPlant._id, currentPlant);
    MongoDBConnector.updatePlantMongoDB(currentPlant._id, currentPlant);
    console.log('updating plant');
    clearPlantPopup();
  };

  const addPlant = (): void => {
    console.log('adding new plant...');
    if (isNotCompleted()) {
      // alert the user these are required elements
      console.log(
        'please fill out the plant information, all entries are required.'
      );
      return;
    }
    // jsonConnector.appendPlantToDB(currentPlant);
    MongoDBConnector.createPlantMongoDB(currentPlant);
    clearPlantPopup();
  };

  const renderAddPlantPopup = (): JSX.Element => {
    return (
      <Modal
        className="unselectable"
        open={showAddPlantPopup}
        onClose={closeAddPlantPopup}
      >
        <Box className="plantModalBox disableOutline">
          <h1 style={{ textAlign: 'center' }}>🎍Add New Cultivar</h1>
          <div className="plantModalContent">
            <FormControl style={formControlStyle}>
              <TextField
                label="Plant Name"
                id="add-plant-name"
                size="medium"
                type="text"
                variant="filled"
                onChange={onChangeName}
                value={currentPlant.name}
                sx={textFieldStyle}
              />
              <FormLabel
                style={textColorObj}
                id="add-row-radio-buttons-group-label"
              >
                Dominant
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="add-row-radio-buttons-group-label"
                name="row-radio-buttons-group1"
                onChange={onChangeDomiant}
                value={currentPlant.dominant}
                defaultValue={currentPlant.dominant}
              >
                <FormControlLabel
                  value="indica"
                  control={<Radio sx={indicaRadioStyle} />}
                  label="Indica"
                  sx={radioLabel}
                />
                <FormControlLabel
                  value="sativa"
                  control={<Radio sx={sativaRadioStyle} />}
                  label="Sativa"
                  sx={radioLabel}
                />
                <FormControlLabel
                  value="hybrid"
                  control={<Radio sx={hybridRadioStyle} />}
                  label="Hybrid"
                  sx={radioLabel}
                />
              </RadioGroup>
              <TextField
                label="Amount"
                id="add-plant-amount"
                size="medium"
                variant="filled"
                type="number"
                sx={textFieldStyle}
                value={currentPlant.amount}
                onChange={onChangeAmount}
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
                  style={textColorObj}
                  id="seed-type-select-filled-label"
                >
                  Seed Type
                </FormLabel>
                <Select
                  labelId="seed-type-select-filled-label"
                  id="seed-type-select-filled"
                  variant="filled"
                  size="small"
                  onChange={onChangeSeedType}
                  value={currentPlant.seedType}
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
                  value={currentPlant.plantDate}
                  onChange={onChangeDate}
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
                value={currentPlant.thc}
                onChange={onChangeThc}
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
                value={currentPlant.cbd}
                onChange={onChangeCbd}
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
                  style={textColorObj}
                  id="plant-stage-select-filled-label"
                >
                  Plant Stage
                </FormLabel>
                <Select
                  labelId="plant-stage-select-filled-label"
                  id="plant-stage-select-filled"
                  variant="filled"
                  size="small"
                  onChange={onChangeStage}
                  value={currentPlant.stage}
                  sx={selectInputStyle}
                >
                  <MenuItem value="germination">Germination</MenuItem>
                  <MenuItem value="vegetation">Vegetation</MenuItem>
                  <MenuItem value="flowering">Flowering</MenuItem>
                  <MenuItem value="harvested">Harvested</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel style={textColorObj} id="add-grow-medium-label">
                  Growing Media
                </FormLabel>
                <Select
                  labelId="add-grow-medium-label"
                  id="add-grow-medium-label"
                  variant="filled"
                  size="small"
                  onChange={onChangeGrowingMedia}
                  value={currentPlant.growingMedia}
                  sx={selectInputStyle}
                >
                  <MenuItem value="soil">Soil With Nutrients</MenuItem>
                  <MenuItem value="dwc">Deep Water Culture</MenuItem>
                  <MenuItem value="aeroponics">Aeroponics</MenuItem>
                  <MenuItem value="drip">Drip</MenuItem>
                  <MenuItem value="organic">Organic</MenuItem>
                </Select>
              </FormControl>
            </FormControl>
          </div>
          <div className="plantModalFooter">
            <Chip
              color="error"
              label="Close"
              onClick={clearPlantPopup}
              style={{ marginRight: '20px' }}
            />
            <Chip color="success" label="Add Plant" onClick={addPlant} />
          </div>
        </Box>
      </Modal>
    );
  };

  const renderEditPlantPopup = (): JSX.Element => {
    return (
      <Modal
        className="unselectable"
        open={showEditPlantPopup}
        onClose={closeAddPlantPopup}
      >
        <Box className="plantModalBox disableOutline">
          <h1 style={{ textAlign: 'center' }}>🌿Edit Cultivar Info</h1>
          <div className="plantModalContent">
            <Chip
              style={{ marginLeft: '20px' }}
              color="error"
              label="Delete"
              onClick={deletePlant}
            />
            <FormControl style={formControlStyle}>
              <TextField
                label="Plant Name"
                id="edit-plant-name"
                size="medium"
                type="text"
                variant="filled"
                onChange={onChangeName}
                value={currentPlant.name}
                sx={textFieldStyle}
              />
              <FormLabel
                style={textColorObj}
                id="edit-row-radio-buttons-group-label"
              >
                Dominant
              </FormLabel>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="edit-row-radio-buttons-group-label"
                  name="edit-row-radio-buttons-group1"
                  onChange={onChangeDomiant}
                  value={currentPlant.dominant}
                  defaultValue={currentPlant.dominant}
                >
                  <FormControlLabel
                    value="indica"
                    control={<Radio sx={indicaRadioStyle} />}
                    label="Indica"
                    sx={radioLabel}
                  />
                  <FormControlLabel
                    value="sativa"
                    control={<Radio sx={sativaRadioStyle} />}
                    label="Sativa"
                    sx={radioLabel}
                  />
                  <FormControlLabel
                    value="hybrid"
                    control={<Radio sx={hybridRadioStyle} />}
                    label="Hybrid"
                    sx={radioLabel}
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                label="Amount"
                id="edit-plant-amount"
                size="medium"
                variant="filled"
                type="number"
                sx={textFieldStyle}
                value={currentPlant.amount}
                onChange={onChangeAmount}
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
                  style={textColorObj}
                  id="edit-seed-type-select-filled-label"
                >
                  Seed Type
                </FormLabel>
                <Select
                  labelId="edit-seed-type-select-filled-label"
                  id="edit-seed-type-select-filled"
                  variant="filled"
                  size="small"
                  onChange={onChangeSeedType}
                  value={currentPlant.seedType}
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
                  value={currentPlant.plantDate}
                  onChange={onChangeDate}
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
              <FormControl>
                <TextField
                  label="THC Content"
                  id="edit-thc-content"
                  size="medium"
                  variant="filled"
                  type="number"
                  sx={textFieldStyle}
                  value={currentPlant.thc}
                  onChange={onChangeThc}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={typographyStyle}>
                        %
                      </InputAdornment>
                    ),
                    inputProps: { min: 0 },
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  label="CBD Content"
                  id="edit-cbd-content"
                  size="medium"
                  variant="filled"
                  type="number"
                  sx={textFieldStyle}
                  value={currentPlant.cbd}
                  onChange={onChangeCbd}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={typographyStyle}>
                        %
                      </InputAdornment>
                    ),
                    inputProps: { min: 0 },
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  style={textColorObj}
                  id="edit-plant-stage-select-filled-label"
                >
                  Plant Stage
                </FormLabel>
                <Select
                  labelId="edit-plant-stage-select-filled-label"
                  id="edit-plant-stage-select-filled"
                  variant="filled"
                  size="small"
                  onChange={onChangeStage}
                  value={currentPlant.stage}
                  sx={selectInputStyle}
                >
                  <MenuItem value="germination">Germination</MenuItem>
                  <MenuItem value="vegetation">Vegetation</MenuItem>
                  <MenuItem value="flowering">Flowering</MenuItem>
                  <MenuItem value="harvested">Harvested</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel style={textColorObj} id="edit-grow-medium-label">
                  Growing Media
                </FormLabel>
                <Select
                  labelId="edit-grow-medium-label"
                  id="edit-grow-medium-label"
                  variant="filled"
                  size="small"
                  onChange={onChangeGrowingMedia}
                  value={currentPlant.growingMedia}
                  sx={selectInputStyle}
                >
                  <MenuItem value="soil">Soil With Nutrients</MenuItem>
                  <MenuItem value="dwc">Deep Water Culture</MenuItem>
                  <MenuItem value="aeroponics">Aeroponics</MenuItem>
                  <MenuItem value="drip">Drip</MenuItem>
                  <MenuItem value="organic">Organic</MenuItem>
                </Select>
              </FormControl>
            </FormControl>
          </div>
          <div className="plantModalFooter">
            <Chip
              color="error"
              label="Close"
              onClick={clearPlantPopup}
              style={{ marginRight: '20px' }}
            />
            <Chip color="success" label="Save" onClick={updatePlant} />
          </div>
        </Box>
      </Modal>
    );
  };

  const gridStyle = { margin: 'auto', marginTop: '0' };
  const matrixStyle = {
    padding: '20px',
    border: '1px solid black',
    borderRadius: '1em',
    backgroundColor: globalColor.moduleBGColor,
    margin: '10px',
  };
  const growRoomMatrix = (): JSX.Element => {
    return (
      <div style={matrixStyle}>
        <h1 style={{ display: 'table', margin: 'auto', marginTop: '10px' }}>
          Grow Room Matrix
        </h1>
        <div
          style={{
            display: 'flex',
            width: '50%',
            margin: 'auto',
            padding: '20px',
          }}
        >
          <Tooltip title="Add New Plant" disableInteractive placement="top">
            <Fab
              onClick={openAddPlantPopup}
              color="success"
              aria-label="add"
              style={{
                margin: 'auto',
                display: 'flex',
              }}
            >
              <Add />
            </Fab>
          </Tooltip>
          <Tooltip title="Refresh" disableInteractive placement="top">
            <Fab
              onClick={() => {
                MongoDBConnector.readPlantDB();
              }}
              color="primary"
              aria-label="refresh"
              style={{
                margin: 'auto',
                display: 'flex',
              }}
            >
              <Refresh />
            </Fab>
          </Tooltip>
        </div>
        <Grid
          container
          alignItems="stretch"
          style={{
            backgroundColor: globalColor.lightDarkColor,
            borderRadius: '1em',
            padding: '10px',
          }}
        >
          <Grid className="germinationCol slots" style={gridStyle}>
            <h1>Germination</h1>
            {getPlants(`germination`)}
          </Grid>
          <Grid className="vegetationCol slots" style={gridStyle}>
            <h1>Vegetation</h1>
            {getPlants(`vegetation`)}
          </Grid>
          <Grid className="floweringCol slots" style={gridStyle}>
            <h1>Flowering</h1>
            {getPlants(`flowering`)}
          </Grid>
          <Grid className="harvestedCol slots" style={gridStyle}>
            <h1>Harvested</h1>
            {getPlants(`harvested`)}
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <Fade in>
      <div className="growRoomManager unselectable componentWindow">
        <div className="header" style={{ paddingTop: '30px' }}>
          <EventCalender />
          {renderAddPlantPopup()}
          {renderEditPlantPopup()}
          {growRoomMatrix()}
        </div>
      </div>
    </Fade>
  );
};

export default GrowRoomManager;
