// const { remote } = require('electron');
const fs = require('fs');
const path = require('path');
const TodoData = require(path.join(__dirname, 'model/todoData.js'));

const db = fs.readFileSync(path.join(__dirname, 'db/db.json'), 'utf-8');
const dbData = JSON.parse(db);
console.log(dbData);

let div = document.getElementById('todoDiv');
for (let i in dbData) {
	let itemDiv = document.createElement('div');
	let h2 = document.createElement('h2');
	h2.innerHTML = i;
	itemDiv.appendChild(h2);
	div.appendChild(itemDiv);

	let itemData = dbData[i];
	for (let j in itemData) {
		let data = itemData[j];
		let p = document.createElement('p');
		p.innerText = `${data.id} -- ${data.task} -- ${data.addTime}`;
		itemDiv.appendChild(p);
	}
}

// remote.app.on('window-all-closed', () => {
// 	fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(dbData));
// });
