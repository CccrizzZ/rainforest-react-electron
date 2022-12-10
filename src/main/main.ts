/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import fs from 'fs';
import { resolveHtmlPath } from './util';
import { Plant } from '../renderer/utilities/Types';
import MongoDBConnector from '../renderer/utilities/MongoDBConnector';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

// red button
ipcMain.on('shutDownSystem', () => {
  app.quit();
});

// yellow button
ipcMain.on('minimizeWindow', () => {
  mainWindow?.minimize();
});

// green button
ipcMain.on('toggleMaximizeWindow', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

// connect to mongo db
ipcMain.on('connectMongoDB', () => {
  // console.log(process.env.REACT_APP_MONGO_DB_CONN);
  // Mongo.connectDB(process.env.REACT_APP_MONGO_DB_CONN);
});

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
    console.log(newPlant);

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
      event.reply('appendPlantToJsonDB', 'cannot find file');
    }
  }
);

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1600,
    height: 1000,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
    frame: false,
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

// exit app
export default function destroyWindow(): void {
  mainWindow?.close();
}

/**
 * Add event listeners...
 */
app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
