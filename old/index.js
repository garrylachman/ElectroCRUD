'use strict';
const electron = require('electron');
const path = require('path');
const app = electron.app;

//require('electron-debugger')();

let mainWindow;
function onClosed() {
        // dereference the window
        // for multiple windows store them in an array
        mainWindow = null;
}

function createMainWindow() {
        const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
        const win = new electron.BrowserWindow({
                width: width,
                height: height,
                minWidth: 800,
                icon: path.join(__dirname, 'app/images/icons/512.ico')
        });

        win.loadURL('file://'+__dirname+'/app/index.html');
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
