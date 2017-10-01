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
	this.identity = option.identity;
	this.form;

	this.create();
}

Form.prototype.create = function() {
	var form = document.createElement("form"),
		label = document.createElement("label"),
		input = document.createElement("input"),
		hint = document.createElement("span"),
		wrap = document.getElementById("wrapper");
		self = this;

	label.innerHTML = this.label;
	input.type = this.type;

	form.appendChild(label);
	form.appendChild(input);
	form.appendChild(hint);
	wrap.qppendChild(form);

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
	var form = this.form,
		inputText = form.querySelector("input").trim(),
		hint = form.querySelector("span"),
		testText = inputText.replace(/[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g, "aa");

		if(!testText) {
			hint.innerHTML = form.querySelector("label").innerHTML + "不能为空";
			hint.style.color = "#FA0F0F";
			hint.style.borderColor = "#FA0F0F" ;
		}	

	switch(this.identity) {
		case "username":
		case "password": testLen() ? correct(this.success) : incorrect(this.false);break;
		case "passwordTest": testPassword() ? correct(this.success) : incorrect(this.false);break;
		case "mail": testMail() ? correct(this.success) : incorrect(this.form, this.fail);break;
		case "phoneNumber" :testPhoneNumber() ? correct(this.success) : incorrect(this.false);break;
	}

    function testLen() {
        return /^.{4,16}$/.test(testText);
    }

    function testPassword() {
        var inputs = document.querySelectorAll("input");
        return inputs[1].value == inputs[2].value;
    }

    function testMail() {
        return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(inputText);
    }

    function testPhoneNumber() {
        return /^(13[0-9]|15[5-9]|15[0-3]|18[5-9]|180)[0-9]{8}$/.test(inputText);
    }

    function correct(hintWords) {
    	var input = form.querySelector("input");
        hint.innerHTML = hintWords;
        hint.style.color = "#09F62F";
        input.style.borderColor = "#09F62F";
    }

    function incorrect(hintWords) {
    	var input = form.querySelector("input");
        hint.innerHTML = hintWords;
        hint.style.color = "#FA0F0F";
        input.style.borderColor = "#FA0F0F";
    } 
};