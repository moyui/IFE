function addEvent (element, event, listener) {
	if (element.addEventListener) {
		element.addEventListener(event, listener, false);
	} else if (element.attachEvent){
		element.attachEvent("on" + event, listener);
	}	else {
		element["on" + event] = listener;
	}
}

function trim(str) {
    var result = "";
    result = str.replace(/^\s+|\s+$/g, "");
    return result;
}

(function () {
	function init() {
		var input = document.getElementById("input");
		var btn = document.getElementsByTagName("button");
		var lln = btn[0];
		var rln = btn[1];
		var lOut = btn[2];
		var rOut = btn[3];

		addEvent(lln, "click", leftIn);
		addEvent(rln, "click", rightIn);
		addEvent(lOut, "click", leftOut);
		addEvent(rOut, "click", rightOut);
	}	

	var input = document.getElementById("input");
	var list = document.getElementById("list");
	init();

	function leftIn () {
		var value = parseFloat(trim(input.value));
		var firstElement = document.createElement("li");
		var li = list.querySelectorAll("li")[0];
		if (!!(value)) {
			firstElement.innerHTML = value;
			if (li) {
				list.insertBefore(firstElement, li);
			} else {
				list.appendChild(firstElement);
			}
		} else {
			alert ("请输入一个数字！");
		}
	}

	function rightIn () {
		var value = parseFloat(trim(input.value));
		var lastElement = document.createElement("li");
		if (!!value) {
			lastElement.innerHTML = value;
			list.appendChild(lastElement);
		} else {
			alert ("请输入一个数字！");
		}
	}

	function leftOut () {
		var li = list.querySelectorAll("li")[0];
		if (li) {
			if (confirm("第一个元素的值为" + li.textContent + "，你确定要删除吗？")) {
				list.removeChild(li);
			}
		} else {
			alert ("队列是空的！");
		}
	}

	function rightOut () {
		var li = list.querySelectorAll("li");
		var liLast = li[li.length - 1];
			if (liLast) {
			if (confirm("最后一个元素的值为" + liLast.textContent + "，你确定要删除吗？")) {
				list.removeChild(liLast);
			}
		} else {
			alert ("队列是空的！");
		}
	}
})();

