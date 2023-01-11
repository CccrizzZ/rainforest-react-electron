/* eslint-disable no-underscore-dangle */
import { Plant } from './Types';

class MongoDBConnector {
  constructor() {
    console.log('mongo db connector build');
  }

  // read from mongodb for all plants data
  static readPlantDB(): void {
    window.electron.ipcRenderer.readPlantMongoDB();
  }

  // add a plant to mongodb
  static createPlantMongoDB(newPlant: Plant): void {
    window.electron.ipcRenderer.createPlantMongoDB(newPlant);
  }

  // update a plant to mongodb
  static updatePlantMongoDB(id: string, newPlant: Plant): void {
    window.electron.ipcRenderer.updatePlantMongoDB(id, newPlant);
  }

  // delete a plant from mongodb
  static deletePlantMongoDB(id: string): void {
    window.electron.ipcRenderer.deletePlantMongoDB(id);
  }
}

export default MongoDBConnector;
