const sufFix = require('./utils/SufFix');
let btnList = document.getElementsByClassName('btn');
let resultEle = document.getElementsByClassName('result')[0];
let reset = false;

for (let item of btnList) {
	item.onclick = function (e) {
		e.preventDefault();
		if (item.value == 'AC') {
			resultEle.value = '';
		} else if (item.value == 'C') {
			resultEle.value = resultEle.value.slice(0, -1);
		} else if (item.value == '=') {
			let value = resultEle.value;
			sufFix.parse(value);
			let result = sufFix.getResult();
			resultEle.value = result ? result : '';
			reset = true; //重置
		} else {
			if (reset) {
				reset = false;
				resultEle.value = '';
			}
			resultEle.value += item.value;
		}
	};
}
