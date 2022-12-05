import Plant from './Types';

// all local json read and write function
// read a json file and load all plant objects
const readPlantDB = (filePath: string): void => {
  window.electron.ipcRenderer.readPlantJsonDB(filePath);
};

// append a plant object to database json file
const appendPlantToDB = (filePath: string, newPlant: Plant): void => {
  window.electron.ipcRenderer.appendPlantToDB(filePath, newPlant);
};

export { readPlantDB, appendPlantToDB };
