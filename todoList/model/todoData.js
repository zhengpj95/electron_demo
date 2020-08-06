/**
 * 保存的数据格式
 */
class TodoData {
	constructor() {
		this.id = 0; //任务id
		this.task = ''; //任务内容
		this.finish = false; //是否完成
		this.addTime = 0; //添加时间
		this.finishTime = 0; //完成时间
		// this.deleteTime = 0; //删除时间
	}

	setData(id, task) {
		this.id = id;
		this.task = task;
		this.addTime = Date.now();
	}

	setFinish(isDone) {
		this.finish = isDone;
		this.finishTime = Date.now();
	}
}

module.exports = TodoData;
