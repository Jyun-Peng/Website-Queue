const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 480,
        height: 600,
        // resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    if (isDev) {
        win.loadURL('http://localhost:3000/');
        win.webContents.openDevTools();
    } else {
        win.loadFile('./public/index.html');
    }
    win.removeMenu();
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
