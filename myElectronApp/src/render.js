const $ = require('jquery');
const redis = require('redis');
const mongodbClient = require('mongodb').MongoClient;
let redisClient = null;

//标识是redis，mongodb
const ConnectType = {
	Redis: 1,
	Mongodb: 2
}
let currentType = ConnectType.Redis;

let ipEle = $('#ipTxt');
let portEle = $('#portTxt');
let operationEle = $('#operationTxt');
let resultEle = $('#resultTxt');
let stateEle = $('#stateId');

let btnConnect = $('.btnConnect');
let btnRedis = $('.btnRedis');
let btnMongodb = $('.btnMongodb');
let btnExec = $('.btnExec');

//选择redis
btnRedis.click(function () {
	btnMongodb.removeClass('active')
	if (btnRedis.hasClass('active')) {
		return;
	}
	currentType = ConnectType.Redis;
	btnRedis.addClass('active');
	clearText();
	stateEle.html('Redis');
})

// 点击连接
btnConnect.click(function () {
	if (currentType === ConnectType.Redis) {
		connectRedis();
	} else if (currentType === ConnectType.Mongodb) {
		connectMongodb();
	}
})

//点击操作
btnExec.click(function () {
	let val = operationEle.val();
	if (!val) {
		return;
	}
	console.log(val)
})

function connectRedis() {
	let ip = ipEle.val();
	let port = portEle.val();
	if (!ip || !port || redisClient) {
		return;
	}
	redisClient = redis.createClient(port, ip, {});
	console.log('连接---', ip, port);

	redisClient.on('connect', () => {
		resultEle.val('redis connect...\n')
	});
	redisClient.on('ready', (err) => {
		if (err) {
			console.log(`ready.error --- `, err);
			redisClient = null;
			return;
		}
		let value = resultEle.val();
		resultEle.val(value + 'redis ready...\n')
		windowNotification(ConnectType.Redis, 1);
	});
	redisClient.on('error', (error) => {
		redisClient.quit();
		redisClient = null;
		resultEle.val('connect error...' + error);
		windowNotification(ConnectType.Redis, 0);
	});
}

function closeRedis() {
	if (redisClient) {
		redisClient.end(true);
		redisClient.quit(myCallback);
		redisClient = null;
	}
}

//=========================================================

//选择mongodb
btnMongodb.click(function () {
	btnRedis.removeClass('active')
	if (btnMongodb.hasClass('active')) {
		return;
	}
	currentType = ConnectType.Mongodb;
	btnMongodb.addClass('active');
	clearText();
	closeRedis();
	stateEle.html('Mongodb');
})


function connectMongodb() {
	let ip = ipEle.val();
	let port = portEle.val();
	if (!ip || !port || !mongodbClient) {
		return;
	}
	let dbName = 'test';
	console.log(`连接--- mongodb://${ip}:${port}/${dbName}`)
	const url = `mongodb://${ip}:${port}`;
	mongodbClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
		if (err) {
			console.log(`连接mongodb错误--- ${err.stack}`)
			windowNotification(ConnectType.Mongodb, 0);
			return;
		}
		resultEle.val('Connected successfully to server\n')
		windowNotification(ConnectType.Mongodb, 1);
		let db = client.db(dbName);
		let docs = db.collection('students').find({});
		console.log(docs)
	})
}

//=========================================================

function clearText() {
	operationEle.val('');
	resultEle.val('');
}

function myCallback(err, value) {
	if (err) {
		return;
	}
	resultEle.val(value + '\n');
}

function windowNotification(type, state) {
	let typeMsg = type === ConnectType.Redis ? 'redis' : 'mongodb';
	let stateMsg = state === 1 ? '成功' : '失败';
	let option = {
		title: '通知',
		body: `${typeMsg} 连接${stateMsg}`
	}
	new window.Notification(option.title, option);
}
