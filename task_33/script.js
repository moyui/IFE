(function init(){
	var table = document.getElementById("table");
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
})();

function inputProcess() {
	var input = document.getElementById("input"),
		inputText = input.value.trim();

}

function Chess(option) {
	this.x = option.x;
	this.y = option.y;
	this.towards = option.towards;
	this.chess;
	this.create();
}

Chess.prototype.create = function() {
	var chess = document.createElement("span"),
		y = document.querSelectorAll("tr")[this.y],
		x = y.querySelectorAll("td")[this.x];
	x.appendChild(chess);
	this.chess = chess;
};

Chess.prototype.go = function() {
	var self = this;
	switch(this.towards){
		case "front": this.y--; ; break;
		case "back" : this.y++; ; break;
		case "left" : this.x--; ; break;
		case "right": this.x++; ; break;
	}
	function step() {
		var chess = document.querySelecor("span");
	}
};