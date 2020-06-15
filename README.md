# electron_demo

- [electron_demo](#electron_demo)
  - [Description](#description)
  - [Develope Environment](#develope-environment)
  - [Installation](#installation)
  - [Create First Electron App](#create-first-electron-app)
  - [Usage](#usage)
    - [app](#app)
    - [remote](#remote)
    - [BrowserWindow](#browserwindow)
    - [webContents](#webcontents)
    - [BrowserView](#browserview)
    - [Menu, MenuItem](#menu-menuitem)
    - [screen](#screen)
    - [globalShortcut](#globalshortcut)
    - [Main and Renderer Processes](#main-and-renderer-processes)
    - [clipboard](#clipboard)
    - [shell](#shell)
    - [Using Node.js APIs](#using-nodejs-apis)
  - [打包工具 `electron-packager`](#打包工具-electron-packager)

## Description

Learn electron. Make desktop application by electron.

## Develope Environment

> node
>
> npm or yarn

## Installation

> npm install electron --save-dev

## Create First Electron App

```javascript
// simple main.js
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "favicon.ico",
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html').then(err => console.log(err));

  // or load the url of the app.
  // win.loadURL('https://google.com').then(error => console.log('Error: ', error))

  // Open the DevTools.
  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow)
```

在 `package.json` 的 `scripts` 下配置 `“start": "electron ."` 就可以使用命令 `npm start` 启动。

## Usage

### app

> Control your application's event lifecycle.

`app` 是主进程模块，控制着应用事件的的生命周期，从创建，运行到退出。

### remote

> Use main process modules from the renderer process.

这是渲染进程模块。有的模块只能在 **主进程** 中使用，要想在渲染进程中使用就必须使用 `remote.xxx` 来获取。

### BrowserWindow

> Create and control browser windows.

创建和控制浏览器窗口。当 `app` 创建好后就可以创建和加载 BrowserWindow。有各种属性来创建各种形式的窗口。

### webContents

> Render and control web pages.

`webContents` is an `EventEmitter`. It is responsible for rendering and controlling a web page and is a property of the `BrowserWindow` Object.

`webContents` 可以理解为 `BrowserWindow` 内显示的页面。

### BrowserView

> Create and control views.

可以内嵌到 BrowserWindow 中，用于显示内容。

### Menu, MenuItem

> Create native application menus and context menus. # Menu
>
> Add items to native application menus and context menus. # MenuItem

`Menu` 的每一项都是 `MenuItem`。

### screen

> Retrieve information about screen size, displays, cursor position, etc.

This module cannot be used until the `ready` event of the `app` module is emitted.

### globalShortcut

> Detect keyboard events when the application does not have keyboard focus

The `globalShortcut` module can register/unregister a global keyboard shortcut with the operating system so that you can customize the operations for various shortcuts.

**Note:** The shortcut is global; it will work even if the app does not have the keyboard focus. You should not use this module until the ready event of the app module is emitted.

- globalShortcut.register
- globalShortcut.registerAll
- globalShortcut.isRegistered
- globalShortcut.unregister
- globalShortcut.unregisterAll

### Main and Renderer Processes

主进程就是配置在 `package.json` 中的 `main` 字段的 js 文件。一个Electron应用只有一个主进程。

每一个页面就是一个渲染进程。

主进程和渲染进程间的通信可以使用 **ipcRenderer** 和 **ipcMain** 模块。

In Electron, the process that runs package.json's main script is called the main process.
The script that runs in the main process can display a GUI by creating web pages.
An Electron app always has one main process, but never more.

Since Electron uses Chromium for displaying web pages,
Chromium's multi-process architecture is also used.
Each web page in Electron runs in its own process, which is called the renderer process.

In normal browsers, web pages usually run in a sandboxed environment
and are not allowed access to native resources. Electron users,
however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

Differences Between Main Process and Renderer Process

The main process creates web pages by creating BrowserWindow instances.
Each BrowserWindow instance runs the web page in its own renderer process.
When a BrowserWindow instance is destroyed, the corresponding renderer process is also terminated.

The main process manages all web pages and their corresponding renderer processes.
Each renderer process is isolated and only cares about the web page running in it.

In web pages, calling native GUI related APIs is not allowed
because managing native GUI resources in web pages is very dangerous
and it is easy to leak resources.
If you want to perform GUI operations in a web page,
the renderer process of the web page must communicate with the main process to request
that the main process perform those operations.

In Electron, we have several ways to communicate between the main process and renderer processes,
such as ipcRenderer and ipcMain modules for sending messages,
and the remote module for RPC style communication.

### clipboard

> Perform copy and paste operations on the system clipboard.

Modules for Both Process Types, Main and renderer process.

On Linux, there is also a **selection** clipboard. To manipulate it you need to pass selection to each method.

```javascript
const { clipboard } = require('electron');

clipboard.writeText('Example String', 'selection');
console.log(clipboard.readText('selection'));

// writeText(string[, type])
// readText([type])
// ...other method
// type:Can be selection or clipboard; default is 'clipboard'.
```

### shell

> Manage files and URLs using their default applications.

The `shell` module provides functions related to desktop integration.

主进程和渲染进程模块。

```javascript
// open a url in user's default browser
const { shell } = require('electron')
shell.openExternal('https://github.com')
```

### Using Node.js APIs

在创建 `BrowserWindow` 时，在其属性 `webPreferences` 下添加 `nodeIntegration: true` 启用 Node.js

## 打包工具 `electron-packager`

> npm install electron-packager -g
>
> electron-packager ./ appName --out path --overwrite --icon=favicon.ico ## 打包对应平台的桌面应用程序
>
> "packager": "electron-packager ./ myApp --out ./bin-release --overwrite --icon=./favicon.ico" ## 在 `package.json` 的 `scripts` 配置，可以通过 `npm run-script packager` 命令进行打包
