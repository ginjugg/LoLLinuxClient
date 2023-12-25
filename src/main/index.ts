import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { Lockfile } from '../renderer/src/libs/Lockfile.ts';
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
//import icon from '../renderer/public/android-chrome-192x192.png'
//import cors from 'cors'

/**
var corsOptions = {
  origin: false,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
**/

const icon = '../renderer/public/android-chrome-192x192.png'
const lockfile = new Lockfile();

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    show: true,
    //cors: corsOptions,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.webContents.openDevTools()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  //if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
  //  mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  //} else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  //}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  ipcMain.on('lockfile', lockfile.setFile);
  ipcMain.on('lockfileWatch', lockfile.watchFile);
  ipcMain.on('openHandles', lockfile.openHandles);
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// SSL/TSL: this is the self signed certificate support
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  // On certificate error we disable default behaviour (stop loading the page)
  // and we then say "it is all fine - true" to the callback
  event.preventDefault();
  callback(true);
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
