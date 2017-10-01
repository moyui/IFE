function AddEvent(ele, event, func, tree) {
	var fn = function() {
		func.call(this, tree);
	};
	if (document.addEventListener) {
		ele.addEventListener(event, fn, false);
	} else if (document.attachEvent) {
		ele.attactEvent('on' + event, fn);
	} else {
		ele['on' + event] = fn;
	}
}

(function() {
	var btnArr = document.querySelectorAll('button');
	var tree = document.getElementById('tree');
	pro = btnArr[0];
	io = btnArr[1];
	poo = btnArr[2];

	AddEvent(pro, "click", preOrder, tree);
	AddEvent(io, "click", inOrder, tree);
	AddEvent(poo, "click", postOrder, tree);

	function preOrder(node) {
		if (node !== null) {
			node.style.backgroundColor = "#4876FF";
			preOrder(node.firstElementChild);
			preOrder(node.lastElementChild);
		}
	}
	function inOrder(node) {
		if (node !== null) {
			inOrder(node.firstElementChild);
			node.style.backgroundColor = "#4876FF";
			inOrder(node.lastElementChild);
		}
	}
	function postOrder(node) {
		if (node !== null) {
			postOrder(node.firstElementChild);
			postOrder(node.lastElementChild);
			node.style.backgroundColor = "#4876FF";
		}
	}
})();	

