import { Component } from 'react';
import { Plant } from './Types';

class JsonDBConnector {
  public filePath: string;

  constructor(infilePath: string) {
    this.filePath = infilePath;
    console.log(`Json Database: ${this.filePath}`);
  }

  // all local json read and write function
  // read a json file and load all plant objects
  readPlantDB(): void {
    console.log(`RJson Database: ${this.filePath}`);
    window.electron.ipcRenderer.readPlantJsonDB(this.filePath);
  }

  // append a plant object to database json file
  appendPlantToDB(newPlant: Plant): void {
    console.log(`AJson Database: ${this.filePath}`);
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
