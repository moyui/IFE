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
		return function(ele, event, func) {
			ele['on' + event] = func;
		};
	}
})();

function randomColor() {
    var color = '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);
    return color;
}

(function() {
	var tree = document.getElementById('tree');
	var input = document.getElementById('search');
	var btnArr = document.querySelectorAll('button');
	var input = document.getElementById('input');
	pre = btnArr[0]; 
	ino = btnArr[1];
	pre_s = btnArr[2];
	ino_s = btnArr[3];

   var perPoss = preOrder.call(this, tree);
   var inoPoss = inOrder.call(this, tree);
   AddEvent(pre, 'click', perPoss);
   AddEvent(ino, 'click', inoPoss);

	function preOrder(node) {
		if (node !== null) {
			node.style.backgroundColor = randomColor();
			preOrder(node.firstElementChild);
			preOrder(node.lastElementChild);
		}
	}

	function inOrder(node) {
		if (node !== null) {
			inOrder(node.firstElementChild);
			inOrder(node.lastElementChild);
			node.style.backgroundColor = randomColor();
		}
	}
})();