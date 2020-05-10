const {app, BrowserWindow, globalShortcut, screen} = require('electron');

let win = null;

function createWindow() {
	//获取屏幕的区域大小
	let area = screen.getPrimaryDisplay().workArea;

	// Create the browser window.
	win = new BrowserWindow({
		height: area.height,
		width: area.width,
		x: area.x,
		y: area.y,
		webPreferences: {
			nodeIntegration: true,
		},
		icon: 'favicon.ico',
		backgroundColor: 'rgba(200,200,200,0.5)',
		center: true,
		// frame: false,
		// opacity: 0.9
	});

	// 忽略所有鼠标时间，鼠标右键也会被忽略，electron加载的页面的左键点击事件也会被忽略
	// win.setIgnoreMouseEvents(true);

	// load menu
	require('./src/menu');
	// and load the index.html of the app.
	win.loadFile('index.html')
		.catch(error => console.log(`Error: `, error));
	// win.loadURL('https://gitee.com/zhengpj').then(error => console.log('Error: ', error))

	// Open the DevTools.
	// win.webContents.openDevTools();
}

// The default value of app.allowRendererProcessReuse is deprecated, it is currently "false".
// It will change to be "true" in Electron 9.
app.allowRendererProcessReuse = true;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

app.on('ready', () => {
	// globalShortcut 是主进程模块，注册全局的快捷键必须在 ready 之后，才能注册成功
	globalShortcut.register(`ctrl+o`, () => {
		win.loadURL('https://zhihu.com/')
			.catch(error => console.log(`Error: `, error));
	})
	globalShortcut.register('f5', () => {
		win.reload();
	})
	let isRegister = globalShortcut.isRegistered('ctrl+o') ? 'shortcut register success' : 'shortcut register fail';
	console.log(isRegister);
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.on('will-quit', () => {
	// 注销快捷键
	globalShortcut.unregister('ctrl+o');
	globalShortcut.unregisterAll();
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
