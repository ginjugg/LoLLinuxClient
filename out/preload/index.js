"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const api = {
  setFile: (filepath) => electron.ipcRenderer.send("lockfile", filepath),
  openHandles: () => electron.ipcRenderer.send("openHandles"),
  watch: () => electron.ipcRenderer.send("lockfileWatch"),
  requestData: () => electron.ipcRenderer.invoke("requestData"),
  isOpen: () => electron.ipcRenderer.invoke("isOpen"),
  openGithub: () => electron.ipcRenderer.send("openGithub")
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
