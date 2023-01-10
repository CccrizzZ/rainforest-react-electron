import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Plant } from '../renderer/utilities/Types';

export type Channels = 'ipc-example' | 'jsonDB';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    readPlantJsonDB(filePath: string): void {
      ipcRenderer.send('readPlantJsonDB', filePath);
    },
    appendPlantToJsonDB(filePath: string, newPlant: Plant): void {
      ipcRenderer.send('appendPlantToJsonDB', filePath, newPlant);
    },
    updatePlantToJsonDB(
      filePath: string,
      targetPlantId: string,
      newPlant: Plant
    ): void {
      ipcRenderer.send(
        'updatePlantToJsonDB',
        filePath,
        targetPlantId,
        newPlant
      );
    },
    deletePlantFromJsonDB(filePath: string, targetPlantId: number): void {
      ipcRenderer.send('deletePlantFromJsonDB', filePath, targetPlantId);
    },
    shutDownSystem(): void {
      ipcRenderer.send('shutDownSystem');
    },
    toggleMaximizeWindow(): void {
      ipcRenderer.send('toggleMaximizeWindow');
    },
    minimizeWindow(): void {
      ipcRenderer.send('minimizeWindow');
    },
    connectMongoDB(): void {
      ipcRenderer.send('connectMongoDB');
    },
    readPlantMongoDB(): void {
      ipcRenderer.send('readPlantMongoDB');
    },
    appendPlantToMongoDB(newPlant: Plant): void {
      ipcRenderer.send('appendPlantToMongoDB', newPlant);
    },
  },
});
