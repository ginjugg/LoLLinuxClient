"use strict";
const electron = require("electron");
const path = require("path");
const fs = require("fs");
const utils = require("@electron-toolkit/utils");
class Lockfile {
  constructor() {
    this.lockfile = [];
    this.path = "";
    this.port = "";
    this.password = "";
  }
  watchFile() {
    if (fs.existsSync(this.path)) {
      const content = fs.readFileSync(this.path, "utf-8");
      this.lockfile = content.split(":");
      this.port = this.lockfile[2];
      this.password = this.lockfile[3];
    }
  }
  openHandles() {
    electron.ipcMain.removeHandler("requestData");
    electron.ipcMain.handle("requestData", () => {
      return { port: this.port, password: this.password };
    });
    electron.ipcMain.removeHandler("isOpen");
    electron.ipcMain.handle("isOpen", () => {
      return fs.existsSync(this.path);
    });
  }
  setFile(event, filepath) {
    this.path = filepath;
  }
}
const icon = "../renderer/public/android-chrome-192x192.png";
const lockfile = new Lockfile();
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 1280,
    height: 720,
    show: true,
    //cors: corsOptions,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
    mainWindow.webContents.openDevTools();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.ipcMain.on("lockfile", lockfile.setFile);
  electron.ipcMain.on("lockfileWatch", lockfile.watchFile);
  electron.ipcMain.on("openHandles", lockfile.openHandles);
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("certificate-error", (event, webContents, url, error, certificate, callback) => {
  event.preventDefault();
  callback(true);
});
