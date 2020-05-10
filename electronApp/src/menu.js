const {BrowserWindow, Menu} = require('electron');

const template = [
	{
		label: '文件',
		submenu: [
			{
				label: '打开', click: () => {
					console.log(`open...`);
					openFunc();
				},
				accelerator: 'ctrl+n'
			},
			{label: '保存'},
			{label: '另保存'},
			{label: '退出'}
		]
	},
	{
		label: '编辑',
		submenu: [
			{label: '复制'},
			{label: '剪切'},
			{label: '粘贴'}
		]
	}
];

function openFunc() {
	let win = new BrowserWindow({
		height: 400,
		width: 400,
		webPreferences: {
			nodeIntegration: true,
		},
		backgroundColor: '#008800'
	});
	win.loadFile('./views/subIndex.html')
		.catch(error => console.log(error));

	win.on('close', () => {
		win = null;
		console.log(`close...`)
	});
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);