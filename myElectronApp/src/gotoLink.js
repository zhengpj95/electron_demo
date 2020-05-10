// if ($) {
// 	console.log(`have loaded jquery`)
// 	const $ = require('jquery');
// }

const {shell} = require('electron');

let linkRedis = $('.linkRedis');
let linkMongodb = $('.linkMongodb');
let linkMongoose = $('.linkMongoose');
let linkNodejsRedis = $('.linkNodejsRedis');
let linkNodejsMongodb = $('.linkNodejsMongodb');
let linkNodejsMongoose = $('.linkNodejsMongoose');

let linkList = [linkRedis, linkMongodb, linkMongoose, linkNodejsRedis,
	linkNodejsMongodb, linkNodejsMongoose];
let urlList = ['https://redis.io/', 'https://docs.mongodb.com/manual/', 'https://mongoosejs.com/',
	'https://www.npmjs.com/package/redis', 'https://www.npmjs.com/package/mongodb', 'https://www.npmjs.com/package/mongoose'];

linkList.forEach((item, index) => {
	if (item) {
		item.click(function (e) {
			e.preventDefault();
			// 外部浏览器打开链接
			// shell.openExternal(urlList[index])
			// 	.catch(err => console.log(`Error: ${err}`));

			// 子窗口打开链接
			window.open(urlList[index]);
		});
	}
})

