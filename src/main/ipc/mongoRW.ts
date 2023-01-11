/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { ipcMain, IpcMainEvent } from 'electron';
import { Plant } from 'renderer/utilities/Types';
import { v4 as uuidv4 } from 'uuid';

const serverIP = 'http://localhost:3000';

// read and write to mongo db
const addJsonRW = () => {
  ipcMain.on('readPlantMongoDB', async (event: IpcMainEvent): Promise<void> => {
    const result = await axios.get(`${serverIP}/plants/all`);
    console.log(result.data);

    event.reply('readPlantMongoDB', result.data);
  });

  ipcMain.on(
    'createPlantMongoDB',
    async (event: IpcMainEvent, plant: Plant): Promise<void> => {
      plant._id = uuidv4();
      const result = await axios.post(`${serverIP}/plants/create`, plant);
      event.reply('createPlantMongoDB', result.data);
    }
  );

  ipcMain.on(
    'deletePlantMongoDB',
    async (event: IpcMainEvent, id: string): Promise<void> => {
      console.log(`delete plant ${serverIP}/plants/${id}`);
      const result = await axios.delete(`${serverIP}/plants/${id}`);
      event.reply('deletePlantMongoDB', result.data);
    }
  );

  ipcMain.on(
    'updatePlantMongoDB',
    async (event: IpcMainEvent, id: string, plant: Plant): Promise<void> => {
      const result = await axios.put(`${serverIP}/plants/${id}`, plant);
      event.reply('updatePlantMongoDB', result.data);
    }
  );

  ipcMain.on(
    'findPlantMongoDB',
    async (event: IpcMainEvent, id: string): Promise<void> => {
      const result = await axios.get(`${serverIP}/plants/${id}`);
      event.reply('updatePlantMongoDB', result.data);
    }
  );
};

export default addJsonRW;
