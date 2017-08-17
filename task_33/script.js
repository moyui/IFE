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

var chess = function() {

};