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
        readPlantMongoDB() {
            electron_1.ipcRenderer.send('readPlantMongoDB');
        },
        createPlantMongoDB(newPlant) {
            electron_1.ipcRenderer.send('createPlantMongoDB', newPlant);
        },
        updatePlantMongoDB(id, newPlant) {
            electron_1.ipcRenderer.send('updatePlantMongoDB', id, newPlant);
        },
        deletePlantMongoDB(id) {
            electron_1.ipcRenderer.send('deletePlantMongoDB', id);
        },
    },
});

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJlbGVjdHJvblwiIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9wcmVsb2FkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBjb250ZXh0QnJpZGdlLCBpcGNSZW5kZXJlciwgSXBjUmVuZGVyZXJFdmVudCB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCB7IFBsYW50IH0gZnJvbSAnLi4vcmVuZGVyZXIvdXRpbGl0aWVzL1R5cGVzJztcblxuZXhwb3J0IHR5cGUgQ2hhbm5lbHMgPSAnaXBjLWV4YW1wbGUnIHwgJ2pzb25EQic7XG5cbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoJ2VsZWN0cm9uJywge1xuICBpcGNSZW5kZXJlcjoge1xuICAgIHNlbmRNZXNzYWdlKGNoYW5uZWw6IENoYW5uZWxzLCBhcmdzOiB1bmtub3duW10pIHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoY2hhbm5lbCwgYXJncyk7XG4gICAgfSxcbiAgICBvbihjaGFubmVsOiBDaGFubmVscywgZnVuYzogKC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZCkge1xuICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gKF9ldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogdW5rbm93bltdKSA9PlxuICAgICAgICBmdW5jKC4uLmFyZ3MpO1xuICAgICAgaXBjUmVuZGVyZXIub24oY2hhbm5lbCwgc3Vic2NyaXB0aW9uKTtcblxuICAgICAgcmV0dXJuICgpID0+IGlwY1JlbmRlcmVyLnJlbW92ZUxpc3RlbmVyKGNoYW5uZWwsIHN1YnNjcmlwdGlvbik7XG4gICAgfSxcbiAgICBvbmNlKGNoYW5uZWw6IENoYW5uZWxzLCBmdW5jOiAoLi4uYXJnczogdW5rbm93bltdKSA9PiB2b2lkKSB7XG4gICAgICBpcGNSZW5kZXJlci5vbmNlKGNoYW5uZWwsIChfZXZlbnQsIC4uLmFyZ3MpID0+IGZ1bmMoLi4uYXJncykpO1xuICAgIH0sXG4gICAgcmVhZFBsYW50SnNvbkRCKGZpbGVQYXRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoJ3JlYWRQbGFudEpzb25EQicsIGZpbGVQYXRoKTtcbiAgICB9LFxuICAgIGFwcGVuZFBsYW50VG9Kc29uREIoZmlsZVBhdGg6IHN0cmluZywgbmV3UGxhbnQ6IFBsYW50KTogdm9pZCB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdhcHBlbmRQbGFudFRvSnNvbkRCJywgZmlsZVBhdGgsIG5ld1BsYW50KTtcbiAgICB9LFxuICAgIHVwZGF0ZVBsYW50VG9Kc29uREIoXG4gICAgICBmaWxlUGF0aDogc3RyaW5nLFxuICAgICAgdGFyZ2V0UGxhbnRJZDogc3RyaW5nLFxuICAgICAgbmV3UGxhbnQ6IFBsYW50XG4gICAgKTogdm9pZCB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKFxuICAgICAgICAndXBkYXRlUGxhbnRUb0pzb25EQicsXG4gICAgICAgIGZpbGVQYXRoLFxuICAgICAgICB0YXJnZXRQbGFudElkLFxuICAgICAgICBuZXdQbGFudFxuICAgICAgKTtcbiAgICB9LFxuICAgIGRlbGV0ZVBsYW50RnJvbUpzb25EQihmaWxlUGF0aDogc3RyaW5nLCB0YXJnZXRQbGFudElkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoJ2RlbGV0ZVBsYW50RnJvbUpzb25EQicsIGZpbGVQYXRoLCB0YXJnZXRQbGFudElkKTtcbiAgICB9LFxuICAgIHNodXREb3duU3lzdGVtKCk6IHZvaWQge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnc2h1dERvd25TeXN0ZW0nKTtcbiAgICB9LFxuICAgIHRvZ2dsZU1heGltaXplV2luZG93KCk6IHZvaWQge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgndG9nZ2xlTWF4aW1pemVXaW5kb3cnKTtcbiAgICB9LFxuICAgIG1pbmltaXplV2luZG93KCk6IHZvaWQge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnbWluaW1pemVXaW5kb3cnKTtcbiAgICB9LFxuICAgIGNvbm5lY3RNb25nb0RCKCk6IHZvaWQge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnY29ubmVjdE1vbmdvREInKTtcbiAgICB9LFxuICAgIHJlYWRQbGFudE1vbmdvREIoKTogdm9pZCB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdyZWFkUGxhbnRNb25nb0RCJyk7XG4gICAgfSxcbiAgICBjcmVhdGVQbGFudE1vbmdvREIobmV3UGxhbnQ6IFBsYW50KTogdm9pZCB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdjcmVhdGVQbGFudE1vbmdvREInLCBuZXdQbGFudCk7XG4gICAgfSxcbiAgICB1cGRhdGVQbGFudE1vbmdvREIoaWQ6IHN0cmluZywgbmV3UGxhbnQ6IFBsYW50KTogdm9pZCB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCd1cGRhdGVQbGFudE1vbmdvREInLCBpZCwgbmV3UGxhbnQpO1xuICAgIH0sXG4gICAgZGVsZXRlUGxhbnRNb25nb0RCKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoJ2RlbGV0ZVBsYW50TW9uZ29EQicsIGlkKTtcbiAgICB9LFxuICB9LFxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=