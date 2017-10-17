class Chess{
	constructor(option) {
		this.x = option.x;
		this.y = option.y;
		this.towards = option.towards;
		this.chess;

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



		

		addEvent(button, 'click', inputProcess);
	}

	inputProcess() {
		let input = document.getElementById("input").value,
			inputText = []; 
			inputText = input.split(" ");

		if (inputText[0] === "go") {
			this.go();
		} else if(inputText[0] === "turn") {
			this.turn();
		} 
		if (inputText[1]) {
			this.towards = inputText[1];
		}
	}

	createChess() {
			var chess = document.createElement("span");
	switch(this.towards) {
		case "front": break;
		case "back" : chess.style.rotate = "rotate(90deg)"; break;
		case "left" : chess.style.rotate = "rotate(180deg)"; break;
		case "right": chess.style.rotate = "rotate(270deg)"; break;
	}
	var y = document.querySelectorAll("tr")[this.y],
		x = y.querySelectorAll("td")[this.x];
	x.appendChild(chess);
	this.chess = chess;
	}

	go() {
			switch(this.towards) {
		case "front": this.y--; break;
		case "back" : this.y++; break;
		case "left" : this.x--; break;
		case "right": this.x++; break;
	}
	var chess = document.querySelecor("span"),
		parent = chess.parentNode;
	parent.removeChild(chess);
	this.create();
	}

	turn() {
			var chess = document.querySelecor("span"),
		parent = chess.parentNode;
	parent.removeChild(chess);
	this.create();
	}
}

(function (){
	let chess = new Chess({
		x : 5,
		y : 6,
		towards : "front"
	});
})();