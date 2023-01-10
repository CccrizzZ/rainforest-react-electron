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
  static appendPlantToMongoDB(newPlant: Plant): void {
    window.electron.ipcRenderer.appendPlantToMongoDB();
  }

  // update a plant to mongodb

  // delete a plant from mongodb
}

export default MongoDBConnector;
