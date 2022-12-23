/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*****************************!*\
  !*** ./src/main/preload.ts ***!
  \*****************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __webpack_require__(/*! electron */ "electron");
electron_1.contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        sendMessage(channel, args) {
            electron_1.ipcRenderer.send(channel, args);
        },
        on(channel, func) {
            const subscription = (_event, ...args) => func(...args);
            electron_1.ipcRenderer.on(channel, subscription);
            return () => electron_1.ipcRenderer.removeListener(channel, subscription);
        },
        once(channel, func) {
            electron_1.ipcRenderer.once(channel, (_event, ...args) => func(...args));
        },
        readPlantJsonDB(filePath) {
            electron_1.ipcRenderer.send('readPlantJsonDB', filePath);
        },
        appendPlantToJsonDB(filePath, newPlant) {
            electron_1.ipcRenderer.send('appendPlantToJsonDB', filePath, newPlant);
        },
        updatePlantToJsonDB(filePath, targetPlantId, newPlant) {
            electron_1.ipcRenderer.send('updatePlantToJsonDB', filePath, targetPlantId, newPlant);
        },
        deletePlantFromJsonDB(filePath, targetPlantId) {
            electron_1.ipcRenderer.send('deletePlantFromJsonDB', filePath, targetPlantId);
        },
        shutDownSystem() {
            electron_1.ipcRenderer.send('shutDownSystem');
        },
        toggleMaximizeWindow() {
            electron_1.ipcRenderer.send('toggleMaximizeWindow');
        },
        minimizeWindow() {
            electron_1.ipcRenderer.send('minimizeWindow');
        },
        connectMongoDB() {
            electron_1.ipcRenderer.send('connectMongoDB');
        },
    },
});

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7OztBQ3RCQSxtRUFBd0U7QUFLeEUsd0JBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUU7SUFDMUMsV0FBVyxFQUFFO1FBQ1gsV0FBVyxDQUFDLE9BQWlCLEVBQUUsSUFBZTtZQUM1QyxzQkFBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUNELEVBQUUsQ0FBQyxPQUFpQixFQUFFLElBQWtDO1lBQ3RELE1BQU0sWUFBWSxHQUFHLENBQUMsTUFBd0IsRUFBRSxHQUFHLElBQWUsRUFBRSxFQUFFLENBQ3BFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ2hCLHNCQUFXLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztZQUV0QyxPQUFPLEdBQUcsRUFBRSxDQUFDLHNCQUFXLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQWlCLEVBQUUsSUFBa0M7WUFDeEQsc0JBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7UUFDRCxlQUFlLENBQUMsUUFBZ0I7WUFDOUIsc0JBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUNELG1CQUFtQixDQUFDLFFBQWdCLEVBQUUsUUFBZTtZQUNuRCxzQkFBVyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUNELG1CQUFtQixDQUNqQixRQUFnQixFQUNoQixhQUFxQixFQUNyQixRQUFlO1lBRWYsc0JBQVcsQ0FBQyxJQUFJLENBQ2QscUJBQXFCLEVBQ3JCLFFBQVEsRUFDUixhQUFhLEVBQ2IsUUFBUSxDQUNULENBQUM7UUFDSixDQUFDO1FBQ0QscUJBQXFCLENBQUMsUUFBZ0IsRUFBRSxhQUFxQjtZQUMzRCxzQkFBVyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUNELGNBQWM7WUFDWixzQkFBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFDRCxvQkFBb0I7WUFDbEIsc0JBQVcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQ0QsY0FBYztZQUNaLHNCQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDckMsQ0FBQztRQUNELGNBQWM7WUFDWixzQkFBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7S0FDRjtDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vcHJlbG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgY29udGV4dEJyaWRnZSwgaXBjUmVuZGVyZXIsIElwY1JlbmRlcmVyRXZlbnQgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgeyBQbGFudCB9IGZyb20gJy4uL3JlbmRlcmVyL3V0aWxpdGllcy9UeXBlcyc7XG5cbmV4cG9ydCB0eXBlIENoYW5uZWxzID0gJ2lwYy1leGFtcGxlJyB8ICdqc29uREInO1xuXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdlbGVjdHJvbicsIHtcbiAgaXBjUmVuZGVyZXI6IHtcbiAgICBzZW5kTWVzc2FnZShjaGFubmVsOiBDaGFubmVscywgYXJnczogdW5rbm93bltdKSB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKGNoYW5uZWwsIGFyZ3MpO1xuICAgIH0sXG4gICAgb24oY2hhbm5lbDogQ2hhbm5lbHMsIGZ1bmM6ICguLi5hcmdzOiB1bmtub3duW10pID0+IHZvaWQpIHtcbiAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IChfZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IHVua25vd25bXSkgPT5cbiAgICAgICAgZnVuYyguLi5hcmdzKTtcbiAgICAgIGlwY1JlbmRlcmVyLm9uKGNoYW5uZWwsIHN1YnNjcmlwdGlvbik7XG5cbiAgICAgIHJldHVybiAoKSA9PiBpcGNSZW5kZXJlci5yZW1vdmVMaXN0ZW5lcihjaGFubmVsLCBzdWJzY3JpcHRpb24pO1xuICAgIH0sXG4gICAgb25jZShjaGFubmVsOiBDaGFubmVscywgZnVuYzogKC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZCkge1xuICAgICAgaXBjUmVuZGVyZXIub25jZShjaGFubmVsLCAoX2V2ZW50LCAuLi5hcmdzKSA9PiBmdW5jKC4uLmFyZ3MpKTtcbiAgICB9LFxuICAgIHJlYWRQbGFudEpzb25EQihmaWxlUGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdyZWFkUGxhbnRKc29uREInLCBmaWxlUGF0aCk7XG4gICAgfSxcbiAgICBhcHBlbmRQbGFudFRvSnNvbkRCKGZpbGVQYXRoOiBzdHJpbmcsIG5ld1BsYW50OiBQbGFudCk6IHZvaWQge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnYXBwZW5kUGxhbnRUb0pzb25EQicsIGZpbGVQYXRoLCBuZXdQbGFudCk7XG4gICAgfSxcbiAgICB1cGRhdGVQbGFudFRvSnNvbkRCKFxuICAgICAgZmlsZVBhdGg6IHN0cmluZyxcbiAgICAgIHRhcmdldFBsYW50SWQ6IHN0cmluZyxcbiAgICAgIG5ld1BsYW50OiBQbGFudFxuICAgICk6IHZvaWQge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZChcbiAgICAgICAgJ3VwZGF0ZVBsYW50VG9Kc29uREInLFxuICAgICAgICBmaWxlUGF0aCxcbiAgICAgICAgdGFyZ2V0UGxhbnRJZCxcbiAgICAgICAgbmV3UGxhbnRcbiAgICAgICk7XG4gICAgfSxcbiAgICBkZWxldGVQbGFudEZyb21Kc29uREIoZmlsZVBhdGg6IHN0cmluZywgdGFyZ2V0UGxhbnRJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdkZWxldGVQbGFudEZyb21Kc29uREInLCBmaWxlUGF0aCwgdGFyZ2V0UGxhbnRJZCk7XG4gICAgfSxcbiAgICBzaHV0RG93blN5c3RlbSgpOiB2b2lkIHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoJ3NodXREb3duU3lzdGVtJyk7XG4gICAgfSxcbiAgICB0b2dnbGVNYXhpbWl6ZVdpbmRvdygpOiB2b2lkIHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoJ3RvZ2dsZU1heGltaXplV2luZG93Jyk7XG4gICAgfSxcbiAgICBtaW5pbWl6ZVdpbmRvdygpOiB2b2lkIHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoJ21pbmltaXplV2luZG93Jyk7XG4gICAgfSxcbiAgICBjb25uZWN0TW9uZ29EQigpOiB2b2lkIHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoJ2Nvbm5lY3RNb25nb0RCJyk7XG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9