'use strict';
const electron = require('electron');
const app = electron.app;

//require('electron-debugger')();

let mainWindow;
function onClosed() {
        // dereference the window
        // for multiple windows store them in an array
        mainWindow = null;
}

function createMainWindow() {
        const win = new electron.BrowserWindow({
                width: 800,
                height: 600,
                minWidth: 800
        });

        win.loadURL('file://'+__dirname+'/index.html');
        //win.loadURL('about:blank');
        win.on('closed', onClosed);

        return win;
}

app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
                app.quit();
        }
});

app.on('activate', () => {
        if (!mainWindow) {
                mainWindow = createMainWindow();
        }
});

app.on('ready', () => {
        mainWindow = createMainWindow();
});
