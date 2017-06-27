var addEvent = (function() {
	if (document.addEventListener) {
		return function (ele, event, func) {
			ele.addEventListener(event, func, false);
		};
	} else if (document.attachEvent) {
		return function (ele, event, func) {
			ele.attachEvent('on' + event, func);
		};
	} else {
		return function (ele, event, func) {
			ele['on' + event] = func;
		};
	}
})();

function trim(str) {
	var result = '';
	result = str.replace(/^\s+|\s+$/g, '');
	return result;
}

(function() {
	var inp = document.getElementById('input');
	var list = document.getElementById('list');
	var searchInp = document.getElementById('search-inp');
	function init() {
		var btnArr = document.querySelectorAll('button');
		li = btnArr[0];
		lo = btnArr[1];
		ri = btnArr[2];
		ro = btnArr[3];
		searchBtn = document.getElementById('search-btn');

	addEvent(li, 'click', leftIn);
	addEvent(lo, 'click', leftOut);
	addEvent(ri, 'click', rightIn);
	addEvent(ro, 'click', rightOut);
	addEvent(searchBtn, 'click', searchFun);
	}
	init();

	function searchFun() {
		var sValue = trim(searchInp.value),
			reg;
		var listArr =  list.querySelectorAll('li');
		if (sValue !== ''&& listArr.length !== 0) {
			reg = new RegExp(sValue + '+', 'i');
			for (var i = 0, len = listArr.length; i < len; i++) {
				 var sValueMatch = listArr[i].innerText.match(reg);
				if (sValueMatch) {
					console.log(sValueMatch);
					if (sValueMatch.index === 0) {
						listArr[i].innerHTML = "<span class='red'>" + sValueMatch[0] + '</span>' + sValueMatch.input.substr(sValueMatch[0].length);
					} else {
                        console.log(sValueMatch[0]);
                        console.log(sValueMatch.input.substr(sValueMatch.index + sValueMatch[0].length));
						listArr[i].innerHTML = sValueMatch.input.substring(0, sValueMatch.index) + '<span class="red">' + sValueMatch[0]  + '</span>' + sValueMatch.input.substr(sValueMatch.index + sValueMatch[0].length);
					}
				listArr[i].style.background = '#C9E8FF';
                } else {
                    listArr[i].innerHTML = listArr[i].innerText;
                    listArr[i].style.background = '#fff';
                }
            }
        } else {
            alert('当前列表中无值或者您未输入值');
        }
	}
    function leftIn() {
        var value = trim(inp.value),
            fiChild = null,
            fistEle = null;
        if (!!value) {
            value = value.split(/[^\w\u4e00-\u9fa5]+/);
            for (var i = 0, len = value.length; i < len; i++) {
                fiChild = list.firstElementChild;
                if (value[i] !== '') {
                    fistEle = document.createElement('li');
                    fistEle.innerHTML = value[i];
                    if (fiChild) {
                        list.insertBefore(fistEle, fiChild);
                    } else {
                        list.appendChild(fistEle);
                    }
                }
            }
        } else {
            alert('请输入内容');
        }
    }
    function rightIn() {
        var value = trim(inp.value),
            lastEle = document.createElement('li');
        if (!!value) {
            value = value.split(/[^\w\u4e00-\u9fa5]+/);
            for (var i = 0, len = value.length; i < len; i++) {
                if (value[i] !== '') {
                    lastEle = document.createElement('li');
                    lastEle.innerHTML = value[i];
                    list.appendChild(lastEle);
                }
            }
        } else {
            alert('请输入内容');
        }
    }
    function leftOut() {
        var fiChild = list.querySelectorAll('li')[0];
        if (fiChild) {
            if (confirm('第一个元素的值为：' + fiChild.innerText + '，你确定要删除吗？')) {
                list.removeChild(fiChild);
            }
        } else {
            alert('队列是空的');
        }
    }
    function rightOut() {
        var Child = list.querySelectorAll('li');
        var latChild = Child[Child.length - 1];
        if (latChild) {
            if (confirm('最后一个元素的值为：' + latChild.innerText + '，你确定要删除吗？')) {
                list.removeChild(latChild);
            }
        } else {
            alert('队列是空的');
        }
    }
})();