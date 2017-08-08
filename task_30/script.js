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

(function(){
	var formWrap = document.getElementsByClassName("formWrap")[0],
		inputs = formWrap.querySelectorAll(".input"),
		btn = document.getElementById("button");
		[].forEach.call(inputs, function(value, index, array) {
			addHandler(value, "focus", function(){
				init(this.parentNode, index);
			});
		    addHandler(value, "blur", function() {
            	test(this.parentNode, index);
        	});
		});
		addHandler(btn, "click", function() {
        	var allPass = true;
        	[].forEach.call(inputs, function(value, index, array) {
            	if(!test(value.parentNode, index)) {
                	allPass = false;
            	}
        	});
        alert(allPass ? "提交成功！" : "提交失败！请检查输入后重试！");
    });
})();

function init(form, index) {
	var input = form.getElementsByClassName("input")[0],
		inputText = input.value.trim(),
		hint = form.querySelector(".input"),
		hintArr  = ["请输入名称", "请输入密码", "再次输入相同的密码", "请输入邮箱", "请输入手机号"];

	hint.innerHTML = hintArr[index];
    hint.style.color = "#C1B9B9";
    input.style.borderColor = "#35C3F8";
}

function test(form, index) {
	var input = form.getElementsByClassName("input")[0],
		inputText = input.value.trim(),
		hint = form.querySelector("input"),
		testText = inputText.replace(/[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g, "aa"),
        result = false;
        if(!testText) {
        	hint.innerHTML = form.querySelector("label").innerHTML + "不能为空";
        	hint.style.color = "#FA0F0F";
       		input.style.borderColor = "#FA0F0F";
        	return false;
    	}
    	switch(index) {
    		case 0:
    		case 1: testLen() ? correct("格式正确") : incorrect("必须输入4-16个字符");break;
    		case 2: testPassword() ? correct("格式正确") : incorrect("请确保两次输入的密码相同");break;
    		case 3: testMail() ? correct("格式正确") : incorrect("邮箱无效");break;
    		case 4: testPhoneNumber() ? correct("格式正确") : incorrect("手机号无效");break;
    	}
    return result;
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
        hint.innerHTML = hintWords;
        hint.style.color = "#09F62F";
        input.style.borderColor = "#09F62F";
        result = true;
    }

    function incorrect(hintWords) {
        hint.innerHTML = hintWords;
        hint.style.color = "#FA0F0F";
        input.style.borderColor = "#FA0F0F";
    } 
}

