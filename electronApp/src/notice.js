const schedule = require('node-schedule');
// const { remote } = require('electron');

function alertNotice(date) {
	remote.dialog
		.showMessageBox({
			type: 'warning',
			title: '打卡啦！！！',
			message: '不要忘记打卡啦' + date,
			buttons: ['OK', 'CANCEL'],
		})
		.then((result) => {
			let option = {
				title: '嗨，你打卡了吗？',
				body: '',
			};
			if (result.response == 0) {
				option.body = `打卡成功了哦！`;
			} else if (result.response === 1) {
				option.body = `你居然不想打卡，赶紧刷脸打卡去吧！`;
			}
			new window.Notification(option.title, option);
		})
		.catch((err) => {
			console.log(`弹出提示框失败！${err}`);
		});
}

function getDateDetail() {
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	return `${year}-${month}-${day} ${hours}-${minutes}-${seconds}`;
}

function mySchedule() {
	// 秒 分 时 日(1-31) 月(1-12) 周几(0-7)
	schedule.scheduleJob('30 30 8 * * *', () => {
		console.log(`schedule...`, getDateDetail());
		alertNotice(getDateDetail());
	});
}

mySchedule();
