import { Channels } from 'main/preload';
import { Plant } from './utilities/Types';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
        readPlantJsonDB(filePath: string): string;
        appendPlantToJsonDB(filePath: string, newPlant: Plant): void;
        updatePlantToJsonDB(
          filePath: string,
          targetPlantId: string,
          newPlant: Plant
        ): void;
        deletePlantFromJsonDB(filePath: string, targetPlantId: string): void;
        shutDownSystem(): void;
        toggleMaximizeWindow(): void;
        minimizeWindow(): void;
        connectMongoDB(): void;
        readPlantMongoDB(): void;
        createPlantMongoDB(newPlant: Plant): void;
        updatePlantMongoDB(id: string, newPlant: Plant): void;
        deletePlantMongoDB(id: string): void;
      };
    };
  }
}

export {};
