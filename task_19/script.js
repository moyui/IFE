var addEvent = (function() {
	if (document.addEventListener) {
		return function(element, event, listener) {
			element.addEventListener(event, listener, false);
		};
	} else if (document.attachEvent) {
		return function(element, event, listener) {
			element.attachEvent("on" + event, listener);
		}; 
	} else {
		return function(event, listener) {
			 element["on" + event] = listener; 
		};
	}
})();

function trim(str) {
	var result = "";
	result = str.replace(/^\s+|\s+$/g, "");
	return result;
}

function randomColor() {
    var color = '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);
    return color;
}

(function () {
	function init() {
		var btn = document.getElementsByTagName("button");
		var lIn = btn[0];
		var rIn = btn[1];
		var lOut = btn[2];
		var rOut = btn[3];
		var randomElement = btn[4];
		var quickSort = btn[5];

		addEvent(lIn, "click", leftIn);
		addEvent(rIn, "click", rightIn);
		addEvent(lOut, "click", leftOut);
		addEvent(rOut, "click", rightOut);
		addEvent(randomElement, "click", funRandomElement);
		addEvent(quickSort, "click", funQuickSort);
	}

	var input = document.getElementById("input");
	var list = document.getElementById("list");

	init();

	function leftIn() {
		var value = parseInt(trim(input.value));
		var firstChild = list.firstElementChild;
		var length = list.getElementsByTagName("li").length;
		var firstElement = document.createElement("li");
		if (value >= 10 && value <= 100) {
			if (length >= 60) {
				alert("元素最多为60个！");
			} else {
				firstElement.style.height = value * 4 + "px";
				firstElement.style.backgroundColor = randomColor();
				if (firstChild) {
					list.insertBefore(firstElement, firstChild);
				} else {
					list.appendChild(firstElement);
				}
			}
		} else {
			alert("请输入一个在10到100之间的数字！");
		}
	}

	function rightIn() {
		var value = parseInt(trim(input.value));
		var length = list.getElementsByTagName("li").length;
		var lastElement = document.createElement("li");
		if (value >= 10 && value <= 100) {
			if (length >= 60) {
				alert("元素最多为60个！");
			} else {
				lastElement.style.height = value * 4 + "px";
				lastElement.style.backgroundColor = randomColor();
				list.appendChild(lastElement);
			}
		} else {
			alert("请输入一个在10到100之间的数字！");
		}
	}

	function leftOut() {
		var firstChild = list.firstElementChild;
		if (firstChild) {
			if (confirm("第一个元素为：" + firstChild.offsetHeight + "你确定要删除吗?")) {
				list.removeChild(firstChild);
			} 
		} else {
				alert("队列是空的！");
		}
	}

	function rightOut() {
		var lastChild = list.lastElementChild;
		if (lastChild) {
			if (confirm("最后一个元素为：" + lastChild.offsetHeight + "你确定要删除吗？")) {
				list.removeChild(lastChild);
			} 
		} else {
				alert("队列是空的！");
		}
	}

	function funRandomElement() {
		var fragment = document.createDocumentFragment();
		var num = null;
		for (var i = 0; i < 60; i++) {
			var li = document.createElement("li");
			li.style.height = Math.round(Math.random()*99 + 1) * 4 + "px";
			li.style.backgroundColor = randomColor();
			fragment.appendChild(li);
		}
		list.appendChild(fragment);
	}

	function funQuickSort () {
		var li = document.querySelectorAll("li");
		var liHit = [];
		(function () {
			for (var i = 0; i < li.length; i++) {
				liHit.push(li[i].offsetHeight);
			}
		})();

	}

})();