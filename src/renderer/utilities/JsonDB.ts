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

  updatePlantToDB = (targetPlantId: string, newPlant: Plant): void => {
    window.electron.ipcRenderer.updatePlantToDB(
      this.filePath,
      targetPlantId,
      newPlant
    );
  };
}

export default JsonDBConnector;
