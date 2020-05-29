const { client, redis, smembers } = require('./connRedis');
let todo = 'todoList';

// client.keys('*', redis.print);
// console.log(client);
// console.log(client.connected);

smembers(todo)
	.then(showTodoList)
	.catch((err) => {
		console.log(`读取数据失败 --- `, err);
	});

function showTodoList(value, err) {
	if (err) {
		console.log(`读取redis失败！`);
		return;
	}

	let ul = document.getElementsByClassName('todoUl')[0];
	if (!ul) {
		console.log('html元素不存在');
		return;
	}

	// 添加到html页面中
	console.log(value, value.length);
	for (let item of value) {
		let li = document.createElement('li');
		let txt = document.createTextNode(item);
		li.appendChild(txt);
		ul.appendChild(li);
	}
}

// console.log(document.readyState); //complete
let inputValue = document.getElementById('inputValue');
let addBtn = document.getElementById('addBtn');

addBtn.onclick = function () {
	if (!inputValue.value) {
		alert('请输入内容');
		return;
	}
	client.sadd(todo, inputValue.value, redis.print)
}
