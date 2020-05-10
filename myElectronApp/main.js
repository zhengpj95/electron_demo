const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;

let mainWin = null;

function createWindow() {
	let area = electron.screen.getPrimaryDisplay().workArea;

	mainWin = new BrowserWindow({
		width: 1500,
		height: area.height / 4 * 3,
		x: area.x,
		y: area.y,
		webPreferences: {
			nodeIntegration: true
		},
		icon: './favicon.ico',
		title: 'my tools', //如果index.html的title元素有文本，就会忽略此title
	});
	require('./src/menu');

	mainWin.loadFile('index.html').catch(err => console.log(err));

	// mainWin.webContents.openDevTools();
}

app.allowRendererProcessReuse = true;

app.whenReady().then(createWindow);

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
})

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
});