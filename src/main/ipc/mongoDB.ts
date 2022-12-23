import { ipcMain } from 'electron';

// connect to mongo db
ipcMain.on('addPlantToMongoDB', () => {
  console.log('addPlantToMongoDB');
});
