const redis = require('redis');
const client = redis.createClient();
const { promisify } = require('util');
const saddAsync = promisify(client.sadd).bind(client);
const smembers = promisify(client.smembers).bind(client);

client.on('error', function (error) {
	client.quit(() => {
		console.log(`client closed success...`);
	});
});

client.on('ready', () => {
	console.log(`client ready...`);
});

client.on('connect', () => {
	console.log(`client connect...`);
});

client.on('end', () => {
	console.log(`client end...`);
});

// then(value, error)
smembers('todoList')
	.then((value, err) => {
		console.log('测试 --- ', value, err);
	})
	.catch((err) => {
		console.log('测试 --- ', err.origin);
	});

module.exports = {
	client,
	redis,
	smembers,
};
