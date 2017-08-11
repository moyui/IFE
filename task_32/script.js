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

function Form(option) {
	this.label = option.label;
	this.type = option.type;
	this.rule = option.rule;
	this.success = option.success;
	this.fail = option.fail;
	this.form;

	this.create();
}

Form.prototype.create = function() {
	var form = document.createElement("form"),
		label = document.createElement("label"),
		input = document.createElement("input"),
		hint = document.createElement("span"),
		self = this;

	label.innerHTML = this.label;
	input.type = this.type;

	form.appendChild(label);
	form.appendChild(input);
	form.appendChild(hint);

	this.form = form;

	AddEvent(input, "focus", function() {
		hint.innerHTML = self.rule;
		hint.style.color = "#C1B9B9";
		input.style.borderColor = "#35C3F8";
	});

	AddEvent(input, "blur", function() {
		self.validator();
	});
};

Form.prototype.validator = function() {
	
}