const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
const arg = require('commander');

let mainWindow

function createWindow () {
  if (['nodejs','node'].indexOf(process.argv[0].toLowerCase()) < 0) {
    // TODO: https://github.com/tj/commander.js/issues/512
    process.argv.unshift('nodejs');
  }
  arg
    .option('--pubserve', 'connect to http://localhost:8080 (for development)')
    .parse(process.argv);
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(url.format({
    protocol: arg.pubserve ? 'http:':         'file:',
    pathname: arg.pubserve ? 'localhost:8080': path.join(__dirname, 'index.html'),
    slashes: true
  }))
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
