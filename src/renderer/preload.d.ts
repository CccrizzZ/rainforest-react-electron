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
        appendPlantToDB(filePath: string, newPlant: Plant): void;
        shutDownSystem(): void;
        toggleMaximizeWindow(): void;
        minimizeWindow(): void;
        connectMongoDB(): void;
      };
    };
  }
}

export {};
