/*事件绑定*/
var AddEvent = function() {
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
}();

(function() {
	var radio = document.querySelectorAll(".radio"),
		studentInfo = document.getElementById("studentInfo"),
		employeeInfo = document.getElementById("employeeInfo"),
		selects = studentInfo.querySelectorAll("select");

		AddEvent(radio[0], "change", function() {
			employeeInfo.style.display = "none";
			studentInfo.style.display = "block";
		});

		AddEvent(radio[1], "change", function() {
			employeeInfo.style.display = "block";
			studentInfo.style.display = "none";
		});

		AddEvent(selects[0], "change", function() {
			//将全体先设置为none
        	for(var i = 1, len = selects.length; i < len; i++) {
            	selects[i].style.display = "none";
        	}
        	//再讲所需的设为inline-block
        	selects[this.selectedIndex + 1].style.display = "inline-block";
		});
})();