/*事件绑定*/
var AddEvent = (function() {
	if (document.addEventListener) {
		return function(ele, event, func) {
			ele.addEventListener(event, func, false);
		};
	} else if (document.attachEvent) {
		return function(ele, event, func) {
			ele.attachEvent('on' + event, func);
		};
	} else {
		return function (ele, event, func) {
			ele['on' + event] = func;
		};
	}
})();

(function init(){
	var table = document.getElementById("table"),
		btn = document.getElementById("button");
	for(var i = 0; i < 11; i++) {		
		tr = document.createElement("tr");
		if(i > 0) {
			tr.innerHTML = i;
		}
		for(var j = 0; j < 11; j++) {		
			td = document.createElement("td");
			if (i === 0 && j > 0) {
				td.innerHTML = j;
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	var chess = new Chess({
		x : 5,
		y : 6,
		towards : "front"
	});
	AddEvent.call(chess, btn, "click", inputProcess);
})();

function inputProcess() {
	var input = document.getElementById("input").value,
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

function Chess(option) {
	this.x = option.x;
	this.y = option.y;
	this.towards = option.towards;
	this.chess;
	this.create();
}

Chess.prototype.create = function() {
	var chess = document.createElement("span");
	switch(this.towards) {
		case "front": break;
		case "back" : chess.style.rotate = "rotate(90deg)"; break;
		case "left" : chess.style.rotate = "rotate(180deg)"; break;
		case "right": chess.style.rotate = "rotate(270deg)"; break;
	}
	var y = document.querSelectorAll("tr")[this.y],
		x = y.querySelectorAll("td")[this.x];
	x.appendChild(chess);
	this.chess = chess;
};

Chess.prototype.go = function() {
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
};

Chess.prototype.turn = function() {
	var chess = document.querySelecor("span"),
		parent = chess.parentNode;
	parent.removeChild(chess);
	this.create();
};