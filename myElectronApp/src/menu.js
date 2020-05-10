const {Menu, app, BrowserWindow} = require('electron');
let mainWin = BrowserWindow.getFocusedWindow();

const template = [
	{
		label: '文件',
		submenu: [
			{
				label: '退出',
				click: () => {
					app.quit();
				},
				accelerator: 'ctrl+q'
			}
		]
	},
	{
		label: '工具',
		submenu: [
			{
				label: '打开DevTool',
				click: () => {
					if (mainWin) {
						mainWin.webContents.openDevTools();
					}
				},
				accelerator: 'ctrl+o'
			},
			{
				label: '关闭DevTool',
				click: () => {
					if (mainWin) {
						mainWin.webContents.closeDevTools();
					}
				},
				accelerator: 'ctrl+shift+o'
			}
		]
	}
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);