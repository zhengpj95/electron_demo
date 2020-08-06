const { app, BrowserWindow, globalShortcut, Menu } = require('electron');

let win = null;

function createWin() {
	win = new BrowserWindow({
		width: 800,
		height: 650,
		minWidth: 500,
		minHeight: 450,
		webPreferences: {
			nodeIntegration: true,
		},
		enableRemoteModule: true,
		// frame: false
	});
	win.webContents.openDevTools();
	win.loadFile('index.html').catch((err) => console.log(`加载index.html错误`, err));
}

Menu.setApplicationMenu(null);
app.whenReady().then(createWin);

app.on('activate', () => {
	if (!BrowserWindow.getAllWindows().length) {
		createWin();
	}
});

app.on('ready', () => {
	globalShortcut.register('f5', () => {
		win.reload();
	});
});

app.on('will-quit', () => {
	globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
