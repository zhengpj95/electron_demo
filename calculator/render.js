let btnList = document.getElementsByClassName('btn');
let resultEle = document.getElementsByClassName('result')[0];

for (let item of btnList) {
	item.onclick = function (e) {
		e.preventDefault();
		if (item.value == 'AC') {
			resultEle.value = '';
		} else if (item.value == 'C') {
			resultEle.value = resultEle.value.slice(0, -1);
		} else if (item.value == '=') {
			let value = resultEle.value;
			let arr = value.split(/[-*%+/]/g);
			console.log(arr)
		} else {
			resultEle.value += item.value;
		}
	}
}