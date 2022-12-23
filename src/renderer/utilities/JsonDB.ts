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
    window.electron.ipcRenderer.appendPlantToJsonDB(this.filePath, newPlant);
  }

  updatePlantToDB = (targetPlantId: string, newPlant: Plant): void => {
    window.electron.ipcRenderer.updatePlantToJsonDB(
      this.filePath,
      targetPlantId,
      newPlant
    );
  };

  deletePlantFromDB = (targetPlantId: string): void => {
    console.log(targetPlantId);
    window.electron.ipcRenderer.deletePlantFromJsonDB(
      this.filePath,
      targetPlantId
    );
  };
}

export default JsonDBConnector;
