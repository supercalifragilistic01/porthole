const { app, BrowserWindow, Notification } = require('electron');
const { ipcMain } = require('electron')
const { PythonShell } = require('python-shell');
const logger = require('./core/utils/logger.js');
const rpc = require('./core/api/rpc.js');
var $ = require('jquery');

console.log('Load main.js.');


//SYSTEM
var path = require('path');
global.appRoot = path.resolve(__dirname);

//BACKEND
let pyshell = new PythonShell('engine.py');
// Create the backend engine.
console.log('Create engine.');
pyshell.on('message', (message)=> {
  logger.log("backend", message);
});
pyshell.on('stderr', (stderr)=> {

});

//IPC
ipcMain.on('newExternalWindow', (event, title, url) => {
  console.log('IPC-IN; newExternalWindow');
  newExternalWindow(title, url);
})

//WINDOW
var windowList = []
function createMainWindow() {
  // Create the browser window.
  console.log('Create window.');
  let mainWindow = new BrowserWindow({
    title: 'PortHole',
    width: 1024,
    height: 768,
    backgroundColor: '#282828',
    webPreferences: {
      devTools: true,
      nodeIntegration: true
    }
  });
  // and load the index.html of the app.
  console.log('Load frame.html.');
  mainWindow.loadURL('http://127.0.0.1:5000');
  mainWindow.webContents.openDevTools();
}
function newExternalWindow(title, url) {
  console.log('New external window.');
  console.log(`\tURL; ${url}`);
  windowList[title] = new BrowserWindow({
    title: title,
    width: 1024,
    height: 768,
    backgroundColor: '#282828',
    webPreferences: {
      devTools: true,
      nodeIntegration: false
    }
  });
  // and load the index.html of the app.
  windowList[title].loadURL(url);
}

app.on('ready', ()=> {
  //create window
  createMainWindow();
  //notify
  let ready = new Notification({
    body: 'PortHole is ready to use.'
  });
  ready.onclick = () => {
    console.log('Notification clicked')
  }
  ready.show();
});

app.on('before-quit', () => {
  //shutdown engine
  pyshell.terminate('SIGSTOP');
})
