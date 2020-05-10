/**
 * 是在页面中右键的，所以要加载到对应的页面中
 */
const {remote} = require('electron');

let rightTemplate = [
	{
		label: '复制'
	},
	{
		label: '粘贴'
	},
	{
		label: '打开 DevTools',
		click: () => {
			remote.getCurrentWindow().webContents.openDevTools({mode: 'right'});
		}
	},
	{
		label: '关闭 DevTools',
		click: () => {
			remote.getCurrentWindow().webContents.closeDevTools();
		}
	}
];
let menu = remote.Menu.buildFromTemplate(rightTemplate);

window.addEventListener('contextmenu', (e) => {
	e.preventDefault();
	menu.popup({
		window: remote.getCurrentWindow()
	})
})