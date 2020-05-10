const redis = require('redis');
const client = redis.createClient(6379, '192.168.120.128', {});

client.on('error', (error) => {
	console.log(`connect error...`, error);
	client.quit();
});

client.on('connect', () => {
	console.log('redis connect...');
});

client.on('ready', (err) => {
	if (err) {
		console.log(`ready.error --- `, err);
		return;
	}
	console.log(`redis ready...`);
})

// client.set('key3', 'value3', redis.print)
// client.mset('key4', 'value4', 'key5', 'value5', redis.print)
// client.setnx('key6', 'value66666', redis.print)

client.get('key1', redis.print)
client.mget('key1', 'key2', 'key5', 'key8', 'key6', redis.print)
client.keys('*', redis.print)

// client.quit(redis.print);