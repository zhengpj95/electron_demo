/**
 * 中缀表达式转后缀表达式
 */
class SufFix {
	constructor() {
		this.expression = ''; //`1*9/3+3-5*5-1+2-9/3*2`;
		this.result = [];
		this.operator = ['+', '-', '*', '/', '%'];
		this.stack = new Stack();
	}

	format(expression) {
		let str = expression;
		str = str.replace(/ /gi, '');

		for (let ope of this.operator) {
			let arr = str.split(ope);
			str = arr.join(':' + ope + ':');
		}
		return str.split(':');
	}

	parse(expression) {
		this.expression = this.format(expression);
		let arr = this.expression;
		arr.push('#'); //#结束符
		//console.log(arr);

		for (let item of arr) {
			this.parse2(item);
		}
		this.stack.clear();
	}

	parse2(ele) {
		let isOver = this.isOver(ele);

		// 如果是数字直接入栈
		if (this.isNumber(ele) && !isOver) {
			this.result.push(ele);
			return;
		}
		if (isOver && !this.stack.getLength()) {
			this.stack.clear();
			return;
		}

		// 如果操作符的栈为空，操作符入栈
		if (!this.stack.getLength()) {
			this.stack.push(ele);
			return;
		}

		let can = false;
		let can2 = false;
		for (let i = this.stack.getLength() - 1; i >= 0; i--) {
			let innerOpe = this.stack.getData(i);
			let innerPri = this.priority(innerOpe);
			let incomingPri = this.priority(ele);

			if (incomingPri == innerPri) {
				can2 = true;
			}

			if (incomingPri > innerPri) {
				this.stack.push(ele);
				can = true;
			} else {
				this.result.push(this.stack.pop());
			}
		}

		if (!can || (can2 && !can)) {
			this.stack.push(ele);
		}
	}

	isNumber(val) {
		return !(this.operator.indexOf(val) > -1);
	}

	priority(ope) {
		let big = ['*', '/', '%'];
		if (big.indexOf(ope) > -1) {
			return 2;
		}
		return 1;
	}

	isOver(ope) {
		return ope == '#';
	}

	getResult() {
		let result = [];

		for (let item of this.result) {
			if (this.isNumber(item)) {
				result.push(item);
				continue;
			}

			let first = parseInt(result.pop());
			let second = parseInt(result.pop());

			switch (item) {
				case '+':
					result.push(first + second);
					break;
				case '-':
					result.push(second - first);
					break;
				case '*':
					result.push(first * second);
					break;
				case '/':
					if (first == 0 || second == 0) {
						return 0;
					}
					result.push(second / first);
					break;
				case '%':
					if (first == 0) {
						return 0;
					}
					result.push(second % first);
					break;
			}
		}
		return result.pop();
	}
}

class Stack {
	constructor() {
		this.data = [];
	}

	push(val) {
		this.data.push(val);
	}

	pop() {
		return this.data.pop();
	}

	clear() {
		this.data = [];
	}

	getData(index) {
		return this.data[index];
	}

	getLength() {
		return this.data.length;
	}
}

module.exports = new SufFix();
