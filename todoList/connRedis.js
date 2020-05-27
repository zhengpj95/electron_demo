const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");
const saddAsync = promisify(client.sadd).bind(client);
const smembers = promisify(client.smembers).bind(client);

client.on("error", function (error) {
	client.quit(() => { console.log(`client closed success...`) });
});

client.on('ready', () => {
	console.log(`client ready...`);
})

// then(value, error)
smembers('todoList').then((err, value) => {
	console.log(err, value);
})

module.exports = {
	client,
	redis,
	smembers
};