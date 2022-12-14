import { ipcMain } from 'electron';

// connect to mongo db
ipcMain.on('connectMongoDB', () => {
  // console.log(process.env.REACT_APP_MONGO_DB_CONN);
  // Mongo.connectDB(process.env.REACT_APP_MONGO_DB_CONN);
});
