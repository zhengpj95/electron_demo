const { app, BrowserWindow, Menu, globalShortcut } = require('electron');

let mainWin = null;

function createWindow() {
	mainWin = new BrowserWindow({
		width: 460,
		height: 460,
		minWidth: 420,
		minHeight: 450,
		maxWidth: 500,
		maxHeight: 500,
		x: 100,
		y: 100,
		webPreferences: {
			nodeIntegration: true
		},
		icon: 'favicon.ico'
	});

	mainWin.webContents.openDevTools();
	mainWin.loadFile('index.html')
		.catch(err => console.log(`加载index.html错误`, err));
}

app.allowRendererProcessReuse = true;
Menu.setApplicationMenu(null);
app.whenReady().then(createWindow);

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.on('ready', () => {
	globalShortcut.register('f5', () => {
		mainWin.reload();
	})
})

app.on('will-quit', () => {
	globalShortcut.unregister('f5');
	globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
})

