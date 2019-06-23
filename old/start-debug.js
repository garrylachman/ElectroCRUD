'use strict';
const electron = require('electron');
const app = electron.app;
const fs = require('fs');
const path = require('path');
const Promise = require('promise');

//require('electron-debugger')();

let mainWindow;
function onClosed() {
        // dereference the window
        // for multiple windows store them in an array
        mainWindow = null;
}

function createTempHtml() {
  return new Promise((resolve, reject) => {
    let newFile = __dirname+'/app/tmp.index.html';
    let subRegexs = [
      { regex: /(bower_components)/g, value: "../$1" },
      { regex: /(styles\/main.css)/g, value: "../.tmp/$1" }
    ];
    fs.readFile(__dirname+'/app/index.html', 'utf8', (err,data) => {
      if (err) {
        reject(err);
      }

      for (let reg of subRegexs) {
        data = data.replace(reg.regex, reg.value);
      }
      console.log(data);

      fs.writeFile(newFile, data, (err) => {
        if (err) {
          reject(err);
        }
        resolve(newFile)
      });
    });
  });
}

function createMainWindow(width, height) {
  const win = new electron.BrowserWindow({
    width: width,
    height: height,
    icon: path.join(__dirname, 'app/images/icons/512.ico')
  });

  let tempHtmlFile = createTempHtml();
  tempHtmlFile.then((data) => {
    win.loadURL('file://'+data);
  }).catch((err) => {
    console.log(err);
  })
  win.on('closed', onClosed);

  return win;
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  /*if (!mainWindow) {
    mainWindow = createMainWindow();
  }*/
});

app.on('ready', () => {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = createMainWindow(width, height);
});
