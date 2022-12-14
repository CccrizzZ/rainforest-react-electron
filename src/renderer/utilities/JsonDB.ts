import { Plant } from './Types';

class JsonDBConnector {
  public filePath: string;

  constructor(infilePath: string) {
    this.filePath = infilePath;
  }

  // read a json file and load all plant objects
  readPlantDB(): void {
    window.electron.ipcRenderer.readPlantJsonDB(this.filePath);
  }

  // append a plant object to database json file
  appendPlantToDB(newPlant: Plant): void {
    window.electron.ipcRenderer.appendPlantToDB(this.filePath, newPlant);
  }

  // // append a plant object to database json file
  // public deletePlantFromDB = (targetPlant: Plant): void => {
  //   window.electron.ipcRenderer.deletePlantFromDB(this.filePath, targetPlant);
  // };

  // // append a plant object to database json file
  // public updatePlantFromDB = (targetPlant: Plant, newPlant: Plant): void => {
  //   window.electron.ipcRenderer.updatePlantFromDB(this.filePath, targetPlant, newPlant);
  // };
}

export default JsonDBConnector;
