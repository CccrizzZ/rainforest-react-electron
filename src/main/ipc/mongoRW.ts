import axios from 'axios';
import { ipcMain } from 'electron';
import { Plant } from 'renderer/utilities/Types';

const serverIP = 'http://localhost:3000';

// read and write to mongo db
const addJsonRW = () => {
  ipcMain.on('readPlantMongoDB', async (event): Promise<void> => {
    event.preventDefault();

    const result = await axios.get(`${serverIP}/plants/all`);
    console.log(result.data);

    event.reply('readPlantMongoDB', result.data);
  });
};

export default addJsonRW;
