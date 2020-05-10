# Electron

## Introduction

Build cross-platform desktop apps withe JavaScript, HTML, and CSS.

If you can build a website, you can build a desktop app. Electron is a framework for creating native applications
with web technologies lisk JavaScript, HTML, and CSS. It takes care of the hard parts so you can focus on the core
of you application. [(Election)](https://www.electronjs.org/)

## Installation

> npm install electron --save

## Usage

```javascript
const { app, BrowserWindow } = require('electron');

let win = null;
function createWindow () {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            // can use node API
            nodeIntegration: true
        }
    });
    win.loadFile('htmlPath').catch(error => console.log(`Error: `, error));
    // open the DevTools
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
app.on('window-all-closed', callback);
app.on('activate', callback);
```