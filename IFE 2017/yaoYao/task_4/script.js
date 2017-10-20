class Chess{
	constructor(option) {
		this.x = option.x;
		this.y = option.y;
		this.towards = option.towards || 'front';
		this.ag = option.ag || 0;

		this.chess;
		this.chessTable;
		//目标横行
		this.tr

		this.init();
	}

	init() {
		let chessTable = document.getElementById('chessTable'),
			button = document.getElementById('button'),
			fragment = document.createDocumentFragment();
		//构造棋盘
		for (let i = 0; i < 11; i++) {
			let tr = document.createElement('tr');
			for (let j = 0; j < 11; j++) {
				let td = document.createElement('td');
				if (i === 0 && j > 0) {
					td.innerHTML = j;
					td.className = "tableHead";
				} else if (i !== 0 && j === 0){
					td.innerHTML = i;
				}
				tr.appendChild(td);
			}
			fragment.appendChild(tr);
		}
		chessTable.appendChild(fragment);

		this.chessTable = chessTable;
		this.tr = chessTable.querySelectorAll('tr');
		document.documentElement.style.fontSize = document.body.clientWidth / 12.8 + 'px';

		addEvent(button, 'click', this.inputProcess.bind(this));
		this.createChess();
	}

	inputProcess() {
		let input = document.getElementById("input").value,
			inputText = []; 
			inputText = input.split(" ");

		if (inputText[1]) {
			this.towards = inputText[1];
		}
		if (inputText[0] === "go") {
			this.go();
		} else if(inputText[0] === "turn") {
			this.turn();
		} 
	}

	createChess() {
		let y = this.tr[this.y],
			x = y.querySelectorAll("td")[this.x],
			//判断是否已经创建过棋子
			chess = (this.chess !== undefined) ? this.chess : document.createElement('span'); 

		chess.className = 'chess';
		x.appendChild(chess);
		this.chess = chess;
	}

	go() {	
		let chess = this.chess,
			parent = chess.parentNode;
		switch(this.towards) {
			case "front": if(this.y > 1 ) this.y--; break;
			case "back" : if(this.y < 10 ) this.y++; break;
			case "left" : if(this.x > 1) this.x--; break;
			case "right": if(this.x < 10) this.x++; break;
			default:break;
		}
		parent.removeChild(chess);
		this.createChess();
	}

	turn() {
		let chess = this.chess,
			parent = chess.parentNode;
		switch(this.towards) {
			case "front": break;
			case "back" : chess.style.transform = "rotate(90deg)"; break;
			case "left" : chess.style.transform  = "rotate(180deg)"; break;
			case "right": chess.style.transform  = "rotate(270deg)"; break;
			default:break;
		}
		parent.removeChild(chess);
		this.createChess();
	}
}

(function (){
	let chess = new Chess({
		x : 5,
		y : 5,
	});
})();