(function () {
	const {remote, shell} = require('electron');
	const path = require('path');
	const fs = require('fs');

	//内嵌的browserView
	// const mainWin = remote.getCurrentWindow();
	// let browserView = new remote.BrowserView();
	// mainWin.setBrowserView(browserView);
	// browserView.setBounds({x: 0, y: 200, height: 500, width: 1500});

	let ele = document.querySelector('#zhihu');
	let url = ele.getAttribute('href');
	// browserView.webContents.loadURL(url)
	// 	.catch(err => console.log(err));

	//打开子窗口
	let btn = document.getElementById('btnOpen');
	btn.onclick = function (e) {
		e.preventDefault();
		window.open(url);
	}

	/*
	 * window.open   vs   BrowserWindow   vs shell
	 *
	 * window.open 默认就是子窗口
	 * BrowserWindow 就是一个窗口
	 * shell 可以打开外部浏览器
	 */


	//在外部浏览器中打开页面
	let btnInBrowser = document.getElementById('btnInBrowser');
	btnInBrowser.onclick = function (e) {
		e.preventDefault();
		shell.openExternal(url)
			.catch(err => console.log('Error: ', err));
	}

	// 打开子窗口，并接受子窗口传递过来的信息
	let btn2 = document.getElementById('btnOpen2');
	btn2.onclick = function (e) {
		e.preventDefault();
		window.open('./views/subIndex.html');
	}
	window.addEventListener('message', function (msg) {
		let inputTxt = document.getElementById('txtFromChild');
		inputTxt.innerText += '\n' + JSON.stringify(msg.data);
	})

	// 打开文件对话框
	let btnOpenFile = document.getElementById('btnOpenFile');
	btnOpenFile.onclick = function () {
		remote.dialog.showOpenDialog({
			title: '测试打开文件',
			// defaultPath: 'mongodbLinux.png',//打开窗口的默认文件
			// filters相当于文件选择框右下角的选择
			filters: [
				{name: 'png', extensions: ['png', 'ico']},
				{name: 'js', extensions: ['js']}
			],
			buttonLabel: '请选择文件。。。', //选择按钮的文本
		}).then(result => {
			let filePath = result.filePaths[0];
			let parsedPath = path.parse(filePath);
			if (parsedPath.ext == '.png' || parsedPath.ext == '.ico') {
				let image = document.createElement('img');
				image.src = filePath;
				btnOpenFile.parentNode.appendChild(image);
			} else if (parsedPath.ext == '.js') {
				let code = document.createElement('code');
				fs.readFile(filePath, 'utf-8', (err, data) => {
					if (err) {
						code.innerText = `读取${filePath}失败！`;
						btnOpenFile.parentNode.appendChild(code);
						return;
					}
					code.innerText = data;
					btnOpenFile.parentNode.appendChild(code);
				})
			}
		}).catch(err => {
			console.log(`打开文件错误：${err}`);
		})
	}

	// 保存文件
	let btnSaveFile = document.getElementById('btnSaveFile');
	btnSaveFile.onclick = function () {
		remote.dialog.showSaveDialog({
			title: '测试保存文件'
		}).then(result => {
			let parsedPath = path.parse(result.filePath);
			fs.writeFileSync(parsedPath.base, 'Learn Electron is well.');
		}).catch(err => {
			console.log(`保存文件失败：${err}`)
		})
	}

	// 弹出对话框
	let btnMsgBox = document.getElementById('btnMsgBox');
	let txtMsg = document.getElementById('txtMsg');
	btnMsgBox.onclick = function () {
		remote.dialog.showMessageBox({
			type: 'error', //none, info, error, question or warning
			title: '你到底要怎样？',
			message: '你学不学呀，学习不快乐吗？',
			buttons: ['happy', 'not happy']
		}).then(result => {
			if (result.response == 0) {
				txtMsg.value = `你很喜欢学习哦`;
			} else if (result.response == 1) {
				txtMsg.value = `你不喜欢学习？这可不行。`;
			}
		}).catch(err => {
			console.log(`弹出对话框失败：${err}`)
		})
	}

	// 联网，断网通知
	window.addEventListener('online', () => {
		alert(`你好，你连接上网络啦。`);
	});
	window.onoffline = function () {
		alert(`网络断开，请重新连接。`)
	}

	// window底部信息通知
	let option = {
		title: '嗨，来信息了，快来看看吧',
		body: '大美女发信息给你了，大公司发来offer了。'
	}
	let btnNotify = document.getElementById('btnNotify');
	btnNotify.onclick = function () {
		new window.Notification(option.title, option);
	}

	//剪贴板
	let btnCopy = document.getElementById('btnCopy');
	let code = document.getElementById('code');
	btnCopy.onclick = function () {
		remote.clipboard.writeText(code.innerText);
	}

	//重新加载，注册f5
	let btnReload = document.getElementById('btnReload');
	btnReload.onclick = function () {
		console.log(btnReload);
	}
})();
