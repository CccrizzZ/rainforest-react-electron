import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import Plant from '../renderer/utilities/Types';

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
    appendPlantToDB(filePath: string, newPlant: Plant): void {
      ipcRenderer.send('appendPlantToJsonDB', filePath, newPlant);
    },
    shutDownSystem(): void {
      ipcRenderer.send('shutDownSystem');
    },
  },
});
