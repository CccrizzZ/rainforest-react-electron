/* eslint-disable no-underscore-dangle */
import { ipcMain } from 'electron';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Plant } from '../../renderer/utilities/Types';

// regenerate id if repeted
const generateId = (jsonData: Plant[]): string => {
  const uuid = uuidv4();
  jsonData.forEach((plant: Plant) => {
    if (plant._id === uuid) {
      generateId(jsonData);
    }
  });
  return uuid;
};

// read and write json file
const addJsonRW = () => {
  // read plants data from local json file
  ipcMain.on('readPlantJsonDB', async (event, filePath): Promise<void> => {
    event.preventDefault();
    let jsonData = {};

    // reads the json file if it exist
    if (fs.existsSync(filePath)) {
      console.log('--JSON database exist, reading...');
      fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        jsonData = data.toString();
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
    async (event, filePath: string, newPlant: Plant): Promise<void> => {
      event.preventDefault();

      // read and append
      if (fs.existsSync(filePath)) {
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          const jsonData = JSON.parse(data.toString());
          newPlant._id = generateId(jsonData);
          console.log(newPlant._id);
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

  // update plants data to local json file
  ipcMain.on(
    'updatePlantToJsonDB',
    async (
      event,
      filePath: string,
      targetPlantId: string,
      newPlant: Plant
    ): Promise<void> => {
      event.preventDefault();

      // read and append
      if (fs.existsSync(filePath)) {
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          const jsonData = JSON.parse(data.toString());

          // find and update target plant
          for (let i = 0; i < jsonData.length; i += 1) {
            if (jsonData[i].id === targetPlantId) {
              jsonData[i] = newPlant;
            }
          }

          // write the updated db to json file
          fs.writeFileSync(filePath, JSON.stringify(jsonData));

          // pass the updated data to renderer
          event.reply('updatePlantToJsonDB', JSON.stringify(jsonData));
        });
      } else {
        // reply to ipc renderer that the file is not found
        event.reply('updatePlantToJsonDB', 'cannot find file');
      }
    }
  );

  // delete plant by id
  ipcMain.on(
    'deletePlantFromJsonDB',
    async (event, filePath: string, targetPlantId: string): Promise<void> => {
      event.preventDefault();

      // read and append
      if (fs.existsSync(filePath)) {
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          const jsonData = JSON.parse(data.toString());
          // find and delete target plant
          for (let i = 0; i < jsonData.length; i += 1) {
            if (jsonData[i].id === targetPlantId) {
              jsonData.splice(i, 1);
            }
          }

          // filters the null
          const filteredArray = jsonData.filter(
            (element: number | string): element is number | string => {
              return element !== null;
            }
          );

          // write the updated db to json file
          fs.writeFileSync(filePath, JSON.stringify(filteredArray));

          // pass the updated data to renderer
          event.reply('deletePlantFromJsonDB', JSON.stringify(jsonData));
        });
      } else {
        // reply to ipc renderer that the file is not found
        event.reply('deletePlantFromJsonDB', 'cannot find file');
      }
    }
  );
};

export default addJsonRW;
