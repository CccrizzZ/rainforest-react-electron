import { ipcMain } from 'electron';
import fs from 'fs';
import { Plant } from '../../renderer/utilities/Types';

// read and write json file
const addJsonRW = () => {
  // read plants data from local json file
  ipcMain.on('readPlantJsonDB', async (event, filePath) => {
    event.preventDefault();
    let jsonData = {};

    // reads the json file if it exist
    if (fs.existsSync(filePath)) {
      console.log('--JSON database exist, reading...');
      fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        jsonData = data.toString();
        console.log(`JSON Data: ${jsonData}`);
        event.reply('readPlantJsonDB', jsonData);
      });
    } else {
      // create a new json file if db not exist
      console.log('--cannot find JSON database, creating a new one...');
      fs.writeFileSync(filePath, '[]');
      event.reply('readPlantJsonDB', JSON.stringify([]));
    }
  });

  // append plants data to local json file
  ipcMain.on(
    'appendPlantToJsonDB',
    async (event, filePath: string, newPlant: Plant) => {
      event.preventDefault();

      // read and append
      if (fs.existsSync(filePath)) {
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          const jsonData = JSON.parse(data.toString());
          jsonData.push(newPlant);

          // write the updated db to json file
          fs.writeFileSync(filePath, JSON.stringify(jsonData));
          event.reply('appendPlantToJsonDB', JSON.stringify(jsonData));
        });
      } else {
        // reply to ipc renderer that the file is not found
        event.reply('appendPlantToJsonDB', 'cannot find file');
      }
    }
  );
};

export default addJsonRW;
