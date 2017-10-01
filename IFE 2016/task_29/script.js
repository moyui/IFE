/*事件绑定*/
var AddEvent = (function() {
	if (document.addEventListener) {
		return function(ele, event, func) {
			ele.addEventListener(event, func, false);
		};
	} else if (document.attachEvent) {
		return function(ele, event, func) {
			ele.attachEvent("on" + event, func);
		};
	} else {
		return function(ele, event, func) {
			ele["on" + event] = func;
		};
	}
})();

var Check = function() {
	var input = document.getElementById("input"),
		inputText = input.value.trim(),
		hint = document.getElementById("hint"),
		testText = inputText.replace(/[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g, "aa");
		if (!testText) {
			hint.innerText = "姓名不能为空";
			hint.style.color = "#FA0F0F";
			input.style.borderColor = "#FA0F0F";
		} else if (/^.{4,16}$/.test(testText)) {
			hint.innerHTML = "名称格式正确";
        	hint.style.color = "#09F62F";
        	input.style.borderColor = "#09F62F";
		} else {
			hint.innerHTML = "必须输入4-16个字符,中文字符算两个";
        	hint.style.color = "#FA0F0F";
        	input.style.borderColor = "#FA0F0F";
		}
};

(function(){
	var btn = document.getElementById("button");
	AddEvent(btn, "click", Check);
		
})();